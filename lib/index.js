#!/usr/bin/env node

const {program} = require('commander')
const chalk = require('chalk')
const {version} = require('../package.json')

const creator = require('./creator')

/**
 * 查看当前版本
 */
program.version(chalk.blue(version))

/**
 * 创建模版
 */
program.command('create <template-name>')
  .description(chalk.yellow('创建模版'))
  .action((name, options) => {
    // 调用命令
    creator(name, options)
  })

/**
 * 查看帮助
 */
program.on('--help', () => {
  console.log()
  console.log(`Run ${chalk.cyan(`works <command> --help`)} for detailed usage of given command.`)
  console.log()
})

/**
 * 解析命令行
 */
program.parse(process.argv);
