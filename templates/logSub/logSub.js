const ejs = require('ejs')
const fs = require('fs')

class logSub {
  async render() {
    return ejs.render(fs.readFileSync(__dirname + '/logSub.ejs', 'utf-8'), {})
  }
}

exports.default = new logSub()
