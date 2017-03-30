var app = require('./../../../server');
var request = require('supertest');
var config = require('./../../../server/config');
var expect = require('chai').expect;

exports.charts = function(){
  var chart = {
    title: "Test",
    year: 2015
  };
  var newChartId;

  describe('[CHARTS]', function(){
    it('should get all charts', function(done) {
      request(app)
        .get('/api/v1/charts')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('array');
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should fail to get create chart', function(done) {
      request(app)
        .post('/api/v1/charts')
        .send(chart)
        .end(function(err, resp) {
          expect(resp.status).to.be.equal(401);
          done();
        })
    });


  });


  describe('[CHARTS BEHIND LOGIN]', function(){

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

    it('should create 1 chart', function(done) {
      request(app)
        .post('/api/v1/charts')
        .send(chart)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          newChartId = resp.body.nid;
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(chart.title);
          expect(resp.body.year).to.equal(chart.year);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should get 1 chart', function(done) {
      request(app)
        .get('/api/v1/charts/'+newChartId)
        .set('Accept', 'application/json')
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(chart.title);
          expect(resp.body.year).to.equal(chart.year);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should update 1 chart', function(done) {
      chart.title = "update";
      request(app)
        .put('/api/v1/charts/'+newChartId)
        .send(chart)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(chart.title);
          expect(resp.body.year).to.equal(chart.year);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should fail to get update chart', function(done) {
      request(app)
        .put('/api/v1/charts/'+newChartId)
        .send(chart)
        .end(function(err, resp) {
          expect(resp.status).to.be.equal(401);
          done();
        })
    });

    it('should fail to delete 1 chart', function(done) {
      request(app)
        .delete('/api/v1/charts/'+newChartId)
        .set('Accept', 'application/json')
        .end(function(err, resp) {
          expect(resp.status).to.equal(401);
          done();
        })
    });

    it('should delete 1 chart', function(done) {
      request(app)
        .delete('/api/v1/charts/'+newChartId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(chart.title);
          expect(resp.body.year).to.equal(chart.year);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should fail to delete 1 chart, because not there', function(done) {
      request(app)
        .delete('/api/v1/charts/'+newChartId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          expect(resp.status).to.equal(404);
          done();
        })
    });

  });
}();
