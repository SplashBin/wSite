const fs = require('fs')
const https = require('https')
const path = require('path')
const selfsigned = require('selfsigned')
const favicon = require('serve-favicon')
const helmet = require("helmet")
const exp = require('express')
const app = exp()

const cfg = require('./config.json')
const pem = selfsigned.generate([{ name: 'commonName', value: cfg.DNS }], { days: 365 })

const options = {
  key: fs.readFileSync(".https/localhost.key.pem"),
  cert: fs.readFileSync(".https/localhost.cert.pem")
};

const rtr = new (require('./mod/router.js').default)(cfg.ROUTES)

app.use(exp.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/ressources/img/favicon.ico'));
app.use(helmet());

app.get('*', async (req, res) => {
  if (await rtr.isRessource(req.url))
    rtr.getRessource(req, res)
  else
    rtr.root(req, res)
})

//app.listen(cfg.PORT, () => console.log("App listening on port : " + cfg.PORT))
https.createServer(options, app).listen(cfg.PORT);
