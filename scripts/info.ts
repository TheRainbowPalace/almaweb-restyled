/**
 * Created by Jakob Rieke on 18.05.18.
 * Copyright © 18.05.18 Jakob Rieke. All rights reserved.
 */
declare let require
declare var module

const fs = require("fs");


export interface PackageInfo
{
  name: string,
  version: string,
  description: string,
  repository: {
    type: string,
    url: string
  },
  keywords: string[],
  author: string,
  contributors: {
    name?: string,
    email?: string,
    url?: string
  }[],
  license: string,
  homepage: string
}

export function readJsonSync (path: string, encoding = 'utf8')
{
  const content = fs.readFileSync(path, {encoding: encoding})
  return JSON.parse(content)
}

export function getInfo (): PackageInfo
{
  return readJsonSync("package.json")
}

export const PKGINFO = getInfo();

if (require.main === module)
{
  console.log('Name:', PKGINFO.name)
  console.log('Version:', PKGINFO.version)
  console.log('Description:', PKGINFO.description)
  console.log('Repository:', PKGINFO.repository)
  console.log('Keywords:', PKGINFO.keywords)
  console.log('Author:', PKGINFO.author)
  console.log('Contributors:', PKGINFO.contributors)
  console.log('Licence:', PKGINFO.license)
  console.log('Homepage', PKGINFO.homepage)
}
