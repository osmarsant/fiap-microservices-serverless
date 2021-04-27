'use strict';

module.exports = ({ TripRepository }) => {


  return {
    saveTrip: async ({ country, city, date, reason }) => {
      let countryId, cityId;
      let _country = await TripRepository.getCountry(country);
      if (!_country) {
          countryId = await TripRepository.saveCountry(country)
      } else {
        countryId = _country.SK;
      }
      let _city = await TripRepository.getCity(countryId, city);
      if (!_city) {
        cityId = await TripRepository.saveCity(countryId, city)

      } else {
        cityId = _city.SK;
      }
      const newTrip = await TripRepository.saveTrip({cityId, city, date, reason })
      return newTrip;
    }
  }
}