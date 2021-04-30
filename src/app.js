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
  const { 
    CreateTripController, 
    ListAllTripsController, 
    ListAllCitiesController,
    ListAllCountriesController,
    ListTripsByCountryController,
    ListTripsByCountryAndCityController
  } = require('./controllers')({
    services,
    ResponseUtil
  })

  const saveTrip = middy(CreateTripController.handler)
    .use(jsonBodyParser())

  const listAllTrips = middy(ListAllTripsController.handler)
    .use(jsonBodyParser())

  const listAllCities = middy(ListAllCitiesController.handler)
    .use(jsonBodyParser())

  const listAllCountries = middy(ListAllCountriesController.handler)
    .use(jsonBodyParser())
    
  const listTripsByCountry = middy(ListTripsByCountryController.handler)
    .use(jsonBodyParser())

  const listTripsByCountryAndCity = middy(ListTripsByCountryAndCityController.handler)
    .use(jsonBodyParser())

  return {
    saveTrip,
    listAllTrips,
    listAllCities,
    listAllCountries,
    listTripsByCountry,
    listTripsByCountryAndCity
  }
}