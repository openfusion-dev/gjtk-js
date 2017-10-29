

var gjtk = require('../gjtk');
var assert = require('assert');


describe('gjtk.generate', function () {

  describe('Point', function () {
    it('should return a valid Point object when provided a valid Position', function () {
      assert(gjtk.validate.isPoint(gjtk.generate.Point(gjtk.random.Position())));
    });
  });

  describe('Feature', function () {
    it('should return a valid Feature object when provided a valid Geometry', function () {
      assert(gjtk.validate.isFeature(gjtk.generate.Feature(gjtk.random.Geometry(), {'foo': 'bar'})));
    });
    it('should return a valid Feature object even when provided invalid properties', function () {
      assert(gjtk.validate.isFeature(gjtk.generate.Feature(gjtk.random.Geometry(), 'invalid')));
    });
  });

  describe('FeatureCollection', function () {
    it('should return a valid FeatureCollection object when provided nothing', function () {
      assert(gjtk.validate.isFeatureCollection(gjtk.generate.FeatureCollection()));
    });
    it('should return a valid FeatureCollection object when provided valid Features', function () {
      assert(gjtk.validate.isFeatureCollection(gjtk.generate.FeatureCollection([gjtk.random.Feature(), gjtk.random.Feature()])));
    });
  });

  describe('GeometryCollection', function () {
    it('should return a valid GeometryCollection object when provided nothing', function () {
      assert(gjtk.validate.isGeometryCollection(gjtk.generate.GeometryCollection()));
    });
    it('should return a valid GeometryCollection object when provided valid Geometries', function () {
      assert(gjtk.validate.isGeometryCollection(gjtk.generate.GeometryCollection([gjtk.random.Geometry(), gjtk.random.Geometry()])));
    });
  });

});
