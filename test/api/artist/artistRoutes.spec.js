var app = require('./../../../server');
var request = require('supertest');
var config = require('./../../../server/config');
var expect = require('chai').expect;

exports.artists = function(){
  var artist = {
    title: "Test de testers",
    name: {
      lastName: "testers"
    }
  };
  var newArtistId;

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



    it('should fail to get create artist', function(done) {
      request(app)
        .post('/api/v1/artists')
        .send(artist)
        .end(function(err, resp) {
          expect(resp.status).to.be.equal(401);
          done();
        })
    });


  });


  describe('[ARTISTS BEHIND LOGIN]', function(){

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

    it('should create 1 artist', function(done) {
      request(app)
        .post('/api/v1/artists')
        .send(artist)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          newArtistId = resp.body._id;
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(artist.title);
          expect(resp.body.name.lastName).to.equal(artist.name.lastName);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should get 1 artist', function(done) {
      request(app)
        .get('/api/v1/artists/'+newArtistId)
        .set('Accept', 'application/json')
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(artist.title);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should update 1 artist', function(done) {
      artist.title = "update";
      request(app)
        .put('/api/v1/artists/'+newArtistId)
        .send(artist)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(artist.title);
          expect(resp.body.name.lastName).to.equal(artist.name.lastName);
          expect(resp.status).to.equal(200);
          done();
        })
    });


    it('should fail to itself as a relatedArtist', function(done){
      asdasd
    });

    it('should add a relatedArtist and itself as relatedArtist in the other', function(done){
      sdsdf
    });

    it('should fail to get update artist', function(done) {
      request(app)
        .put('/api/v1/artists/'+newArtistId)
        .send(artist)
        .end(function(err, resp) {
          expect(resp.status).to.be.equal(401);
          done();
        })
    });

    it('should fail to delete 1 artist', function(done) {
      request(app)
        .delete('/api/v1/artists/'+newArtistId)
        .set('Accept', 'application/json')
        .end(function(err, resp) {
          expect(resp.status).to.equal(401);
          done();
        })
    });

    it('should delete 1 artist', function(done) {
      request(app)
        .delete('/api/v1/artists/'+newArtistId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(artist.title);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should fail to delete 1 artist, because not there', function(done) {
      request(app)
        .delete('/api/v1/artists/'+newArtistId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          expect(resp.status).to.equal(404);
          done();
        })
    });

  });
}();
