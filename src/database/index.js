'use strict'

module.exports = ({ AWS, config }) => {
  AWS.config.update({
    region: config.dynamodb.awsRegion
  })

  const dynamodb = new AWS.DynamoDB.DocumentClient(); 

  return { dynamodb }
}