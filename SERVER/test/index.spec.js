import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();

describe('UNIT TESTS DATA CONTROLLERS', () => {
  describe('/POST REQUEST', () => {
    it('it should POST user sign up', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'juwon',
          lastName: 'jhay',
          email: 'juwon@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').to.equals('Registration successful');
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data');
        });
    });

    it('it should fail POST user sign up', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'juwon',
          lastName: 'jhay',
          email: 'juwon@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error').to.equals('User already exist');
          res.body.should.have.property('status').to.equals(400);
        });
    });
  });

  describe('/POST REQUEST', () => {
    it('it should POST user login', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'juwon@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').to.equals('Login successful');
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data');
        });
    });

    it('it should fail POST user login', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'blabla@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error').to.equals('Incorrect email');
          res.body.should.have.property('status').to.equals(400);
        });
    });
  });

  describe('/POST REQUEST', () => {
    it('it should POST user account', () => {
      chai
        .request(server)
        .post('/api/v1/accounts')
        .send({
          email: 'juwon@gmail.com',
          type: 'current',
          openingBalance: 32333,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').to.equals('Account created');
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data');
        });
    });

    it('it should fail POST user account', () => {
      chai
        .request(server)
        .post('/api/v1/accounts')
        .send({
          email: 'juwonfew@gmail.com',
          type: 'current',
          openingBalance: 32333,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);
          res.body.should.have.property('error').to.equals('sign up before creating account');
        });
    });
  });

  describe('/PATCH REQUEST', () => {
    it('it should PATCH user account', () => {
      chai
        .request(server)
        .patch('/api/v1/accounts/4952853906')
        .send({
          status: 'dormant',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').to.equals('Account updated');
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data');
        });
    });

    it('it should fail PATCH user account', () => {
      chai
        .request(server)
        .patch('/api/v1/accounts/7767637187')
        .send({
          status: 'dormant',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').to.equals(404);
          res.body.should.have.property('error').to.equals('Account with the given account number is not found');
        });
    });
  });

  describe('DELETE REQUEST', () => {
    it('it should DELETE account', () => {
      chai.request(server)
        .delete('/api/v1/accounts/7767637188')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').to.equals('Account successfulluy deleted');
          res.body.should.have.property('status').to.equals(200);
        });
    });

    it('it should return error', () => {
      chai.request(server)
        .delete('/api/v1/accounts/2345566767')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').to.equals('Account with the given account number is not found');
          res.body.should.have.property('status').to.equals(404);
        });
    });
  });
});
