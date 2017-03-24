var app = require('./../../server');
var config = require('./../../server/config');
var request = require('supertest');
var expect = require('chai').expect;

exports.artists = function(){
  describe('[AUTH]', function(){
    var resp;


    it('should get a JWT token', function(done) {
      request(app)
        .post('/auth')
        .send({"username":config.testuser.username, "password":config.testuser.password})
        .set('Accept', 'application/json')
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.status).to.equal(200);
          expect(resp.body.token).to.be.an('string');
          done();
        });
    });
  });
}();
