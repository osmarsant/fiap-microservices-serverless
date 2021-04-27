'use strict'

module.exports = () => {
  return {
    unauthorized: msg => {
      const error = new Error()
      error.statusCode = 401
      error.message = msg
      return error
    },
    notFound: msg => {
      const error = new Error()
      error.statusCode = 404
      error.message = msg
      return error
    },
    internal: msg => {
      const error = new Error()
      error.statusCode = 500
      error.message = msg
      return error
    },
    unprocessable: msg => {
      const error = new Error()
      error.statusCode = 422
      error.message = msg
      return error
    }
  }
}