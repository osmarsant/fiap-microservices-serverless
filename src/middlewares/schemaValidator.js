'use strict'

module.exports = ({ ResponseUtil }) => {
  return {
    validate: schema => {
      return {
        before: (handler, next) => {
          const { error } = schema.validate(handler.event.body)
          const valid = error == null
          if (!valid) {
            const { details } = error
            const message = details.map(i => i.message).join(',')
            const response = ResponseUtil.build({
              statusCode: 422,
              body: JSON.stringify(message)
            })
            return handler.callback(null, response)
          }
          next()
        }
      }
    }
  }
}