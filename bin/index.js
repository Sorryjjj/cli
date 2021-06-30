#!/usr/bin/env node

import fs from "fs"
import chalk from "chalk"
import execa from "execa"
import path from "path"
import createIndexTemplate from "./createIndexTemplate.js"
import createPackageTemplate from "./createPackageTemplate.js"
import question from "./question/index.js"
import { createConfig } from "./config.js"
const answer = await question()
const config = createConfig(answer)

console.log(chalk.blue(`创建项目文件夹:${config.packageName}`))

fs.mkdirSync(getRootPath())

fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(config))

fs.writeFileSync(`${getRootPath()}/package.json`, createPackageTemplate(config))

const res = await execa("yarn", {
    cwd: getRootPath(),
    stdio: [2, 2, 2]
})

console.log(chalk.blue(`
        cd ${config.packageName} 
        npm run serve
`));

function getRootPath() {
    return path.resolve(process.cwd(), config.packageName)
}

