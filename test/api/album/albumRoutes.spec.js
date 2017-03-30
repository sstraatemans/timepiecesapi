var app = require('./../../../server');
var request = require('supertest');
var config = require('./../../../server/config');
var expect = require('chai').expect;

exports.albums = function(){
  var album = {
    title: "Test"
  };
  var newAlbumId;
  var hits;

  describe('[ALBUMS]', function(){
    it('should get all albums', function(done) {
      request(app)
        .get('/api/v1/albums')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('array');
          expect(resp.status).to.equal(200);
          done();
        })
    });



    it('should fail to get create album', function(done) {
      request(app)
        .post('/api/v1/albums')
        .send(album)
        .end(function(err, resp) {
          expect(resp.status).to.be.equal(401);
          done();
        })
    });


  });


  describe('[ALBUMS BEHIND LOGIN]', function(){

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

    it('should create 1 album', function(done) {
      request(app)
        .post('/api/v1/albums')
        .send(album)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          newAlbumId = resp.body.nid;
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(album.title);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should get 1 album', function(done) {
      request(app)
        .get('/api/v1/albums/'+newAlbumId)
        .set('Accept', 'application/json')
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(album.title);
          expect(resp.status).to.equal(200);
          done();
        })
    });


    it('should update 1 album', function(done) {
      album.title = "update";
      request(app)
        .put('/api/v1/albums/'+newAlbumId)
        .send(album)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(album.title);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should fail to update album', function(done) {
      request(app)
        .put('/api/v1/albums/'+newAlbumId)
        .send(album)
        .end(function(err, resp) {
          expect(resp.status).to.be.equal(401);
          done();
        })
    });

    it('should fail to delete 1 album', function(done) {
      request(app)
        .delete('/api/v1/albums/'+newAlbumId)
        .set('Accept', 'application/json')
        .end(function(err, resp) {
          expect(resp.status).to.equal(401);
          done();
        })
    });

    it('should delete 1 album', function(done) {
      request(app)
        .delete('/api/v1/albums/'+newAlbumId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(album.title);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should fail to delete 1 album, because not there', function(done) {
      request(app)
        .delete('/api/v1/albums/'+newAlbumId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          expect(resp.status).to.equal(404);
          done();
        })
    });

  });
}();
