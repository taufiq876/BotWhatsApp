const fs = require("fs");
const path = require("path");

const CONFIG_PATH = path.join(__dirname, "..", "config.json");

function loadConfig() {
    if (!fs.existsSync(CONFIG_PATH)) return null;
    try {
        const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

function saveConfig(data) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2));
}

module.exports = { loadConfig, saveConfig };
