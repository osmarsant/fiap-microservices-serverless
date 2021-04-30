'use strict'

module.exports = ({ services, ResponseUtil }) => {
  const { TripService} = services

  const CreateTripController = require('./createTripController')({ TripService, ResponseUtil })
  const ListAllTripsController = require('./listAllTripsController')({ TripService, ResponseUtil })
  const ListAllCountriesController = require('./listAllCountriesController')({ TripService, ResponseUtil })
  const ListAllCitiesController = require('./listAllCitiesController')({ TripService, ResponseUtil })
  const ListTripsByCountryAndCityController = require('./listTripsByCountryAndCityController')({ TripService, ResponseUtil })
  const ListTripsByCountryController = require('./listTripsByCountryController')({ TripService, ResponseUtil })

  return {
    CreateTripController,
    ListAllTripsController,
    ListAllCitiesController,
    ListAllCountriesController,
    ListTripsByCountryController,
    ListTripsByCountryAndCityController
  }
}