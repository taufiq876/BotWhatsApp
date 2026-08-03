const { downloadMediaMessage } = require("@whiskeysockets/baileys");

const messageStore = new Map();
const MAX_CACHE = 200;

function saveToCache(msg) {
    const id = msg.key.id;
    if (!id) return;

    messageStore.set(id, msg);

    if (messageStore.size > MAX_CACHE) {
        const firstKey = messageStore.keys().next().value;
        messageStore.delete(firstKey);
    }
}

function getViewOnceContent(message) {
    if (!message) return null;

    return (
        message.viewOnceMessageV2?.message ||
        message.viewOnceMessage?.message ||
        (message.imageMessage?.viewOnce && { imageMessage: message.imageMessage }) ||
        (message.videoMessage?.viewOnce && { videoMessage: message.videoMessage }) ||
        null
    );
}

async function handleRVOCommand(sock, msg, text) {
    const from = msg.key.remoteJid;

    if (text.trim().toLowerCase() !== ".rvo") return false;

    const quotedInfo = msg.message?.extendedTextMessage?.contextInfo;
    const quotedMsg = quotedInfo?.quotedMessage;
    const quotedId = quotedInfo?.stanzaId;

    if (!quotedMsg || !quotedId) {
        await sock.sendMessage(from, {
            text: "❌ Reply ke pesan *view once* dulu, baru ketik .rvo"
        }, { quoted: msg });
        return true;
    }

    const cached = messageStore.get(quotedId);
    const targetMessage = cached?.message || quotedMsg;

    const viewOnceContent = getViewOnceContent(targetMessage);

    if (!viewOnceContent) {
        await sock.sendMessage(from, {
            text: "❌ Pesan yang di-reply bukan view once, atau medianya sudah tidak tersimpan."
        }, { quoted: msg });
        return true;
    }

    try {
        const type = Object.keys(viewOnceContent)[0];
        const caption = viewOnceContent[type]?.caption || "";

        const senderJid =
            quotedInfo?.participant ||
            cached?.key?.participant ||
            cached?.key?.remoteJid ||
            from;

        const fakeMsg = {
            key: {
                remoteJid: from,
                id: quotedId,
                participant: senderJid
            },
            message: viewOnceContent
        };

        const buffer = await downloadMediaMessage(
            fakeMsg,
            "buffer",
            {},
            {
                logger: undefined,
                reuploadRequest: sock.updateMediaMessage
            }
        );

        if (type === "imageMessage") {
            await sock.sendMessage(from, {
                image: buffer,
                caption: caption || undefined
            });
        } else if (type === "videoMessage") {
            await sock.sendMessage(from, {
                video: buffer,
                caption: caption || undefined
            });
        }

        console.log(`✅ .rvo berhasil dibongkar, dari ${senderJid}`);
    } catch (err) {
        console.log("❌ Gagal proses .rvo:", err.message);
        await sock.sendMessage(from, {
            text: "❌ Gagal membuka RVO. Media mungkin sudah kadaluarsa."
        }, { quoted: msg });
    }

    return true;
}

module.exports = { handleRVOCommand, saveToCache };
