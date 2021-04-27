'use strict'

module.exports = ({
  fs,
  path,
  utils,
  config,
  AWS,
  middy,
  uuid,
  jsonBodyParser
}) => {
  const { ErrorUtil, ResponseUtil, DynamodbHelper } = utils

  const { dynamodb } = require('./database')({ AWS, config })
  const repositories = require('./repository')({ dynamodb, DynamodbHelper, uuid, config })
  const services = require('./services')({ repositories })
  const { CreateTripController } = require('./controllers')({
    services,
    ResponseUtil
  })

  const saveTrip = middy(CreateTripController.handler)
    .use(jsonBodyParser())

  return {
    saveTrip
  }
}