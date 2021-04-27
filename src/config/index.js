'use strict'

const {
AWS_REGION,
TABLE_NAME
} = process.env

module.exports = {
  dynamodb: {
   tableName: TABLE_NAME,
   awsRegion: AWS_REGION
  },
}