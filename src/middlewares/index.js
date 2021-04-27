'use strict'

module.exports = ({ fs, path, jwt, config, ResponseUtil }) => {
  const middlewares = {}
  const basename = path.basename(__filename)

  fs.readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.slice(-8) !== '.spec.js'
      )
    })
    .forEach(file => {
      const middleware = require(path.join(__dirname, file))({
        jwt,
        config,
        ResponseUtil
      })
      let name = file.replace('.js', '')
      name = name.charAt(0).toUpperCase() + name.slice(1, name.length)
      middlewares[name] = middleware
    })

  return middlewares
}