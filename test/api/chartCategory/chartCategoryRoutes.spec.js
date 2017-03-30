var app = require('./../../../server');
var request = require('supertest');
var config = require('./../../../server/config');
var expect = require('chai').expect;

exports.chartCategories = function(){
  var chartCategory = {
    title: "Test de testers"
  };
  var newChartCategoryId;

  describe('[CHARTCATEGORIES]', function(){
    it('should get all chartCategories', function(done) {
      request(app)
        .get('/api/v1/categories')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('array');
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should fail to get create chartCategory', function(done) {
      request(app)
        .post('/api/v1/categories')
        .send(chartCategory)
        .end(function(err, resp) {
          expect(resp.status).to.be.equal(401);
          done();
        })
    });


  });


  describe('[CHARTCATEGORIES BEHIND LOGIN]', function(){

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

    it('should create 1 chartCategory', function(done) {
      request(app)
        .post('/api/v1/categories')
        .send(chartCategory)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          newChartCategoryId = resp.body.nid;
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(chartCategory.title);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should get 1 chartCategory', function(done) {
      request(app)
        .get('/api/v1/categories/'+newChartCategoryId)
        .set('Accept', 'application/json')
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(chartCategory.title);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should update 1 chartCategory', function(done) {
      chartCategory.title = "update";
      request(app)
        .put('/api/v1/categories/'+newChartCategoryId)
        .send(chartCategory)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(chartCategory.title);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should fail to get update chartCategory', function(done) {
      request(app)
        .put('/api/v1/categories/'+newChartCategoryId)
        .send(chartCategory)
        .end(function(err, resp) {
          expect(resp.status).to.be.equal(401);
          done();
        })
    });

    it('should fail to delete 1 chartCategory', function(done) {
      request(app)
        .delete('/api/v1/categories/'+newChartCategoryId)
        .set('Accept', 'application/json')
        .end(function(err, resp) {
          expect(resp.status).to.equal(401);
          done();
        })
    });

    it('should delete 1 chartCategory', function(done) {
      request(app)
        .delete('/api/v1/categories/'+newChartCategoryId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.title).to.equal(chartCategory.title);
          expect(resp.status).to.equal(200);
          done();
        })
    });

    it('should fail to delete 1 chartCategory, because not there', function(done) {
      request(app)
        .delete('/api/v1/categories/'+newChartCategoryId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end(function(err, resp) {
          expect(resp.status).to.equal(404);
          done();
        })
    });

  });
}();
