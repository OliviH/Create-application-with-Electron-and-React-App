const electron = require("electron")
const path = require("path")
const fs = require("fs-extra")

class StoreJson {
  constructor(opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath(
      "userData"
    )
    this.path = path.join(userDataPath, opts.fileName + ".json")
    let pkg = fs.readJsonSync(this.path, {throws : false})
    if(pkg) {
        this.data = pkg
    }else{
        this.data = opts.defaults
    }
  }
  get(key) {
    return this.data[key]
  }
  set(key, val) {
    return new Promise((a,r) => {
        this.data[key] = val;
        fs.writeJson(this.path, this.data)
            .then(a)
            .catch(e=>r(e))
    })
    
  }
}
module.exports = StoreJson
