var app = require('./../../../server');
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
  });
}();
