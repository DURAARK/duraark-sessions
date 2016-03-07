var request = require('supertest'),
  assert = require('chai').assert;

describe('The public Sessions endpoint', function() {
  request = request.bind(request, 'http://mimas.cgv.tugraz.at/api/v0.7/sessions');


  describe('GET /sessions', function() {
    it('should return an array', function(done) {
      request(sails.hooks.http.app)
        .get('/sessions')
        .expect(200, done);
    });
  });
});
