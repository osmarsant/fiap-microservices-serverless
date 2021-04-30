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
        cityId = _city.PK;
      }
      const newTrip = await TripRepository.saveTrip({cityId, country, city, date, reason })
      return newTrip;
    },
    getAllTrips: async () => {
        const trips = await TripRepository.getAllTrips();
        return trips;
    },
    getAllCities: async () => {
      const cities = await TripRepository.getAllCities();
        return cities;
    },
    getAllCountries: async () => {
      const countries = await TripRepository.getAllCountries();
        return countries;
    },
    getTripsByCountryAndCity: async (countryId, cityId) => {
      const trips = await TripRepository.getTripsByCountryAndCity(countryId, cityId);
      return trips;
    },
    getTripsByCountry: async (countryId) => {
      const trips = await TripRepository.getTripsByCountry(countryId);
      return trips;
    }
  }
}