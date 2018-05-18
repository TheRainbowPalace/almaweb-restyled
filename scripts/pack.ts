/**
 * Created by Jakob Rieke on 18.05.18.
 * Copyright © 18.05.18 Jakob Rieke. All rights reserved.
 */
import { build, getNormalName } from "./build"
import { PKGINFO } from "./info"

declare let require
declare var module

const fs = require('fs')
const execSync = require('child_process').execSync


export function pack (log = true, buildExists = false)
{
  if(!buildExists) build();

  if (!fs.existsSync("releases/")) fs.mkdirSync("releases/");

  let releaseName = getNormalName() + '-' + PKGINFO.version + '.zip'
  execSync("zip -r releases/" + releaseName +
      " build/almaweb.safariextension/" +
      " build/edge-extension" +
      " build/chrome-extension" +
      " build/firefox-extension")

  if (log) console.log('Created release', releaseName);
}

if (require.main === module) pack();