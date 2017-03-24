var app = require('./../../../server');
var request = require('supertest');
var expect = require('chai').expect;

exports.artists = function(){
  describe('[ARTISTS]', function(){
    it('should get all artists', function(done) {
      request(app)
        .get('/api/v1/artists')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('array');
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should get 1 artist', function(done) {
      request(app)
        .get('/api/v1/artists/58d3ce6cf36d284fca6d3332')
        .set('Accept', 'application/json')
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal("Paul Simon");
          expect(resp.status).to.equal(200);
          done();
        })
    });
  });
}();
