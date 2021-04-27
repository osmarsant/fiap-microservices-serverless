'use strict'

module.exports = ({dynamodb, DynamodbHelper, uuid, config}) => {
  const TripRepository = require('./tripRepository')({ dynamodb, DynamodbHelper, uuid, config})
  return {
    TripRepository
  }
}