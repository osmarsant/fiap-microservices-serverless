'use strict'

module.exports = () => {
  const createParams = ({table, pk, sk, content, createdAt}) => {
    return {
      TableName: table,
      Item: {
        PK: pk,
        SK: sk,
        ...content,
        CreatedAt: createdAt,
      },
    }
  }

  const createParamsPK = (table, id) => {
    return {
      TableName: table,
      KeyConditionExpression: '#PK = :pk',
      ExpressionAttributeNames: { '#PK': 'PK' },
      ExpressionAttributeValues: { ':pk': id },
    }
  }

  const createParamsSK = (table, index, id) => {
    return {
      TableName: table,
      IndexName: index,
      KeyConditionExpression: '#SK = :sk',
      ExpressionAttributeNames: { '#SK': 'SK' },
      ExpressionAttributeValues: { ':sk': id },
    }
  }

  const createParamsPKandSK = (table, idPK, idSK) => {
    return {
      TableName: table,
      KeyConditionExpression: '#PK = :pk and #SK = :sk',
      ExpressionAttributeNames: { '#PK': 'PK', '#SK': 'SK' },
      ExpressionAttributeValues: { ':pk': idPK, ':sk': idSK },
    }
  }

  const createParamsPKbeginSK = (table, idPK, idSK) => {
    return {
      TableName: table,
      KeyConditionExpression: '#PK = :pk and begins_with(#SK, :sk) ',
      ExpressionAttributeNames: { '#PK': 'PK', '#SK': 'SK' },
      ExpressionAttributeValues: { ':pk': idPK, ':sk': idSK },
    }
  }

  const createParamsDelPKandSK = (table, idPK, idSK) => {
    return {
      TableName: table,
      Key: { PK: idPK, SK: idSK },
      ConditionExpression: 'PK = :pk and SK = :sk',
      ExpressionAttributeValues: { ':pk': idPK, ':sk': idSK },
    }
  }

  const createParamsContainsPKandSK = (table, index, idPK, idSK) => {
    return {
      TableName: table,
      IndexName: index,
      KeyConditionExpression: '#Type = :CATALOG',
      FilterExpression: 'contains(#PK, :pk) and contains(#SK, :sk)',
      ExpressionAttributeNames: { '#Type': 'Type', '#PK': 'PK', '#SK': 'SK' },
      ExpressionAttributeValues: {
        ':CATALOG': 'catalog',
        ':pk': idPK,
        ':sk': idSK,
      },
    }
  }

  return {
    createParams,
    createParamsPK,
    createParamsSK,
    createParamsPKandSK,
    createParamsPKbeginSK,
    createParamsDelPKandSK,
    createParamsContainsPKandSK,
  }
}
