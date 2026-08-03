const chalk = require("chalk");
const figlet = require("figlet");

let gradient;
try {
    gradient = require("gradient-string");
    if (gradient.default) gradient = gradient.default;
} catch (e) {
    gradient = null;
}

function printBanner(botName = "BOT WA", connectedNumber = null) {
    console.clear();

    const banner = figlet.textSync(botName.toUpperCase(), {
        font: "ANSI Shadow",
        horizontalLayout: "default"
    });

    if (gradient && typeof gradient === "function") {
        console.log(gradient(["#00c6ff", "#0072ff"]).multiline(banner));
    } else {
        console.log(chalk.cyan(banner));
    }

    if (connectedNumber) {
        console.log(chalk.green(`  ${connectedNumber}`));
    }
    console.log();
}

function printStatus(message, type = "info") {
    const time = new Date().toLocaleTimeString("id-ID");
    const prefix = `[${chalk.gray(time)}]`;

    switch (type) {
        case "success":
            console.log(`${prefix} ${chalk.green("✔")} ${chalk.green(message)}`);
            break;
        case "error":
            console.log(`${prefix} ${chalk.red("✘")} ${chalk.red(message)}`);
            break;
        case "warn":
            console.log(`${prefix} ${chalk.yellow("⚠")} ${chalk.yellow(message)}`);
            break;
        case "message":
            console.log(`${prefix} ${chalk.blue("💬")} ${chalk.white(message)}`);
            break;
        default:
            console.log(`${prefix} ${chalk.cyan("ℹ")} ${chalk.white(message)}`);
    }
}

function askBotName(readline) {
    console.clear();
    console.log(chalk.bold.white("  Masukkan nama bot (maks 5 karakter)"));
    console.log();

    let name = "";
    while (true) {
        name = readline.question(chalk.white("  Nama: ")).trim();

        if (name.length === 0) {
            console.log(chalk.red("  ❌ Nama tidak boleh kosong!\n"));
            continue;
        }
        if (name.length > 5) {
            console.log(chalk.red("  ❌ Nama maksimal 5 karakter!\n"));
            continue;
        }
        break;
    }

    return name;
}

module.exports = { printBanner, printStatus, askBotName };
