'use strict'

const fs = require('fs')
const path = require('path')
const config = require('./config')
const middy = require('middy')
const utils = require('./utils')({ fs, path })
const { jsonBodyParser } = require('middy/middlewares')
const AWS = require('aws-sdk')
const uuid = require('uuid/v4')


const app = require('./app')({
  fs,
  path,
  utils,
  config,
  AWS,
  middy,
  uuid,
  jsonBodyParser
})

module.exports = app