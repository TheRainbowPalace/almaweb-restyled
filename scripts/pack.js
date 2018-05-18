"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Jakob Rieke on 18.05.18.
 * Copyright © 18.05.18 Jakob Rieke. All rights reserved.
 */
var build_1 = require("./build");
var info_1 = require("./info");
var fs = require('fs');
var execSync = require('child_process').execSync;
function pack(log, buildExists) {
    if (log === void 0) { log = true; }
    if (buildExists === void 0) { buildExists = false; }
    if (!buildExists)
        build_1.build();
    if (!fs.existsSync("releases/"))
        fs.mkdirSync("releases/");
    var releaseName = build_1.getNormalName() + '-' + info_1.PKGINFO.version + '.zip';
    execSync("zip -r releases/" + releaseName +
        " build/almaweb.safariextension/" +
        " build/edge-extension" +
        " build/chrome-extension" +
        " build/firefox-extension");
    if (log)
        console.log('Created release', releaseName);
}
exports.pack = pack;
if (require.main === module)
    pack();
