"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Jakob Rieke on 18.05.18.
 * Copyright © 18.05.18 Jakob Rieke. All rights reserved.
 */
var info_1 = require("./info");
var fs = require("fs");
var execSync = require('child_process').execSync;
function getNormalName() {
    return info_1.PKGINFO.name.toLowerCase().replace(new RegExp(' '), '-');
}
exports.getNormalName = getNormalName;
function replaceInPlist(plist, key, value) {
    var subReg = '<string>[\\w\\d()!"§$%&/()=?`´*\'-.,\\s]*<\/string>';
    var regExpr = new RegExp('<key>' + key + '<\/key>\\s*' + subReg);
    var matches = plist.match(regExpr);
    if (matches == null)
        throw "Plist-Key not found";
    var match = matches[0];
    match = match.replace(new RegExp(subReg), '<string>' + value + '</string>');
    return plist.replace(regExpr, match);
}
/**
 * Build Safari extension
 * @param {string} output
 * @param {boolean} log
 */
function buildSafari(output, log) {
    if (log === void 0) { log = true; }
    if (log)
        console.log("Building Safari Extension");
    var safariDir = "build/almaweb.safariextension/";
    if (!fs.existsSync(safariDir))
        fs.mkdirSync(safariDir);
    /* Copy Resources */
    execSync("cp " +
        "resources/Icon-16.png " +
        "resources/Icon-32.png " +
        "resources/Icon-48.png " +
        "resources/Icon-64.png " + safariDir);
    /* Create Manifest */
    var manifest = fs.readFileSync("src/safari/Info.plist", { encoding: 'utf8' });
    manifest = replaceInPlist(manifest, 'Author', info_1.PKGINFO.author);
    manifest = replaceInPlist(manifest, 'Description', info_1.PKGINFO.description);
    manifest = replaceInPlist(manifest, 'CFBundleVersion', info_1.PKGINFO.version);
    fs.writeFileSync(safariDir + 'Info.plist', manifest, 'utf8');
    /* Copy Other Source Files */
    fs.writeFileSync(safariDir + '/inject.js', output, 'utf8');
}
exports.buildSafari = buildSafari;
/**
 * Build Chrome extension
 * @param {string} output
 * @param {boolean} log
 */
function buildChrome(output, log) {
    if (log === void 0) { log = true; }
    if (log)
        console.log("Building Chrome Extension");
    var chromeDir = "build/chrome-extension/";
    if (!fs.existsSync(chromeDir))
        fs.mkdirSync(chromeDir);
    var imgDir = chromeDir + "images/";
    if (!fs.existsSync(imgDir))
        fs.mkdirSync(imgDir);
    execSync("cp " +
        "resources/Icon-16.png " +
        "resources/Icon-32.png " +
        "resources/Icon-48.png " +
        "resources/Icon-128.png " + chromeDir + "images/");
    var manifest = fs.readFileSync("src/chrome/manifest.json", { encoding: 'utf8' });
    // -> Manipulate manifest file
    fs.writeFileSync(chromeDir + 'manifest.json', manifest, 'utf8');
    fs.writeFileSync(chromeDir + '/inject.js', output, 'utf8');
    execSync("cp " +
        "src/splashscreen.js " +
        "src/splashscreen.css " + chromeDir);
}
exports.buildChrome = buildChrome;
function buildFirefox(output, log) {
    if (log === void 0) { log = true; }
    if (log)
        console.log("Building Firefox Extension");
    var firefoxDir = "build/firefox-extension/";
    if (!fs.existsSync(firefoxDir))
        fs.mkdirSync(firefoxDir);
    /* Copy Resources */
    var imgDir = firefoxDir + "images/";
    if (!fs.existsSync(imgDir))
        fs.mkdirSync(imgDir);
    execSync("cp " +
        "resources/Icon-48.png " +
        "resources/Icon-96.png " + firefoxDir + "images/");
    /* Create Manifest */
    var manifest = fs.readFileSync("src/firefox/manifest.json", { encoding: 'utf8' });
    fs.writeFileSync(firefoxDir + 'manifest.json', manifest, 'utf8');
    /* Copy Other Source Files */
    fs.writeFileSync(firefoxDir + '/inject.js', output, 'utf8');
}
exports.buildFirefox = buildFirefox;
function buildEdge(output, log) {
    if (log === void 0) { log = true; }
    if (log)
        console.log("Building Edge Extension");
    var edgeDir = "build/edge-extension/";
    if (!fs.existsSync(edgeDir))
        fs.mkdirSync(edgeDir);
    /* Copy Resources */
    var imgDir = edgeDir + "images/";
    if (!fs.existsSync(imgDir))
        fs.mkdirSync(imgDir);
    execSync("cp " +
        "resources/Icon-20.png " +
        "resources/Icon-25.png " +
        "resources/Icon-30.png " +
        "resources/Icon-40.png " + edgeDir + "images/");
    /* Create Manifest */
    var manifest = fs.readFileSync("src/edge/manifest.json", { encoding: 'utf8' });
    fs.writeFileSync(edgeDir + 'manifest.json', manifest, 'utf8');
    /* Copy Other Source Files */
    fs.writeFileSync(edgeDir + '/inject.js', output, 'utf8');
}
exports.buildEdge = buildEdge;
/**
 * Build all extensions.
 * @param {boolean} log
 */
function build(log) {
    if (log === void 0) { log = true; }
    if (!fs.existsSync("build/"))
        fs.mkdirSync("build/");
    var javascript = fs.readFileSync("src/inject.js", { encoding: 'utf8' });
    var css = fs.readFileSync("src/inject.css", { encoding: 'utf8' });
    var output = javascript.replace('!StylePlaceholder', css);
    buildSafari(output);
    buildChrome(output);
    buildFirefox(output);
    buildEdge(output);
    if (log)
        console.log("Done");
}
exports.build = build;
if (require.main === module)
    build();
