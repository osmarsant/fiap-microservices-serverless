'use strict'

module.exports = () => {
  return {
    build: params => {
      return {
        statusCode: params.statusCode,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': false
        },
        body: params.body
      }
    }
  }
}