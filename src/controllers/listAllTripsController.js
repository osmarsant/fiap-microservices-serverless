'use strict';

module.exports = ({TripService, ResponseUtil}) => {
  return {
    handler: async (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false
        try {
          const result = await TripService.getAllTrips()
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