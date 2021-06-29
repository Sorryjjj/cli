#!/usr/bin/env node

import fs from "fs"
import chalk from "chalk"
import execa from "execa"
import inquirer from "inquirer";
import createIndexTemplate from "./createIndexTemplate.js"
import createPackageTemplate from "./createPackageTemplate.js"
import question from "./question/index.js"
import { createConfig } from "./config.js"

const answer = await question()
const inputConfig = createConfig(answer)

// 创建文件夹
fs.mkdirSync(getRootPath())
// 创建入口文件
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(inputConfig))
// 创建package.json
fs.writeFileSync(`${getRootPath()}/package.json`, createPackageTemplate(inputConfig))

// 安装依赖
execa("yarn", {
    cwd: getRootPath(),
    stdio: [2, 2, 2]
})
function getRootPath() {
    return './cli'
}

