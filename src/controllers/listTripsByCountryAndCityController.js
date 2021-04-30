'use strict';

module.exports = ({TripService, ResponseUtil}) => {
  return {
    handler: async (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false
        try {
          const {cityId, countryId} = event.pathParameters;
          
          const result = await TripService.getTripsByCountryAndCity(countryId, cityId)

          const response = ResponseUtil.build({
            statusCode: 200,
            body: JSON.stringify(result)
          })
  
          callback(null, response)
          
        } catch (error) {
          const response = ResponseUtil.build({
            statusCode: error.statusCode,
            body: JSON.stringify(error)
          })
          callback(null, response)
        }

    }
  } 
}