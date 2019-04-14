#!/usr/bin/env node
const program = require('commander'); // 一个命令行参数解析工具
const pkg = require('../package.json'); // 这里是为了自动设置代理，有的仓库在外网，需要设置代理才能够下载program  
const inquirer = require('inquirer');
const logger = require('../lib/logger');
const download = require('download-git-repo')

const improveLib = ['react', 'vue', 'angular'];

program.version(pkg.version);

program.command('use <name>')
    .description(`开发所需要的框架名称。目前支持 ${improveLib.join(', ')}`)
    .action(async function (name) {
        if (improveLib.indexOf(name.toLowerCase()) === -1) {
            console.log(`未知 name ---> ${name}`);
            return;
        }
        inquirer.prompt([
            {
                type: 'list',
                message: `你计划开发的 ${name} 项目是一个？`,
                name: 'type',
                choices: [
                    "单页面",
                    "多页面",
                ]
            }
        ]).then(answers => {
            const { type } = answers;
            if (type === '单页面') {
                console.log('install scripts');
                download('xx1124961758/react-dev-kit', 'react-dev-demo/', function (err) {
                    console.log(err ? 'Error' : 'Success')
                })
            } else if (type === '多页面') {

            }
        }).catch(logger.fatal);
    });

program.parse(process.argv);
