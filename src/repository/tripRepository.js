'use strict'

module.exports = ({ dynamodb, uuid, config }) => {
  const saveCountry = async (country) => {
    const countryId = `${uuid()}`
    const params = {
      TableName: config.dynamodb.tableName,
      Item: {
        Type: 'COUNTRY',
        PK: countryId,
        SK: countryId,
        name: country,
        createdAt: new Date().toISOString(),
      }

    }
    const result = await dynamodb.put(params).promise()
    return countryId
  }

  const saveCity = async (countryId, city) => {
    const cityId = `${uuid()}`
    const params ={
      TableName: config.dynamodb.tableName,
      Item: {
        Type: 'CITY',
        PK: cityId,
        SK: countryId,
        name: city,
        createdAt: new Date().toISOString(),
      }
    }
    const result = await dynamodb.put(params).promise()
    return cityId
  }

  const saveTrip = async ({ cityId, country, city, reason, date }) => {
    const tripId = `${uuid()}`
    const params = {
      TableName: config.dynamodb.tableName,
      Item: {
        PK: tripId,
        SK: `${cityId}`,
        Type: 'TRIP',
        country,
        city,
        reason,
        date,
        createdAt: new Date().toISOString(),
      },
    }
    const result = await dynamodb.put(params).promise()
    return tripId;
  }

  const getCountry = async (country) => {
    const params = {
      TableName: config.dynamodb.tableName,
      IndexName: 'Type-index',
      KeyConditionExpression: '#Type = :type',
      ExpressionAttributeNames: { '#Type': 'Type', '#name': 'name' },
      FilterExpression: 'contains(#name, :name)',
      ExpressionAttributeValues: {
        ':type': 'COUNTRY',
        ':name': country,
      },
    }
    const result = await dynamodb.query(params).promise()
    return result.Items[0]
  }

  const getCity = async (countryId, city) => {
    const params = {
      TableName: config.dynamodb.tableName,
      IndexName: 'SK-index',
      KeyConditionExpression: '#SK = :sk',
      FilterExpression: 'contains(#name, :name)',
      ExpressionAttributeNames: { '#SK': 'SK', '#name': 'name' },
      ExpressionAttributeValues: {
        ':sk': countryId,
        ':name': city,
      },
    }

    const result = await dynamodb.query(params).promise()
    return result.Items[0]
  }

  const getCitiesByCountry = async (countryId) => {
    const params = {
      TableName: config.dynamodb.tableName,
        IndexName: 'Type-index',
        KeyConditionExpression: '#Type = :type',
        FilterExpression: '#SK = :sk',
        ExpressionAttributeNames: { '#SK': 'SK', '#Type': 'Type'},
        ExpressionAttributeValues: {
          ':type': 'CITY',
          ':sk': `${countryId}`,
        },
    }

    const result = await dynamodb.query(params).promise()
    return result.Items
  }

  const getCityById = async (countryId, cityId) => {
    const params = {
      TableName: config.dynamodb.tableName,
        KeyConditionExpression: '#PK = :pk and #SK = :sk',
        FilterExpression: '#Type = :type',
        ExpressionAttributeNames: { '#PK': 'PK', '#SK': 'SK', '#Type': 'Type'},
        ExpressionAttributeValues: {
          ':type': 'CITY',
          ':pk': `${cityId}`,
          ':sk': `${countryId}`,
        },
    }

    const result = await dynamodb.query(params).promise()
    return result.Items
  }

  

  const getTripsByCountry = async (countryId) => {

    const cities = await getCitiesByCountry(countryId);
    let trips = [];

    for(const city of cities){
      const params = {
        TableName: config.dynamodb.tableName,
        IndexName: 'Type-index',
        KeyConditionExpression: '#Type = :type',
        FilterExpression: '#SK = :sk',
        ExpressionAttributeNames: { '#SK': 'SK', '#Type': 'Type'},
        ExpressionAttributeValues: {
          ':type': 'TRIP',
          ':sk': `${city.PK}`,
        },
      }
      const result = await dynamodb.query(params).promise()
      trips = trips.concat(result.Items)
    }

    return trips.map((trip) =>({
      id: trip.PK,
      cityId: trip.SK,
      country: trip.country,
      city: trip.city,
      date: trip.date,
      reason: trip.reason
      }
    ));
   
  }

  const getAllTrips = async () => {
    const params = {
      TableName: config.dynamodb.tableName,
      IndexName: 'Type-index',
      KeyConditionExpression: '#Type = :type',
      ExpressionAttributeNames: { '#Type': 'Type' },
      ExpressionAttributeValues: {
        ':type': 'TRIP',
      },
    }
    const result = await dynamodb.query(params).promise()
    return result.Items.map((trip) =>({
      id: trip.PK,
      cityId: trip.SK,
      country: trip.country,
      city: trip.city,
      date: trip.date,
      reason: trip.reason
      }
    ))
  }


  const getAllCities = async () => {
    const params = {
      TableName: config.dynamodb.tableName,
      IndexName: 'Type-index',
      KeyConditionExpression: '#Type = :type',
      ExpressionAttributeNames: { '#Type': 'Type'},
      ExpressionAttributeValues: {
        ':type': 'CITY',
      },
    }
    const result = await dynamodb.query(params).promise()
    return result.Items.map((city) => ({
      id: city.PK,
      countryId: city.SK,
      name: city.name
    }))
  }

  const getAllCountries = async () => {
    const params = {
      TableName: config.dynamodb.tableName,
      IndexName: 'Type-index',
      KeyConditionExpression: '#Type = :type',
      ExpressionAttributeNames: { '#Type': 'Type'},
      ExpressionAttributeValues: {
        ':type': 'COUNTRY',
      },
    }
    const result = await dynamodb.query(params).promise()
    return result.Items.map((country) => ({
      id: country.PK,
      name: country.name
    }))
  }

  const getTripsByCountryAndCity = async (countryId, cityId) => {
    const cities = await getCityById(countryId, cityId);
    let trips = [];

    for(const city of cities){
      const params = {
        TableName: config.dynamodb.tableName,
        IndexName: 'Type-index',
        KeyConditionExpression: '#Type = :type',
        FilterExpression: '#SK = :sk',
        ExpressionAttributeNames: { '#SK': 'SK', '#Type': 'Type'},
        ExpressionAttributeValues: {
          ':type': 'TRIP',
          ':sk': `${city.PK}`,
        },
      }
      const result = await dynamodb.query(params).promise()
      trips = trips.concat(result.Items)
    }

    return trips.map((trip) =>({
      id: trip.PK,
      cityId: trip.SK,
      country: trip.country,
      city: trip.city,
      date: trip.date,
      reason: trip.reason
      }
    ));
  }

  return {
    saveCountry,
    saveCity,
    saveTrip,
    getCountry,
    getCity,
    getAllTrips,
    getAllCities,
    getAllCountries,
    getTripsByCountryAndCity,
    getTripsByCountry

  }
}
