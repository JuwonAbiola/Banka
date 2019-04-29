import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();


let token = '';


before(() => {
  it('it should login user', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'gygyijj@gmail.com',
        password: 'danjuma',
      })
      .end((err, res) => {
        token = res.body.data.token;
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('object');
        done();
      });
  });
});

describe('UNIT TESTS FOR DUMMY TRANSACTION CONTROLLERS', () => {
  /*
     * Test the /GET route
     */
  // describe('/GET REQUEST', () => {
  //     it('it should GET all transactions', (done) => {
  //         chai
  //             .request(server)
  //             .get('/api/v1/transactions/')
  //             .end((err, res) => {
  //                 res.body.should.have
  //                     .property('message')
  //                     .to.equals('Successfully fetched all Transactions');
  //                 res.body.should.have.property('status').to.equals(200);
  //                 res.body.should.have.property('data').to.be.an('array');
  //                 done();
  //             });
  //     });
  // });

  describe('/POST REQUEST', () => {
    it('it should credit an account ', (done) => {
      const accountNumber = 5865098282;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('x-access-token', token)
        .send({
          amount: 33200,
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });


    it('it should reject unavailable acccount ', (done) => {
      const accountNumber = 1222233333344;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('x-access-token', token)
        .send({
          amount: 200,
        })
        .end((err, res) => {
          res.should.have.status(400);


          done();
        });
    });
  });


  describe('/POST REQUEST', () => {
    it('it should debit an account ', (done) => {
      const accountNumber = 5865098282;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('x-access-token', token)
        .send({
          amount: 31,
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });


    it('it should reject unavailable acccount ', (done) => {
      const accountNumber = 11112222222;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('x-access-token', token)
        .send({
          amount: 200,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('it should check for empty amount ', (done) => {
      const accountNumber = 1200777775;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
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


    it('it should check for empty amount ', (done) => {
      const accountNumber = 1200777775;
      chai
        .request(server)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('x-access-token', token)
        .send({
          amount: -200,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);

          done();
        });
    });
  });
});
