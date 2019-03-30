const fs = require('fs')
const path = require('path')

exports.default = class Render {
  constructor (dir) {
    this.base_dir = dir
  }

  async print(dir, page) {
    if (page == 'search')
      dir = '/search'
    let tmp = require(path.resolve(__dirname + '/..' + this.base_dir + dir + dir + '.js')).default
    return await tmp.render()
  }
}
