'use strict'

module.exports = ({ dynamodb, uuid, config }) => {
  const saveCountry = async (country) => {
    const countryId = `COUNTRY-${uuid()}`
    const params = {
      TableName: config.dynamodb.tableName,
      Item: {
        PK: 'COUNTRY',
        SK: countryId,
        name: country,
        createdAt: new Date().toISOString(),
      }

    }
    const result = await dynamodb.put(params).promise()
    return countryId
  }

  const saveCity = async (countryId, city) => {
    const cityId = `CITY-${uuid()}`
    const params ={
      TableName: config.dynamodb.tableName,
      Item: {
        PK: cityId,
        SK: countryId,
        name: city,
        createdAt: new Date().toISOString(),
      }
    }
    const result = await dynamodb.put(params).promise()
    return cityId
  }

  const saveTrip = async ({ cityId, city, reason, date }) => {
    const params = {
      TableName: config.dynamodb.tableName,
      Item: {
        PK: `TRIP-${uuid()}`,
        SK: `${cityId}`,
        city,
        reason,
        date,
        createdAt: new Date().toISOString(),
      },
    }
    const result = await dynamodb.put(params).promise()
    return `TRIP-${uuid()}`
  }

  const getCountry = async (country) => {
    const params = {
      TableName: config.dynamodb.tableName,
      KeyConditionExpression: '#PK = :pk',
      ExpressionAttributeNames: { '#PK': 'PK', '#name': 'name' },
      FilterExpression: 'contains(#name, :name)',
      ExpressionAttributeValues: {
        ':pk': 'COUNTRY',
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

  const getTrips = async (cityId) => {
    const params = {
      TableName: config.dynamodb.tableName,
      IndexName: 'SK-index',
      KeyConditionExpression: '#SK = :sk',
      ExpressionAttributeNames: { '#SK': 'SK' },
      ExpressionAttributeValues: {
        ':sk': `${cityId}`,
      },
    }
    const result = await dynamodb.query(params).promise()
    return result.Items
  }

  return {
    saveCountry,
    saveCity,
    saveTrip,
    getCountry,
    getCity,
    getTrips,
  }
}
