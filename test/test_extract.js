

var gjtk = require('../gjtk');
var assert = require('assert');


describe('gjtk.extract', function () {

  describe('positionsOf', function () {
    it('should return valid positions when provided a valid Point', function () {
      gjtk.extract.positionsOf(gjtk.random.Point()).every(
        function ( Position ) {
          assert(gjtk.validate.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid MultiPoint', function () {
      gjtk.extract.positionsOf(gjtk.random.MultiPoint()).every(
        function ( Position ) {
          assert(gjtk.validate.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid LineString', function () {
      gjtk.extract.positionsOf(gjtk.random.LineString()).every(
        function ( Position ) {
          assert(gjtk.validate.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid MultiLineString', function () {
      gjtk.extract.positionsOf(gjtk.random.MultiLineString()).every(
        function ( Position ) {
          assert(gjtk.validate.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid Polygon', function () {
      gjtk.extract.positionsOf(gjtk.random.Polygon()).every(
        function ( Position ) {
          assert(gjtk.validate.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid MultiPolygon', function () {
      gjtk.extract.positionsOf(gjtk.random.MultiPolygon()).every(
        function ( Position ) {
          assert(gjtk.validate.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid GeometryCollection', function () {
      gjtk.extract.positionsOf(gjtk.random.GeometryCollection()).every(
        function ( Position ) {
          assert(gjtk.validate.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid Feature', function () {
      gjtk.extract.positionsOf(gjtk.random.Feature()).every(
        function ( Position ) {
          assert(gjtk.validate.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid FeatureCollection', function () {
      gjtk.extract.positionsOf(gjtk.random.FeatureCollection()).every(
        function ( Position ) {
          assert(gjtk.validate.isPosition(Position));
        }
      );
    });
  });

  describe('featuresOf', function () {
    it('should return valid features when provided a valid Feature', function () {
      gjtk.extract.featuresOf(gjtk.random.Feature()).every(
        function ( Feature ) {
          assert(gjtk.validate.isFeature(Feature));
        }
      );
    });
    it('should return valid features when provided a valid FeatureCollection', function () {
      gjtk.extract.featuresOf(gjtk.random.FeatureCollection()).every(
        function ( Feature ) {
          assert(gjtk.validate.isFeature(Feature));
        }
      );
    });
  });

  describe('geometriesOf', function () {
    it('should return valid geometries when provided a valid Point', function () {
      gjtk.extract.geometriesOf(gjtk.random.Point()).every(
        function ( Geometry ) {
          assert(gjtk.validate.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid MultiPoint', function () {
      gjtk.extract.geometriesOf(gjtk.random.MultiPoint()).every(
        function ( Geometry ) {
          assert(gjtk.validate.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid LineString', function () {
      gjtk.extract.geometriesOf(gjtk.random.LineString()).every(
        function ( Geometry ) {
          assert(gjtk.validate.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid MultiLineString', function () {
      gjtk.extract.geometriesOf(gjtk.random.MultiLineString()).every(
        function ( Geometry ) {
          assert(gjtk.validate.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid Polygon', function () {
      gjtk.extract.geometriesOf(gjtk.random.Polygon()).every(
        function ( Geometry ) {
          assert(gjtk.validate.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid MultiPolygon', function () {
      gjtk.extract.geometriesOf(gjtk.random.MultiPolygon()).every(
        function ( Geometry ) {
          assert(gjtk.validate.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid GeometryCollection', function () {
      gjtk.extract.geometriesOf(gjtk.random.GeometryCollection()).every(
        function ( Geometry ) {
          assert(gjtk.validate.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid Feature', function () {
      gjtk.extract.geometriesOf(gjtk.random.Feature()).every(
        function ( Geometry ) {
          assert(gjtk.validate.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid FeatureCollection', function () {
      gjtk.extract.geometriesOf(gjtk.random.FeatureCollection()).every(
        function ( Geometry ) {
          assert(gjtk.validate.isGeometry(Geometry));
        }
      );
    });
  });

});
