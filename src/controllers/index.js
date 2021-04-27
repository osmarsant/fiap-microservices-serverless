'use strict'

module.exports = ({ services, ResponseUtil }) => {
  const { TripService} = services

  const CreateTripController = require('./createTripController')({ TripService, ResponseUtil })

  return {
    CreateTripController
  }
}