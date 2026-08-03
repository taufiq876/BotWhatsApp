const fs = require("fs");
const path = require("path");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const pino = require("pino");
const readline = require("readline-sync");

const { handleRVOCommand, saveToCache } = require("./fitur/rvo");
const { printBanner, printStatus, askBotName } = require("./tampilan/banner");
const { loadConfig, saveConfig } = require("./tampilan/config");

const SESSION_PATH = path.join(__dirname, "session");
const PAIRING_CODE = "ELON2007";

let isConnecting = false;
let pairingRequested = false;

function isFirstRun() {
    if (!fs.existsSync(SESSION_PATH)) return true;
    const files = fs.readdirSync(SESSION_PATH);
    return files.length === 0;
}

async function startBot() {
    if (isConnecting) return;
    isConnecting = true;

    const firstRun = isFirstRun();

    let config = loadConfig();

    if (firstRun) {
        const botName = askBotName(readline);
        config = { botName };
        saveConfig(config);
    }

    if (!config || !config.botName) {
        config = { botName: "BOT" };
        saveConfig(config);
    }

    printBanner(config.botName, null);

    const { state, saveCreds } = await useMultiFileAuthState("session");
    const { version } = await fetchLatestBaileysVersion();

    printStatus("Menginisialisasi koneksi ke WhatsApp...", "info");

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    sock.ev.on("creds.update", saveCreds);

    if (!sock.authState.creds.registered && !pairingRequested) {
        pairingRequested = true;

        setTimeout(async () => {
            const phoneNumber = readline.question(
                "  Masukkan nomor WhatsApp (contoh: 6281234567890): "
            );

            try {
                printStatus("Meminta kode pairing...", "info");
                const code = await sock.requestPairingCode(phoneNumber.trim(), PAIRING_CODE);
                printStatus(`Kode Pairing: ${code}`, "success");
            } catch (err) {
                printStatus(`Custom code ditolak, mencoba kode otomatis...`, "warn");
                try {
                    const fallbackCode = await sock.requestPairingCode(phoneNumber.trim());
                    printStatus(`Kode Pairing: ${fallbackCode}`, "success");
                } catch (err2) {
                    printStatus(`Gagal minta pairing code: ${err2.message}`, "error");
                }
            }
        }, 3000);
    }

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            isConnecting = false;

            const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

            printStatus("Koneksi terputus...", "warn");

            if (shouldReconnect) {
                printStatus("Mencoba menyambungkan ulang...", "info");
                setTimeout(() => startBot(), 2000);
            } else {
                printStatus("Logout terdeteksi, hapus folder session lalu jalankan ulang untuk setup baru.", "error");
            }
        } else if (connection === "open") {
            isConnecting = false;
            pairingRequested = false;

            const connectedNumber = sock.user?.id?.split(":")[0] || "Unknown";

            printBanner(config.botName, connectedNumber);
            printStatus("Bot berhasil terhubung ke WhatsApp!", "success");
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        saveToCache(msg);

        const from = msg.key.remoteJid;
        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        const isCommand = text.trim().toLowerCase() === ".rvo";
        if (msg.key.fromMe && !isCommand) return;

        if (text) {
            printStatus(`Pesan dari ${from.split("@")[0]}: ${text}`, "message");
        }

        const isRVOCommand = await handleRVOCommand(sock, msg, text);
        if (isRVOCommand) return;

        if (text.toLowerCase() === "ping") {
            await sock.sendMessage(from, { text: "Pong! 🏓" });
        }

        if (text.toLowerCase() === "menu") {
            await sock.sendMessage(from, {
                text: "*MENU BOT*\n\n1. ping - cek bot\n2. menu - lihat menu ini\n3. .rvo - reply ke pesan view once untuk membukanya"
            });
        }
    });
}

startBot();
