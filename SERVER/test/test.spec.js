/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import queryProivider from '../models/userQuery';


chai.use(chaiHttp);
chai.should();

let token = '';

before(() => {
    const email = 'tester@gmail.com';
    return queryProivider.deleteUserByEmailQuery(email).then((res) => {}).catch(() => {});
});

describe('UNIT TESTS FOR AUTHENTICATION CONTROLLER', () => {
    describe('/POST REQUEST', () => {
        it('it should make a post request if all fields are not empty ', (done) => {
            chai
                .request(server)
                .post('/api/v1/auth/signup')
                .send({
                    lastname: 'Test',
                    firstname: 'Tester',
                    email: 'tester@gmail.com',
                    password: 'testerr',
                    type: 'client',
                    is_admin: 'true',
                })
                .end((err, res) => {
                    res.body.should.have
                        .property('message')
                        .to.equals('Registration successful');
                    res.body.should.have.property('status').to.equals(201);
                    res.body.should.have.property('token').to.be.a('string');
                    done();
                });
        });
        it('it login user ', (done) => {
            chai
                .request(server)
                .post('/api/v1/auth/signin')
                .send({
                    email: 'tester@gmail.com',
                    password: 'testerr',
                })
                .end((err, res) => {
                    res.body.should.have
                        .property('message')
                        .to.equals('lOGIN Successful');
                    token = res.body.token;
                    res.body.should.have.property('status').to.equals(200);
                    res.body.should.have.property('data').to.be.an('object');
                    res.body.should.have.property('token').to.be.a('string');
                    done();
                });
        });
        it('it should not make a post request if some fields are empty ', (done) => {
            const body = {
                lastname: '',
                othername: 'Tester',
                firstname: 'Tester',
                email: 'tester@gmail.com',
                password: 'test',
            };

            chai
                .request(server)
                .post('/api/v1/auth/signup')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.deep.equal({
                        status: 400,
                        message: 'please enter a valid Last name not less than 3 letters',
                    });
                    done();
                });
        });
        it('it should not make a post request if a field is not added ', (done) => {
            const body = {
                othername: 'Tester',
                firstname: 'Tester',
                email: 'tester@gmail.com',
                password: 'test',
            };

            chai
                .request(server)
                .post('/api/v1/auth/signup')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.deep.equal({
                        status: 400,
                        message: 'please enter a valid Last name not less than 3 letters',
                    });
                    done();
                });
        });
        it('it should throw an error when you try to add duplicate data ', (done) => {
            const data = {
                lastname: 'Test',
                firstname: 'Tester',
                email: 'tester@gmail.com',
                password: 'testerr',
                type: 'client',
                is_admin: 'true',
            };

            chai
                .request(server)
                .post('/api/v1/auth/signup')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.deep.equal({
                        status: 400,
                        message: 'User with this email tester@gmail.com exists already',
                    });
                    done();
                });
        });
        it('it should POST user account', (done) => {
            chai
                .request(server)
                .post('/api/v1/accounts')
                .set('x-access-token', token)
                .send({
                    type: 'current',
                    opening_balance: 32333,
                })

            .end((err, res) => {
                // console.log(res);
                res.should.have.status(201);
                res.body.should.have.property('message').to.equals('Account created successfully');
                res.body.should.have.property('status').to.equals(201);
                res.body.should.have.property('data');
            });
            done();
        });
    });

    describe('/POST REQUEST', () => {
        it('it should fail POST user account', () => {
            chai
                .request(server)
                .post('/api/v1/accounts')
                .set('x-access-token', token)
                .send({
                    type: 'current',
                    opening_balance: 32333,
                })
                .end((err, res) => {
                    // console.log(res);

                    res.should.have.status(400);
                    res.body.should.have.property('status').to.equals(400);
                    res.body.should.have.property('error');
                });
        });
    });

    describe('/PATCH REQUEST', () => {
        it('it should PATCH user account', () => {
            chai
                .request(server)
                .patch('/api/v1/accounts/4952853906')
                .set('x-access-token', token)
                .send({
                    status: 'dormant',

                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').to.equals('Account Updated');
                    res.body.should.have.property('status').to.equals(200);
                    res.body.should.have.property('data');
                });
        });

        it('it should fail PATCH user account', () => {
            chai
                .request(server)
                .patch('/api/v1/accounts/3197694535')
                .set('x-access-token', token)
                .send({
                    status: 'dormant',
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('status').to.equals(404);
                    res.body.should.have.property('error').to.equals('Account not found');
                });
        });

        it('it should fail PATCH user account', (done) => {
            chai
                .request(server)
                .patch('/api/v1/accounts/7767637187')
                .set('x-access-token', token)
                .send({})
                .end((err, res) => {
                    // console.log(res);
                    res.should.have.status(400);
                    res.body.should.have.property('message').to.equals('Please fill all fields');
                    res.body.should.have.property('status').to.equals(400);
                });
            done();
        });
    });

    describe('/POST REQUEST', () => {
        it('it should credit an account 1', () => {
            chai
                .request(server)

            .post('/api/v1/accounts/4952853906/credit')
                .set('x-access-token', token)

            .send({
                    amount: 33200,
                })
                .end((err, res) => {
                    console.log(res);
                    res.should.have.status(200);
                    res.body.should.have.property('status').to.equals(200);
                    // res.body.should.have.property('data').to.be.an('object');
                });
        });


        it('it should fail to credit an account2', () => {
            chai
                .request(server)

            .post('/api/v1/accounts/495285339306/credit')
                .set('x-access-token', token)
                .send({
                    amount: 33200,
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('status').to.equals(400);
                    res.body.should.have.property('error').to.equals('Account not found');
                });
        });

        it('it should fail to credit an account3', () => {
            chai
                .request(server)
                .post('/api/v1/accounts/495285339306/credit')
                .set('x-access-token', token)
                .send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('message').to.equals('Please fill all fields');
                    res.body.should.have.property('status').to.equals(400);
                });
        });

        it('it should fail to credit an account4', () => {
            chai
                .request(server)
                .post('/api/v1/accounts/495285339306/credit')
                .set('x-access-token', token)
                .send({
                    amount: 222,
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                });
        });
    });

    describe('/POST REQUEST', () => {
        it('it should debit an account ', () => {
            chai
                .request(server)

            .post('/api/v1/accounts/3108008131/debit')
                .set('x-access-token', token)
                .send({
                    amount: 33200,
                })
                .end((err, res) => {
                    // console.log(res);
                    res.should.have.status(200);
                    res.body.should.have.property('status').to.equals(200);
                    res.body.should.have.property('data').to.be.an('object');
                });
        });

        it('it should fail to debit an account ', () => {
            chai
                .request(server)

            .post('/api/v1/accounts/495285339306/debit')
                .set('x-access-token', token)
                .send({
                    amount: 3200,
                })
                .end((err, res) => {
                    // console.log(res);
                    res.should.have.status(404);
                    res.body.should.have.property('status').to.equals(404);
                    res.body.should.have.property('error').to.equals('Account not found');
                });
        });

        it('it should return issufficient balance ', () => {
            chai
                .request(server)

            .post('/api/v1/accounts/4952853906/debit')
                .set('x-access-token', token)
                .send({
                    amount: 332002920,
                })
                .end((err, res) => {
                    // console.log(res);
                    res.should.have.status(400);
                    res.body.should.have.property('status').to.equals(400);
                    res.body.should.have.property('error').to.equals('Insuficient balance');
                });
        });

        it('it should fail to debit an account', () => {
            chai
                .request(server)
                .post('/api/v1/accounts/495285339306/debit')
                .set('x-access-token', token)
                .send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('message').to.equals('Please fill all fields');
                    res.body.should.have.property('status').to.equals(400);
                });
        });

        it('it should fail to debit an account', () => {
            chai
                .request(server)
                .post('/api/v1/accounts/495285339306/debit')
                .set('x-access-token', token)
                .send({
                    cashier: '',
                    amount: 222,
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                });
        });
    });

    describe('/GET REQUEST', () => {
        it('it should get accounts ', () => {
            chai.request(server)
                .get('/api/v1/accounts')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').to.equals(200);
                    res.body.should.have.property('message').to.equals('List of accounts');
                    res.body.should.have.property('data').to.be.an('array');
                });
        });

        it('it should get accounts ', () => {
            chai.request(server)
                .get('/api/v1/accounts/4952853906')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').to.equals(200);
                    res.body.should.have.property('data').to.be.an('object');
                });
        });

        it('it should get accounts ', () => {
            chai.request(server)
                .get('/api/v1/accounts/4952853786')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('status').to.equals(404);
                    res.body.should.have.property('error').to.equals('Account not found');
                });
        });
    });

    describe('DELETE REQUEST', () => {
        it('it should DELETE account', () => {
            chai.request(server)
                .delete('/api/v1/accounts/4952853906')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').to.equals('Account deleted');
                    res.body.should.have.property('status').to.equals(200);
                });
        });

        it('it should return error', () => {
            chai.request(server)
                .delete('/api/v1/accounts/2345566767')
                .set('x-access-token', token)

            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('error').to.equals('Account not found');
                res.body.should.have.property('status').to.equals(404);
            });
        });
    });
});