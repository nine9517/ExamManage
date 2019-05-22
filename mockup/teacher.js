const faker = require('faker/locale/en');
const bcrypt = require('bcryptjs');

module.exports = async()=> {
    const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(faker.internet.password(), salt);
    return Promise.resolve({
        teacher_id :Number.ran(1,999).pad(3),
        firstname :faker.name.firstName(),
        lastname :faker.name.lastName(),
        email : faker.internet.email(),
        password: passwordHash
    })

}