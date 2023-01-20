const server = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chance = require('chance').Chance();
chai.should();
chai.use(chaiHttp);

const TestData = require('../template/contants/test-data').getTestData();




describe('Member tests', () => {
    let payload;
    let _id;
    describe('Member', () => {
        it("It should create new Member", (done) => {
            payload = {
                institute_id: TestData.institute_id,
                first_name: chance.first(),
                last_name: chance.last(),
                address: chance.address(),
                phone: chance.phone(),
                email: chance.email()
            }
            chai.request(server.getServer())
                .post('/members')
                .send(payload)
                .end((err, response) => {
                    response.should.have.status(201);
                    const data = response.body.data;
                    data.institute_id.should.be.eq(payload.institute_id);
                    data.first_name.should.be.eq(payload.first_name);
                    data.last_name.should.be.eq(payload.last_name);
                    data.address.should.be.eq(payload.address);
                    data.phone.should.be.eq(payload.phone);
                    data.email.should.be.eq(payload.email);
                    _id = data._id;
                    done();
                })
        });

        it("It should get Member", (done) => {
            chai.request(server.getServer())
                .get('/members/' + _id)
                .end((err, response) => {
                    response.should.have.status(200);
                    const data = response.body.data;
                    data.institute_id.should.be.eq(payload.institute_id);
                    data.first_name.should.be.eq(payload.first_name);
                    data.last_name.should.be.eq(payload.last_name);
                    data.address.should.be.eq(payload.address);
                    data.phone.should.be.eq(payload.phone);
                    data.email.should.be.eq(payload.email);
                    _id = data._id;
                    done();
                })
        });

        it("It should update Member", (done) => {
            payload = {
                first_name: chance.first(),
                last_name: chance.last(),
                address: chance.address(),
                phone: chance.phone()
            }
            chai.request(server.getServer())
                .patch('/members/' + _id)
                .send(payload)
                .end((err, response) => {
                    response.should.have.status(200);
                    const data = response.body.data;
                    data.first_name.should.be.eq(payload.first_name);
                    data.last_name.should.be.eq(payload.last_name);
                    data.address.should.be.eq(payload.address);
                    data.phone.should.be.eq(payload.phone);
                    _id = data._id;
                    done();
                })
        });

    });
});