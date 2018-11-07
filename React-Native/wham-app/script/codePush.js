var program = require('commander')
var shell = require('shelljs')
var inquirer = require('inquirer')
var styles = {
  'bold': ['\x1B[1m', '\x1B[22m'],
  'italic': ['\x1B[3m', '\x1B[23m'],
  'underline': ['\x1B[4m', '\x1B[24m'],
  'inverse': ['\x1B[7m', '\x1B[27m'],
  'strikethrough': ['\x1B[9m', '\x1B[29m'],
  'white': ['\x1B[37m', '\x1B[39m'],
  'grey': ['\x1B[90m', '\x1B[39m'],
  'black': ['\x1B[30m', '\x1B[39m'],
  'blue': ['\x1B[34m', '\x1B[39m'],
  'cyan': ['\x1B[36m', '\x1B[39m'],
  'green': ['\x1B[32m', '\x1B[39m'],
  'magenta': ['\x1B[35m', '\x1B[39m'],
  'red': ['\x1B[31m', '\x1B[39m'],
  'yellow': ['\x1B[33m', '\x1B[39m'],
  'whiteBG': ['\x1B[47m', '\x1B[49m'],
  'greyBG': ['\x1B[49;5;8m', '\x1B[49m'],
  'blackBG': ['\x1B[40m', '\x1B[49m'],
  'blueBG': ['\x1B[44m', '\x1B[49m'],
  'cyanBG': ['\x1B[46m', '\x1B[49m'],
  'greenBG': ['\x1B[42m', '\x1B[49m'],
  'magentaBG': ['\x1B[45m', '\x1B[49m'],
  'redBG': ['\x1B[41m', '\x1B[49m'],
  'yellowBG': ['\x1B[43m', '\x1B[49m']
}

program.action(function () {
  console.log(styles.yellow[0], '欢迎使用-都快金服热更新服务')
  const version = '1.0.0'
  const bundleId = 'com.aloestec.app.wham'
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: 'input',
        name: 'version',
        message: '请输入当前版本号：',
        default: function () {
          return version
        }
      },
      {
        type: 'list',
        name: 'deployment',
        message: '请选择更新环境：',
        choices: ['Staging', 'Production']
      },
      {
        type: 'list',
        name: 'platform',
        message: '请选择更新平台：',
        choices: ['android', 'ios']
      },
      {
        type: 'input',
        name: 'description',
        message: '请输入更新内容：'
      }
    ])
    .then(answers => {
      const {version, deployment, description, platform} = answers
      const isStaging = deployment === 'Staging'
      const config = {
        Staging: 'PREFIX_TEST',
        Production: 'PREFIX'
      }
      shell.ls('./App/Config/IPConfig.js').forEach(function (file) {
        shell.sed('-i', /default (.)*/, `default ${config[deployment]}`, file)
      })
      console.log(styles.yellow[0], `项目已成功设置为：${isStaging ? '测试环境' : '生产环境'}`)
      console.log(styles.yellow[0], `正在设置执行前置操作`)
      console.log(styles.white[0], 'node theme/beforeEverything.js')
      shell.exec('node script/beforeEverything.js')
      console.log(styles.yellow[0], `前置操作成功，准备打包`)
      let exec = `code-push release-react wham-${platform} ${platform} --t ${version} --dev false --d ${deployment} --des "${description}" --m true --outputDir build/${platform}`
      console.log(styles.white[0], exec)
      shell.exec(exec)
      console.log(styles.yellow[0], `正在提交sentry`)
      let execSentry = `export SENTRY_PROPERTIES=ios/sentry.properties && sentry-cli react-native codepush wham-${platform} ${platform} ./build/${platform}/CodePush --bundle-id ${bundleId}${isStaging ? '.staging' : ''}-${platform}-${version} --deployment ${deployment}`
      console.log(styles.white[0], execSentry)
      shell.exec(execSentry)
      console.log(styles.green[0], '更新成功！')
      console.log(styles.white[0], '')
    })
})

program.parse(process.argv)
