const fs = require('fs')

const DOTE_EVENT_TYPES = {
  requested: 'requested',
  inProgress: 'inProgress',
  onHold: 'onHold',
  fulfilled: 'fulfilled'
};

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

  static FieldNull(field, object) {
    return !(field in object) || object[field] === null
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
      description: null,
      doteRequest: null
    });
    this.saveToFile()
    return this.bells.length - 1
  }

  createDoteEvent(type, timestamp) {
    return {
      type,
      timestamp
    }
  }

  createDoteRequest() {
    return {
      events: []
    }
  }

  doteEvent(bellName, doteEventType, timestamp) {
    if (typeof timestamp === 'undefined') timestamp = Date.now()

    const bell = this.getBell(bellName)
    if (bell === null) {
      throw new Error(`bell not found: ${bellName}`)
    }

    // if fulfilled, clear out the request
    // TODO: maybe keep a record somewhere or turn doteRequest into an array
    if (doteEventType === DOTE_EVENT_TYPES.fulfilled) {
      bell.doteRequest = null
      return
    }

    if (BellState.FieldNull('doteRequest', bell)) {
      bell.doteRequest = this.createDoteRequest()
    }

    const doteEvent = this.createDoteEvent(doteEventType, timestamp)
    bell.doteRequest.events.push(doteEvent);

    return doteEvent
  }
}

module.exports = BellState