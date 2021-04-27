'use strict'

module.exports = ({ repositories }) => {
  const { TripRepository } = repositories;
  const TripService = require('./tripService')({TripRepository})
  return {
    TripService
  }
}