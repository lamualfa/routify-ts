const { execSync } = require('child_process')

module.exports = function (dir, command) {
  execSync(`cd ${dir} && ${command}`, {
    stdio: 'ignore',
  })
}
