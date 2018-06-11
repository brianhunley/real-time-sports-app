const dot = require("dot-object");
const fs = require("fs");

const SAVEPATH = "./"; // path from this file to the settings directory
const SAVEDIR = "__saved-settings__"; // name of the settings directory
const SAVETO = SAVEPATH + SAVEDIR;

class Settings {
  constructor(filename) {
    this.data = {};
    this.savename = null;
    if (filename !== null && filename !== undefined) {
      load(filename);
    }
  }

  // Add some data to the settings.
  // Takes any valid JSON path, and an valid value (including Arrays)
  add(path, value) {
    dot.str(path, value, this.data);
  }

  // Returns some data from the settings, if it exists. Else returns undefined.
  get(path) {
    return dot.pick(path, this.data);
  }

  // Save the file to the file system. Names must be a string. If a name
  // is not given, tries to save as the "savename". If the savename is null,
  // look for a name property in the data. If there is no name propery, save
  // as "settings-${current time}"
  save(filename) {
    if (filename === null || filename === undefined) {
      if (this.savename !== null) {
        filename = this.savename;
      } else if (this.data.name !== undefined && this.data.name !== null) {
        filename = this.data.name;
      } else {
        filename = "settings-" + new Date().getTime();
      }
    }

    fs.writeFileSync(`${SAVETO}/${filename}.json`, JSON.stringify(this.data));
    this.savename = this.data.name;
  }

  // Load settings from file
  load(filename) {
    this.data = JSON.parse(fs.readFileSync(`${SAVETO}/${filename}.json`));
  }

  // delete these settings from the file system and memory.
  delete() {
    if (this.savename !== null && this.savename !== undefined) {
      fs.unlinkSync(`${SAVETO}/${this.savename}.json`);
    }
    this.data = {};
    this.savename = null;
  }
}

module.exports = { Settings, SAVEDIR };
