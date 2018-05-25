/**
 * Created by Jakob Rieke on 18.05.18.
 * Copyright © 18.05.18 Jakob Rieke. All rights reserved.
 */
import { PKGINFO } from "./info"

declare let require
declare let module
declare let process

const fs = require("fs");
const execSync = require('child_process').execSync


export function getNormalName ()
{
  return PKGINFO.name.toLowerCase().replace(new RegExp(' '), '-');
}

/*
function copyFiles (isFolder = true, destination: string, ...files: string[])
{
  let command = process.platform == 'win32' ? 'copy' : 'cp'
  if (isFolder) command += ' -r';

  for (let file of files) command += ' ' + file;

  command += ' ' + destination
  execSync(command)
}
*/

function copyFiles (destination: string, ...files: string[])
{
  let filename
  for (let file of files)
  {
    filename = file.split('/').slice(-1)[0]
    fs.copyFileSync(file, destination + filename)
  }
}

function replaceInPlist (plist: string, key: string, value: string)
{
  let subReg = '<string>[\\w\\d()!"§$%&/()=?`´*\'-.,\\s]*<\/string>'
  let regExpr = new RegExp('<key>' + key + '<\/key>\\s*' + subReg)
  let matches = plist.match(regExpr)
  if (matches == null) throw "Plist-Key not found"

  let match = matches[0]
  match = match.replace(new RegExp(subReg),
      '<string>' + value + '</string>')
  return plist.replace(regExpr, match)
}

/**
 * Build Safari extension
 * @param {string} output
 * @param {boolean} log
 */
export function buildSafari (output: string, log = true)
{
  if (log) console.log("Building Safari Extension");

  let safariDir = "build/almaweb.safariextension/"
  if (!fs.existsSync(safariDir)) fs.mkdirSync(safariDir);

  /* Copy Resources */
  copyFiles(safariDir,
      "resources/Icon-16.png",
      "resources/Icon-32.png",
      "resources/Icon-48.png",
      "resources/Icon-64.png")

  /* Create Manifest */
  let manifest = fs.readFileSync("src/safari/Info.plist", {encoding: 'utf8'})
  manifest = replaceInPlist(manifest, 'Author', PKGINFO.author)
  manifest = replaceInPlist(manifest, 'Description', PKGINFO.description)
  manifest = replaceInPlist(manifest, 'CFBundleVersion', PKGINFO.version)

  fs.writeFileSync(safariDir + 'Info.plist', manifest, 'utf8')

  /* Copy Other Source Files */
  fs.writeFileSync(safariDir + '/inject.js',
      output, 'utf8')
}

/**
 * Build Chrome extension
 * @param {string} output
 * @param {boolean} log
 */
export function buildChrome (output: string, log = true)
{
  if (log) console.log("Building Chrome Extension");

  let chromeDir = "build/chrome-extension/"
  if (!fs.existsSync(chromeDir)) fs.mkdirSync(chromeDir);

  let imgDir = chromeDir + "images/"
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir);

  copyFiles(chromeDir + "images/",
      "resources/Icon-16.png",
      "resources/Icon-32.png",
      "resources/Icon-48.png",
      "resources/Icon-128.png")

  let manifest = fs.readFileSync("src/chrome/manifest.json", {encoding: 'utf8'})
  // -> Manipulate manifest file
  fs.writeFileSync(chromeDir + 'manifest.json', manifest, 'utf8')

  fs.writeFileSync(chromeDir + '/inject.js', output, 'utf8')
  execSync("cp " +
      "src/splashscreen.js " +
      "src/splashscreen.css " + chromeDir)
}

export function buildFirefox (output: string, log = true)
{
  if (log) console.log("Building Firefox Extension");

  let firefoxDir = "build/firefox-extension/"
  if (!fs.existsSync(firefoxDir)) fs.mkdirSync(firefoxDir);

  /* Copy Resources */
  let imgDir = firefoxDir + "images/"
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir);

  copyFiles(firefoxDir + "images/",
      "resources/Icon-48.png",
      "resources/Icon-96.png")

  /* Create Manifest */
  let manifest = fs.readFileSync("src/firefox/manifest.json", {encoding: 'utf8'})
  fs.writeFileSync(firefoxDir + 'manifest.json', manifest, 'utf8')

  /* Copy Other Source Files */
  fs.writeFileSync(firefoxDir + '/inject.js', output, 'utf8')
}

export function buildEdge (output: string, log = true)
{
  if (log) console.log("Building Edge Extension");

  let edgeDir = "build/edge-extension/"
  if (!fs.existsSync(edgeDir)) fs.mkdirSync(edgeDir);

  /* Copy Resources */
  let imgDir = edgeDir + "images/"
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir);

  copyFiles(edgeDir + "images/",
      "resources/Icon-20.png",
      "resources/Icon-25.png",
      "resources/Icon-30.png",
      "resources/Icon-40.png")

  /* Create Manifest */
  let manifest = fs.readFileSync("src/edge/manifest.json", {encoding: 'utf8'})
  fs.writeFileSync(edgeDir + 'manifest.json', manifest, 'utf8')

  /* Copy Other Source Files */
  fs.writeFileSync(edgeDir + '/inject.js', output, 'utf8')
}

/**
 * Build all extensions.
 * @param {boolean} log
 */
export function build (log = true)
{
  if (!fs.existsSync("build/")) fs.mkdirSync("build/");

  const javascript = fs.readFileSync("src/inject.js", {encoding: 'utf8'})
  const css = fs.readFileSync("src/inject.css", {encoding: 'utf8'})
  const output = javascript.replace('!StylePlaceholder', css)

  buildSafari(output)
  buildChrome(output)
  buildFirefox(output)
  buildEdge(output)

  if (log) console.log("Done");
}

if (require.main === module) build();
