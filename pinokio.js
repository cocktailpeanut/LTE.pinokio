const os = require('os')
const fs = require('fs')
const path = require("path")
const exists = async p => !!(await fs.promises.stat(p).catch(e => false));
const config = {
  "title": "LoRA the Explorer",
  "description": "Stable Diffusion LoRA Playground",
  "emoji": "🔎 🖼️",
  "colorFrom": "indigo",
  "colorTo": "blue"
}
module.exports = {
  title: config.title,
  description: config.description,
  emoji: config.emoji,
  colorFrom: config.colorFrom,
  colorTo: config.colorTo,
  icon: "icon.png",
  menu: async (kernel) => {
    let installed = await exists(path.resolve(__dirname, "LoraTheExplorer", "env"))
    if (installed) {
      let session = (await kernel.loader.load(path.resolve(__dirname, "LoraTheExplorer", "session.json"))).resolved
      return [{
        when: "start.json",
        on: `<i class='fa-solid fa-spin fa-circle-notch'></i> Running`,
        type: "label",
      }, {
        when: "start.json",
        off: "<i class='fa-solid fa-power-off'></i> Start",
        href: "start.json?fullscreen=true&run=true",
      }, {
        when: "start.json",
        on: "<i class='fa-solid fa-rocket'></i> Open UI",
        href: (session && session.url ? session.url : "http://127.0.0.1:7860"),
        target: "_blank"
      }]
    } else {
      return [{
        html: '<i class="fa-solid fa-plug"></i> Install',
        href: "install.json?run=true&fullscreen=true"
      }]
    }
  }
}
