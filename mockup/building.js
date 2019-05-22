const faker = require('faker/locale/en');

module.exports = ()=> {
    return {

        building_id: (Math.random() * (100 - 1) + 1).pad(3),
        building_name: faker.address.countryCode(),
    
    }
    
}