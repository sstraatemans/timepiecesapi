var app = require('./../../../server');
var config = require('./../../../server/config');
var request = require('supertest');
var expect = require('chai').expect;

exports.artists = function(){
  describe('[USERS]', function(){
    it('should get all users', function(done) {
      request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('array');
          done();
        })
    });

    it('should fail to get profile of me', function(done) {
      request(app)
        .get('/api/v1/users/me')
        .end(function(err, resp) {
          expect(resp.status).not.to.be.equal(200);
          done();
        })
    });

    describe('[USERS BEHIND LOGIN]', function(){
      //get the token
      var token;
      before(function(done){
        request(app)
          .post('/auth')
          .send({"username":config.testuser.username, "password":config.testuser.password})
          .set('Accept', 'application/json')
          .end(function(err, resp) {
            token = resp.body.token;
            done();
          })
      });

      it('should send back to info of logged in user', function(done) {
        request(app)
          .get('/api/v1/users/me')
          .set('Authorization', 'Bearer ' + token)
          .end(function(err, resp) {
            expect(resp.status).to.be.equal(200);
            expect(resp.body.username).to.be.equal(config.testuser.username);
            done();
          })
      });
    });
  });


}();
