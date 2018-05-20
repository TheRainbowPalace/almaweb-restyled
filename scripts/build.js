"use strict";
exports.__esModule = true;
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
function copyFiles(destination) {
    var files = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        files[_i - 1] = arguments[_i];
    }
    var filename;
    for (var _a = 0, files_1 = files; _a < files_1.length; _a++) {
        var file = files_1[_a];
        filename = file.split('/').slice(-1)[0];
        fs.copyFileSync(file, destination + filename);
    }
}
/**
 * Replace a value in a .plist file (Mac OS key-value files)
 * @param {string} plist The .plist file to edit.
 * @param {string} key The key in the .plist file to edit.
 * @param {string} value The new value to be set for the key.
 */
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
    copyFiles(safariDir, "resources/Icon-16.png", "resources/Icon-32.png", "resources/Icon-48.png", "resources/Icon-64.png");
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
    /* Copy Resources */
    var imgDir = chromeDir + "images/";
    if (!fs.existsSync(imgDir))
        fs.mkdirSync(imgDir);
    copyFiles(chromeDir + "images/", "resources/Icon-16.png", "resources/Icon-32.png", "resources/Icon-48.png", "resources/Icon-128.png");
    /* Create Manifest */
    var manifest = fs.readFileSync("src/chrome/manifest.json", { encoding: 'utf8' });
    manifest = JSON.parse(manifest);
    manifest.version = info_1.PKGINFO.version;
    manifest.name = info_1.PKGINFO.name;
    manifest.description = info_1.PKGINFO.description;
    fs.writeFileSync(chromeDir + 'manifest.json', JSON.stringify(manifest), 'utf8');
    /* Copy Other Source Files */
    fs.writeFileSync(chromeDir + '/inject.js', output, 'utf8');
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
    copyFiles(firefoxDir + "images/", "resources/Icon-48.png", "resources/Icon-96.png");
    /* Create Manifest */
    var manifest = fs.readFileSync("src/firefox/manifest.json", { encoding: 'utf8' });
    manifest = JSON.parse(manifest);
    manifest.version = info_1.PKGINFO.version;
    manifest.name = info_1.PKGINFO.name;
    manifest.description = info_1.PKGINFO.description;
    fs.writeFileSync(firefoxDir + 'manifest.json', JSON.stringify(manifest), 'utf8');
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
    copyFiles(edgeDir + "images/", "resources/Icon-20.png", "resources/Icon-25.png", "resources/Icon-30.png", "resources/Icon-40.png");
    /* Create Manifest */
    var manifest = fs.readFileSync("src/edge/manifest.json", { encoding: 'utf8' });
    manifest = JSON.parse(manifest);
    manifest.version = info_1.PKGINFO.version;
    manifest.name = info_1.PKGINFO.name;
    manifest.description = info_1.PKGINFO.description;
    manifest.author = info_1.PKGINFO.author;
    fs.writeFileSync(edgeDir + 'manifest.json', JSON.stringify(manifest), 'utf8');
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
