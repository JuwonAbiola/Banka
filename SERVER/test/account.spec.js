import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();

let token = '';
let user = '';


before(() => {
  it('it should login user', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'gygyi@gmail.com',
        password: 'danjuma',
      })
      .end((err, res) => {
        token = res.body.token;
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('object');
        done();
      });
  });
});

describe('UNIT TESTS FOR Accounts', () => {
  /*
     * Test the /GET route
     */
  describe('/GET REQUEST', () => {
    it('it should GET all accounts', (done) => {
      chai
        .request(server)
        .get('/api/v1/accounts/')
        .set('x-access-token', token)
        .end((err, res) => {
          res.body.should.have
            .property('message')
            .to.equals('All accounts');
          res.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });


    it('it should not get status', (done) => {
      const activestatus = 'dorman';
      chai
        .request(server)

        .get(`/api/v1/accounts/?status=${activestatus}`)
        .set('x-access-token', token)
        .end((err, res) => {
          // console.log(res)
          res.body.should.have
            .property('message')
            .to.equals(`${activestatus} is an invalid status query`);
          res.should.have.property('status').to.equals(400);

          done();
        });
    });
  });

  describe('UNIT TESTS FOR Accounts', () => {
    /*
         * Test the /GET route
         */
    describe('/GET REQUEST', () => {
      it('it should GET all accounts details', (done) => {
        const accounNumber = 8547446461;
        chai
          .request(server)
          .get(`/api/v1/accounts/${accounNumber}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.body.should.have
              .property('message')
              .to.equals('Account Details fetched Successfully');
            res.should.have.property('status').to.equals(200);
            res.body.should.have.property('data').to.be.an('array');
            done();
          });
      });

      it('it should not GET all accounts details', (done) => {
        const accounNumber = 123456789;
        chai
          .request(server)
          .get(`/api/v1/accounts/${accounNumber}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.body.should.have
              .property('message');
            res.should.have.property('status').to.equals(400);
            done();
          });
      });
    });
  });


  describe('UNIT TESTS FOR Accounts', () => {
    /*
         * Test the /GET route
         */
    describe('/GET REQUEST', () => {
      it('it should GET all Transactions details', (done) => {
        const accounNumber = 3028644677;
        chai
          .request(server)
          .get(`/api/v1/accounts/${accounNumber}/transactions`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have
              .property('message')
              .to.equals('Transactions fetched  Successfully');
            res.should.have.property('status').to.equals(200);
            res.body.should.have.property('data').to.be.an('array');
            done();
          });
      });

      it('it should not GET all accounts details', (done) => {
        chai;
        const accounNumber = 123456789;
        chai
          .request(server)
          .get(`/api/v1/accounts/${accounNumber}/transactions`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.body.should.have
              .property('message');
            res.should.have.property('status').to.equals(400);
            done();
          });
      });
    });
  });


  describe('UNIT TESTS FOR Accounts', () => {
    /*
         * Test the /GET route
         */
    describe('/GET REQUEST', () => {
      it('it should GET all Transaction By id', (done) => {
        const userid = 3;
        chai
          .request(server)
          .get(`/api/v1/transactions/${userid}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.body.should.have
              .property('message')
              .to.equals('Transaction Detail fetched Successfully');
            res.should.have.property('status').to.equals(200);
            res.body.should.have.property('data').to.be.an('array');
            done();
          });
      });

      it('it should not GET all accounts details', (done) => {
        chai;
        const userid = 300;
        chai
          .request(server)
          .get(`/api/v1/transactions/${userid}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.body.should.have
              .property('message');
            res.should.have.property('status').to.equals(400);
            done();
          });
      });
    });
  });


  describe('UNIT TESTS TO CREATE BANK ACCOUNT', () => {
    describe('/POST REQUEST', () => {
      it('it should create bank account ', (done) => {
        chai
          .request(server)
          .post('/api/v1/accounts')
          .set('x-access-token', token)
          .send({
            type: 'current',
            opening_balance: 1290,
          })
          .end((err, res) => {
            user = res.body.accountNumber;
            // console.log('must new account create', res.body.accountNumber);
            res.should.have.status(201);
            res.body.should.have.property('status').to.equals(201);
            // res.body.should.have.property('data').to.be.an('object');
            res.body.should.have
              .property('message')
              .to.equals('Account created successfully');

            done();
          });
      });

      it('it should not create empty bank account ', (done) => {
        chai
          .request(server)
          .post('/api/v1/accounts')
          .set('x-access-token', token)
          .send({})
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status').to.equals(400);
            res.body.should.have
              .property('message')
              .to.equals('Please fill all fields');

            done();
          });
      });


      it('it should not create  bank account unauthorised ', (done) => {
        chai
          .request(server)
          .post('/api/v1/accounts')
          .set('x-access-token', 34567)
          .send({
            type: 'current',
            balance: 1290,
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have
              .property('message')
              .to.equals('Failed to authenticate token.');

            done();
          });
      });


      it('it should not create  bank account with wrong parameters ', (done) => {
        chai
          .request(server)
          .post('/api/v1/accounts')
          .set('x-access-token', token)
          .send({
            type: 'current',
            balance: 'fgh',
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status').to.equals(400);

            done();
          });
      });

      it('it should not create bank account ', (done) => {
        chai
          .request(server)
          .post('/api/v1/accounts')
          .set('x-access-token', token)
          .send({
            type: 'current',
            balance: 123,
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status').to.equals(400);
            res.body.should.have
              .property('message');

            done();
          });
      });
    });
  });


  describe('/PATCH REQUEST', () => {
    it('it should patch account ', (done) => {
      const accounNumber = 8547446461;
      chai
        .request(server)
        .patch(`/api/v1/accounts/${accounNumber}`)
        .set('x-access-token', token)
        .send({
          status: 'dormant',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('message');
          res.body.should.have
            .property('message');


          done();
        });
    });

    it('it should not patch unavailabe account ', (done) => {
      const accounNumber = 1234568;
      chai
        .request(server)
        .patch(`/api/v1/accounts/${accounNumber}`)
        .set('x-access-token', token)
        .send({
          status: 'active',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);
          res.body.should.have
            .property('message');

          done();
        });
    });


    it('it should not account unauthorised', (done) => {
      const accounNumber = user;
      chai
        .request(server)
        .patch(`/api/v1/accounts/${accounNumber}`)
        .set('authorization', `Bearer ${3456}`)
        .send({
          status: 'active',
        })
        .end((err, res) => {
          res.should.have.status(403);


          done();
        });
    });
  });

  describe('/DELETE REQUEST', () => {
    it('it should delete account ', (done) => {
      chai
        .request(server)
        .delete(`/api/v1/accounts/${user}`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property('message');


          done();
        });
    });


    it('it should not delete unfound  account ', (done) => {
      const accounNumber = 234567;
      chai
        .request(server)
        .delete(`/api/v1/accounts/${accounNumber}`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property('message');

          done();
        });
    });
  });
});
