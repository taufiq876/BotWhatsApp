<div align="center">

# 🤖 BotWhatsApp

### Modern WhatsApp Bot for Termux

![Version](https://img.shields.io/badge/Version-RVO-blue?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Termux-black?style=for-the-badge)
![NodeJS](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Development-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-Unlicense-red?style=for-the-badge)

A lightweight and developer-friendly WhatsApp Bot built with **Node.js** for **Termux**.

Currently under active development.

⭐ Don't forget to leave a star if you like this project.

</div>

---

# 📖 About

**BotWhatsApp** is an open-source WhatsApp Bot project built using **Node.js**.

This project is designed to be lightweight, modular, easy to maintain, and simple to extend with new features in future updates.

---

# 🚀 Current Status

> **This project is still under development.**

Currently available feature:

- ✅ RVO

More features will be added in future repository updates.

---

# ✨ Features

- 🤖 RVO
- ⚡ Lightweight
- 📱 Optimized for Termux
- 📂 Clean Project Structure
- 🔓 Open Source
- 🚧 Under Active Development

---

# 📂 Repository Structure

```text
📦 BotWhatsApp
├── 📂 fitur/
├── 📂 tampilan/
├── 📄 config.json
├── 📄 index.js
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 project-lengkap.txt
└── 📘 README.md
```

---

# 📥 Installation

## 1. Install Requirements

```bash
pkg update -y && pkg upgrade -y && pkg install -y git nodejs
```

---

## 2. Clone Repository

```bash
cd ~

git clone https://github.com/taufiq876/BotWhatsApp.git

cd ~/BotWhatsApp
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Run Bot

```bash
node .
```

---

# ⚡ One Command Installation

Simply copy and run:

```bash
pkg update -y && pkg upgrade -y && pkg install -y git nodejs && cd ~ && git clone https://github.com/taufiq876/BotWhatsApp.git && cd ~/BotWhatsApp && npm install && node .
```

---

# 📦 Installer Script (CAT Method)

Create an installer automatically.

```bash
cat > ~/install-bot.sh << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash

clear

echo "Updating packages..."

pkg update -y
pkg upgrade -y

echo "Installing dependencies..."

pkg install -y git nodejs

cd ~

echo "Downloading project..."

rm -rf BotWhatsApp

git clone https://github.com/taufiq876/BotWhatsApp.git

cd ~/BotWhatsApp

echo "Installing npm packages..."

npm install

echo ""

echo "Starting Bot..."

node .

EOF

chmod +x ~/install-bot.sh

bash ~/install-bot.sh
```

---

# 🔄 Update Bot

Whenever a new update is released, simply run:

```bash
cd ~/BotWhatsApp

git pull

npm install
```

---

# 🤖 Continue Development with AI

If you are a beginner and want an AI assistant to continue developing this project automatically, use the prompt below.

The AI should first read the complete project from:

> https://github.com/taufiq876/BotWhatsApp/blob/main/project-lengkap.txt

The file contains the complete project structure and source code.

No manual uploads are required.

---

## 📋 AI Prompt

```text
You are an experienced senior software engineer.

The project already exists in:

cd ~/BotWhatsApp

Read the complete project from:

https://github.com/taufiq876/BotWhatsApp/blob/main/project-lengkap.txt

Treat that file as the single source of truth for the project.

Never rewrite the project from scratch.

Your responsibilities:

- Analyze the current architecture.
- Analyze the folder structure.
- Analyze the coding style.
- Analyze dependencies.
- Analyze implementation details.
- Understand how every module works before making changes.
- Continue development based on the existing implementation.
- Preserve compatibility with all existing code.
- Reuse existing functions/classes whenever possible.
- Only modify files that actually need changes.
- Create new files only when absolutely necessary.
- Keep the project clean, modular, scalable, and maintainable.

Before generating any code:

1. Explain what will be changed.
2. Explain why the change is needed.
3. List every file that will be modified.
4. Wait until the analysis is complete before generating code.

Output Rules

Assume the working directory is always:

cd ~/BotWhatsApp

Never output patches or diffs.

Never use placeholders such as:

...
same as above
existing code
unchanged code

Always generate the FULL CONTENT of every modified file.

Generate all files using executable Termux commands.

If a directory does not exist, create it first using:

mkdir -p path/to/folder

Then create files using this exact format:

cat > path/to/file <<'EOF'
FULL FILE CONTENT
EOF

For every modified file, output one complete "cat" block.

For every new file, output one complete "cat" block.

If a file should be deleted, use:

rm -f path/to/file

If a directory should be removed, use:

rm -rf path/to/folder

Do not shorten any source code.

Do not omit imports.

Do not omit comments.

Do not summarize code.

Do not use pseudo code.

Do not output only the changed section.

Always output the entire file.

Keep all existing project conventions unless there is a strong technical reason to improve them.

The generated commands must be ready to copy-paste directly into Termux without any manual editing.
```

---

# 💡 Project Goals

- Build a modern WhatsApp Bot
- Keep the project lightweight
- Easy to customize
- Beginner friendly
- Modular architecture
- Long-term development

---

# 📌 Notes

This repository currently only provides the **RVO** feature.

Additional commands, improvements, bug fixes, optimizations, UI enhancements, and new modules will be added gradually through future updates.

To receive new features, simply update the repository using:

```bash
cd ~/BotWhatsApp

git pull

npm install
```

---

# 🤝 Contributing

Contributions, feature requests, bug reports, and pull requests are always welcome.

Feel free to help improve this project.

---

# 📜 License

Distributed under the **Unlicense**.

---

<div align="center">

### ⭐ Star this repository if it helps you.

Made with ❤️ by **Taufiq**

</div>
