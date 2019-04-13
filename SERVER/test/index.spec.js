import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();

describe('UNIT TESTS DATA CONTROLLERS', () => {
  describe('/POST REQUEST', () => {
    it('it should POST user sign up', (done) => {
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
          res.body.should.have.property('message').to.equals('Registered successfully');
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data');
          done();
        });
    });
  });


  describe('/POST REQUEST', () => {
    it('it should POST user login', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'juwon@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').to.equals('Logged in successfully');
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data');
          done();
        });
    });
  });
});
