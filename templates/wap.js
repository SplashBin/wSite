"use strict"
const fs = require('fs')
const cfg = require('../config.json')

const doc = ""
+ "#### WAP DOC ####\n"
+ "Usage : npm run wap [mod] [arg1 [arg2 ...]]\n"
+ "mod :\n"
+ "t, create-template [name]"
+ ""

if (process.argv.length < 3)
  console.log(doc);
else
  switch (process.argv[2]) {
    case "t":
    case "create-template":
      fs.mkdirSync(__dirname + '/' + process.argv[3]);
      fs.createWriteStream(__dirname + '/' + process.argv[3] + '/' + process.argv[3] + ".ejs", { overwrite: false });
      fs.createWriteStream(__dirname + '/' + process.argv[3] + '/' + process.argv[3] +".js", { overwrite: false });
      break;
    default:
      console.log(doc);
  }
