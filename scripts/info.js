"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readJsonSync(path, encoding) {
    if (encoding === void 0) { encoding = 'utf8'; }
    var content = fs.readFileSync(path, { encoding: encoding });
    return JSON.parse(content);
}
exports.readJsonSync = readJsonSync;
function getInfo() {
    return readJsonSync("package.json");
}
exports.getInfo = getInfo;
exports.PKGINFO = getInfo();
if (require.main === module) {
    console.log('Name:', exports.PKGINFO.name);
    console.log('Version:', exports.PKGINFO.version);
    console.log('Description:', exports.PKGINFO.description);
    console.log('Repository:', exports.PKGINFO.repository);
    console.log('Keywords:', exports.PKGINFO.keywords);
    console.log('Author:', exports.PKGINFO.author);
    console.log('Contributors:', exports.PKGINFO.contributors);
    console.log('Licence:', exports.PKGINFO.license);
    console.log('Homepage', exports.PKGINFO.homepage);
}
