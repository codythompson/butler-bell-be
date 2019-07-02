const fs = require('fs')

class BellState {

  static ReadJSONSync(path) {
    const jsonData = fs.readFileSync(path)
    const obj = JSON.parse(jsonData)
    return obj
  }

  static WriteJSONSync(path, contentObj) {
    const contentStr = JSON.stringify(contentObj, null, 2)
    fs.writeFileSync(path, contentStr)
  }

  constructor(path) {
    this.path = path
    this.lastSaveAttempt = null;

    this.bells = null

    this.initFromFile()
  }

  initFromFile() {
    this.bells = BellState.ReadJSONSync(this.path)
  }

  saveToFile() {
    this.lastSaveAttempt = Date.now()
    BellState.WriteJSONSync(this.path, this.bells)
  }

  getBell(name) {
    for(let bell of this.bells) {
      if (bell.name === name) return bell;
    }
    return null;
  }

  createBell(name, order) {
    this.bells.push({
      name,
      rings: []
    });
    this.saveToFile()
    return this.bells.length - 1
  }

  addRing(bellName, timestamp) {
    if (typeof timestamp === 'undefined') timestamp = Date.now()
    const bell = this.getBell(bellName)
    bell.rings.push(timestamp)
    return timestamp
  }

  clearRings(bellName) {
    const bell = this.getBell(bellName)
    bell.rings = []
  }
}

module.exports = BellState