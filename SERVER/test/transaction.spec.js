// /* eslint-disable prefer-destructuring */
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../index';


// chai.use(chaiHttp);
// chai.should();

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjgsImZpcnN0bmFtZSI6IiAgICAgICAgICAgICAgICAgIGFiaW9sYSIsImxhc3RuYW1lIjoib2x1d2FqdXdvbiIsImVtYWlsIjoiZ3lneUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRoQzBJdkd1RTN4ZG8xT0ZnU2NsM0llL21nTVNjb0pNSlNuWVhzY3dQc1FKT1BnVDRhb2xsMiIsInJlZ2lzdGVyZWRfYXQiOiIyMDE5LTA0LTI2IDEzOjA4OjQ5IiwidHlwZSI6InN0YWZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTU1NjMxNzE4NSwiZXhwIjoxNTU2NDAzNTg1fQ.EDKopMxDhVQbnZVOlLml8FX3oop10ZLAoIdJCiC2YEc';


// before(() => {
//   it('should login user', (done) => {
//     chai
//       .request(server)
//       .post('/api/v1/auth/signin')
//       .send({
//         email: 'gygy@gmail.com',
//         password: 'danjuma',
//       })
//       .end((err, res) => {
//         // console.log(` === > ${res}`);
//         token = res.body.token;
//       });
//     done();
//   });
// });


// describe('/POST REQUEST', () => {
//   it('it should POST user account', (done) => {
//     chai
//       .request(server)
//       .post('/api/v1/accounts')
//       .set('x-access-token', token)
//       .send({
//         type: 'current',
//         opening_balance: 32333,
//       })

//       .end((err, res) => {
//         // console.log(res);
//         res.should.have.status(201);
//         res.body.should.have.property('message').to.equals('Account created successfully');
//         res.body.should.have.property('status').to.equals(201);
//         res.body.should.have.property('data');
//       });
//     done();
//   });

//   it('it should fail POST user account', () => {
//     chai
//       .request(server)
//       .post('/api/v1/accounts')
//       .set('x-access-token', token)
//       .send({
//         type: 'current',
//         opening_balance: 32333,
//       })
//       .end((err, res) => {
//         // console.log(res);

//         res.should.have.status(400);
//         res.body.should.have.property('status').to.equals(400);
//         res.body.should.have.property('error');
//       });
//   });
// });

// describe('/PATCH REQUEST', () => {
//   it('it should PATCH user account', () => {
//     chai
//       .request(server)
//       .patch('/api/v1/accounts/4952853906')
//       .set('x-access-token', token)
//       .send({
//         status: 'dormant',

//       })
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.have.property('message').to.equals('Account Updated');
//         res.body.should.have.property('status').to.equals(200);
//         res.body.should.have.property('data');
//       });
//   });

//   it('it should fail PATCH user account', () => {
//     chai
//       .request(server)
//       .patch('/api/v1/accounts/7767637187')
//       .set('x-access-token', token)
//       .send({
//         status: 'dormant',
//       })
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.should.have.property('status').to.equals(404);
//         res.body.should.have.property('error').to.equals('Account not found');
//       });
//   });

//   it('it should fail PATCH user account', (done) => {
//     chai
//       .request(server)
//       .patch('/api/v1/accounts/7767637187')
//       .set('x-access-token', token)
//       .send({})
//       .end((err, res) => {
//         // console.log(res);
//         res.should.have.status(400);
//         res.body.should.have.property('message').to.equals('Please fill all fields');
//         res.body.should.have.property('status').to.equals(400);
//       });
//     done();
//   });
// });
