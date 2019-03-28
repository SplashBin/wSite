const path = require('path');
const util = new (require('./utils.js').default)()
const rend = new (require('./render.js').default)()

exports.default = class Router {
    constructor(rts) {
      this.ressources = rts.ressources_access
      this.controller = rts.controller_access
      this.ressources_base = rts.ressources_base
      this.controller_base = rts.controller_base
      this.templates_base = rts.templates_base
    }

    async makeCookies() {
      return true
    }

    async sessionChk() {
      return true
    }

    async isRessource(url) {
      let tmp = url.match(/^(\/[^\/]+)(.+)?(\/[^\/]+\.[^\/]+)$/)
      if (tmp != null && tmp[1] && tmp[3])
        return true
      return false
    }

    async getRessource(req, res) {
        let dir = req.url.match(/^(\/[^\/]+)(.+)?(\/[^\/]+\.[^\/]+)$/)
        let ref = dir[1]
        if (!fs.existsSync(path.resolve(__dirname + "/.." + this.ressources_base + dir[1] + dir[3])))
          res.status(404).send("Not Found")
        else if (util.chk(this.ressources.auth, ref) && await this.sessionChk(this.makeCookies(req.headers.cookie)))
          res.sendFile(path.resolve(__dirname + "/.." + this.ressources_base + dir[1] + dir[3]))
        else if (util.chk(this.ressources.no_auth, ref))
          res.sendFile(path.resolve(__dirname + "/.." + this.ressources_base + dir[1] + dir[3]))
        else
          res.status(404).send("Not Found")
    }

    async root(req, res) {
      let dir = req.url.match(/(\/[^\/]+)/g)
      let ref = dir == null ? null : dir[0]
      console.log(dir);
      if (dir == null || (!util.chk(this.controller.auth, ref) && !util.chk(this.controller.no_auth, ref)) )
        res.send(await rend.print("logSub", ""))
      else if (util.chk(this.controller.auth, ref) && await this.sessionChk(this.makeCookies(req.headers.cookie)))
        res.send(await rend.print(dir[0], dir[1]))
      else if (util.chk(this.controller.no_auth, ref))
        res.send(await rend.print(dir[0], dir[1]))
      else
        res.send(await rend.print("logSub", ""))
    }
}
