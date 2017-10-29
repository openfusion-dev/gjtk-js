var gjtk = require('../gjtk');
var assert = require('assert');


describe('gjtk', function () {

  // Validation Methods

  describe('isGeoJSON', function () {
    it('should return true when provided a valid Geometry object', function () {
      assert(gjtk.isGeoJSON(gjtk.random.Geometry()));
    });
    it('should return true when provided a valid Feature object', function () {
      assert(gjtk.isGeoJSON(gjtk.random.Feature()));
    });
    it('should return true when provided a valid FeatureCollection object', function () {
      assert(gjtk.isGeoJSON(gjtk.random.FeatureCollection()));
    });
  });

  describe('isGeometry', function () {
    it('should return true when provided a valid Point object', function () {
      assert(gjtk.isGeometry(gjtk.random.Point()));
    });
    it('should return true when provided a valid MultiPoint object', function () {
      assert(gjtk.isGeometry(gjtk.random.MultiPoint()));
    });
    it('should return true when provided a valid LineString object', function () {
      assert(gjtk.isGeometry(gjtk.random.LineString()));
    });
    it('should return true when provided a valid MultiLineString object', function () {
      assert(gjtk.isGeometry(gjtk.random.MultiLineString()));
    });
    it('should return true when provided a valid Polygon object', function () {
      assert(gjtk.isGeometry(gjtk.random.Polygon()));
    });
    it('should return true when provided a valid MultiPolygon object', function () {
      assert(gjtk.isGeometry(gjtk.random.MultiPolygon()));
    });
    it('should return true when provided a valid GeometryCollection object', function () {
      assert(gjtk.isGeometry(gjtk.random.GeometryCollection()));
    });
  });

  describe('isPosition', function () {
    it('should return true when provided an array of at least 2 numbers', function () {
      assert(gjtk.isPosition(gjtk.random.Position()));
    });
    it('should return false when provided an array of less than 2 numbers', function () {
      assert(!gjtk.isPosition([1]));
    });
    it('should return false when provided an array of less than 2 non-numbers', function () {
      assert(!gjtk.isPosition(['a']));
    });
    it('should return false when provided an array of at least 2 non-numbers', function () {
      assert(!gjtk.isPosition(['foo', 'bar']));
    });
    it('should return false when provided an array of a mix of at least 2 numbers and non-numbers', function () {
      assert(!gjtk.isPosition([1, 'a']));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isPosition());
    });
  });

  describe('isPointCoordinates', function () {
    it('should return true when provided valid GeoJSON Point coordinates', function () {
      assert(gjtk.isPointCoordinates(gjtk.random.PointCoordinates()));
    });
  });

  describe('isMultiPointCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiPoint coordinates', function () {
      assert(gjtk.isMultiPointCoordinates(gjtk.random.MultiPointCoordinates()));
    });
  });

  describe('isLineStringCoordinates', function () {
    it('should return true when provided valid GeoJSON LineString coordinates', function () {
      assert(gjtk.isLineStringCoordinates(gjtk.random.LineStringCoordinates()));
    });
  });

  describe('isLinearRingCoordinates', function () {
    it('should return true when provided a valid GeoJSON LinearRing', function () {
      assert(gjtk.isLinearRingCoordinates(gjtk.random.LinearRingCoordinates()));
    });
  });

  describe('isMultiLineStringCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiLineString coordinates', function () {
      assert(gjtk.isMultiLineStringCoordinates(gjtk.random.MultiLineStringCoordinates()));
    });
  });

  describe('isPolygonCoordinates', function () {
    it('should return true when provided valid GeoJSON Polygon coordinates', function () {
      assert(gjtk.isPolygonCoordinates(gjtk.random.PolygonCoordinates()));
    });
  });

  describe('isMultiPolygonCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiPolygon coordinates', function () {
      assert(gjtk.isMultiPolygonCoordinates(gjtk.random.MultiPolygonCoordinates()));
    });
  });

  describe('isPoint', function () {
    it('should return true when provided a valid Point object', function () {
      assert(gjtk.isPoint(gjtk.random.Point()));
    });
    it('should return false when provided a Point object without a type', function () {
      var Point = gjtk.random.Point();
      delete Point.type;
      assert(!gjtk.isPoint(Point));
    });
    it('should return false when provided a Point object without coordinates', function () {
      var Point = gjtk.random.Point();
      delete Point.coordinates;
      assert(!gjtk.isPoint(Point));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isPoint());
    });
  });

  describe('isMultiPoint', function () {
    it('should return true when provided a valid MultiPoint object', function () {
      assert(gjtk.isMultiPoint(gjtk.random.MultiPoint()));
    });
    it('should return false when provided a MultiPoint object without a type', function () {
      var MultiPoint = gjtk.random.MultiPoint();
      delete MultiPoint.type;
      assert(!gjtk.isMultiPoint(MultiPoint));
    });
    it('should return false when provided a MultiPoint object without coordinates', function () {
      var MultiPoint = gjtk.random.MultiPoint();
      delete MultiPoint.coordinates;
      assert(!gjtk.isMultiPoint(MultiPoint));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isMultiPoint());
    });
  });

  describe('isLineString', function () {
    it('should return true when provided a valid LineString object', function () {
      assert(gjtk.isLineString(gjtk.random.LineString()));
    });
    it('should return false when provided a LineString object without a type', function () {
      var LineString = gjtk.random.LineString();
      delete LineString.type;
      assert(!gjtk.isLineString(LineString));
    });
    it('should return false when provided a LineString object without coordinates', function () {
      var LineString = gjtk.random.LineString();
      delete LineString.coordinates;
      assert(!gjtk.isLineString(LineString));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isLineString());
    });
  });

  describe('isMultiLineString', function () {
    it('should return true when provided a valid MultiLineString object', function () {
      assert(gjtk.isMultiLineString(gjtk.random.MultiLineString()));
    });
    it('should return false when provided a MultiLineString object without a type', function () {
      var MultiLineString = gjtk.random.MultiLineString();
      delete MultiLineString.type;
      assert(!gjtk.isMultiLineString(MultiLineString));
    });
    it('should return false when provided a MultiLineString object without coordinates', function () {
      var MultiLineString = gjtk.random.MultiLineString();
      delete MultiLineString.coordinates;
      assert(!gjtk.isMultiLineString(MultiLineString));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isMultiLineString());
    });
  });

  describe('isPolygon', function () {
    it('should return true when provided a valid Polygon object', function () {
      assert(gjtk.isPolygon(gjtk.random.Polygon()));
    });
    it('should return false when provided a Polygon object without a type', function () {
      var Polygon = gjtk.random.Polygon();
      delete Polygon.type;
      assert(!gjtk.isPolygon(Polygon));
    });
    it('should return false when provided a Polygon object without coordinates', function () {
      var Polygon = gjtk.random.Polygon();
      delete Polygon.coordinates;
      assert(!gjtk.isPolygon(Polygon));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isPolygon());
    });
  });

  describe('isMultiPolygon', function () {
    it('should return true when provided a valid MultiPolygon object', function () {
      assert(gjtk.isMultiPolygon(gjtk.random.MultiPolygon()));
    });
    it('should return false when provided a MultiPolygon object without a type', function () {
      var MultiPolygon = gjtk.random.MultiPolygon();
      delete MultiPolygon.type;
      assert(!gjtk.isMultiPolygon(MultiPolygon));
    });
    it('should return false when provided a MultiPolygon object without coordinates', function () {
      var MultiPolygon = gjtk.random.MultiPolygon();
      delete MultiPolygon.coordinates;
      assert(!gjtk.isMultiPolygon(MultiPolygon));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isMultiPolygon());
    });
  });

  describe('isGeometryCollection', function () {
    it('should return true when provided a valid GeometryCollection object', function () {
      assert(gjtk.isGeometryCollection(gjtk.random.GeometryCollection()));
    });
    it('should return false when provided a GeometryCollection object without a type', function () {
      var GeometryCollection = gjtk.random.GeometryCollection();
      delete GeometryCollection.type;
      assert(!gjtk.isGeometryCollection(GeometryCollection));
    });
    it('should return false when provided a GeometryCollection object without geometries', function () {
      var GeometryCollection = gjtk.random.GeometryCollection();
      delete GeometryCollection.geometries;
      assert(!gjtk.isGeometryCollection(GeometryCollection));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isGeometryCollection());
    });
  });

  describe('isFeature', function () {
    it('should return true when provided a valid Feature object', function () {
      assert(gjtk.isFeature(gjtk.random.Feature()));
    });
    it('should return false when provided a Feature object without a type', function () {
      var Feature = gjtk.random.Feature();
      delete Feature.type;
      assert(!gjtk.isFeature(Feature));
    });
    it('should return false when provided a Feature object without geometry', function () {
      var Feature = gjtk.random.Feature();
      delete Feature.geometry;
      assert(!gjtk.isFeature(Feature));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isFeature());
    });
  });

  describe('isFeatureCollection', function () {
    it('should return true when provided a valid FeatureCollection object', function () {
      assert(gjtk.isFeatureCollection(gjtk.random.FeatureCollection()));
    });
    it('should return false when provided a FeatureCollection object without a type', function () {
      var FeatureCollection = gjtk.random.FeatureCollection();
      delete FeatureCollection.type;
      assert(!gjtk.isFeatureCollection(FeatureCollection));
    });
    it('should return false when provided a FeatureCollection object without features', function () {
      var FeatureCollection = gjtk.random.FeatureCollection();
      delete FeatureCollection.features;
      assert(!gjtk.isFeatureCollection(FeatureCollection));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isFeatureCollection());
    });
  });

  describe('isCRS', function () {
    it('should return true when provided a valid CRS object', function () {
      assert(gjtk.isCRS(gjtk.random.CRS()));
    });
    it('should return false when provided a CRS object without a type', function () {
      var crs = gjtk.random.CRS();
      delete crs.type;
      assert(!gjtk.isCRS(crs));
    });
    it('should return false when provided a CRS object without properties', function () {
      var crs = gjtk.random.CRS();
      delete crs.properties;
      assert(!gjtk.isCRS(crs));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isCRS());
    });
  });

  describe('hasCRS', function () {
    it('should return true when provided a Geometry with a valid CRS', function () {
      var GeometryCRS = gjtk.random.Geometry()
      GeometryCRS.crs = gjtk.random.CRS()
      assert(gjtk.hasCRS(GeometryCRS));
    });
    it('should return true when provided a Feature with a valid CRS', function () {
      var FeatureCRS = gjtk.random.Feature()
      FeatureCRS.crs = gjtk.random.CRS()
      assert(gjtk.hasCRS(FeatureCRS));
    });
    it('should return true when provided a FeatureCollection with a valid CRS', function () {
      var FeatureCollectionCRS = gjtk.random.FeatureCollection()
      FeatureCollectionCRS.crs = gjtk.random.CRS()
      assert(gjtk.hasCRS(FeatureCollectionCRS));
    });
  });

  describe('isLink', function () {
    it('should return true when provided a valid Link object', function () {
      assert(gjtk.isLink(gjtk.random.Link()));
    });
    it('should return true when provided a Link object without a type', function () {
      var Link = gjtk.random.Link();
      delete Link.type;
      assert(gjtk.isLink(Link));
    });
    it('should return false when provided a Link object without href', function () {
      var Link = gjtk.random.Link();
      delete Link.href;
      assert(!gjtk.isLink(Link));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isLink());
    });
  });

  describe('isBbox', function () {
    it('should return true when provided a valid Bbox', function () {
      assert(gjtk.isBbox(gjtk.random.Bbox()));
    });
  });

  describe('hasBbox', function () {
    it('should return true when provided a Geometry with a valid Bbox', function () {
      var GeometryBbox = gjtk.random.Geometry()
      GeometryBbox.bbox = gjtk.random.Bbox()
      assert(gjtk.hasBbox(GeometryBbox));
    });
    it('should return true when provided a Feature with a valid Bbox', function () {
      var FeatureBbox = gjtk.random.Feature()
      FeatureBbox.bbox = gjtk.random.Bbox()
      assert(gjtk.hasBbox(FeatureBbox));
    });
    it('should return true when provided a FeatureCollection with a valid Bbox', function () {
      var FeatureCollectionBbox = gjtk.random.FeatureCollection()
      FeatureCollectionBbox.bbox = gjtk.random.Bbox()
      assert(gjtk.hasBbox(FeatureCollectionBbox));
    });
  });

  // Comparison Methods

  describe('equalPositions', function () {
    it('should return true when provided identical Positions', function () {
      var position = gjtk.random.Position();
      assert(gjtk.equalPositions(position, position));
    });
    it('should return false when provided different Positions', function () {
      var positionA = gjtk.random.Position();
      var positionB = JSON.parse(JSON.stringify(positionA));
      positionB[0] += 1
      assert(!gjtk.equalPositions(positionA, positionB));
    });
  });

  describe('containedPolygon', function () {
    var inner = [[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]];
    var outer = [[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]];
    it('should return true when provided a LinearRing that contains another LinearRing.', function () {
      assert(gjtk.containedPolygon(inner, outer));
    });
    it('should return false when provided a LinearRing that does not contain another LinearRing.', function () {
      assert(!gjtk.containedPolygon(outer, inner));
    });
  });

  // Template Methods

  describe('Point', function () {
    it('should return a valid Point object when provided a valid Position', function () {
      assert(gjtk.isPoint(gjtk.Point(gjtk.random.Position())));
    });
  });

  describe('Feature', function () {
    it('should return a valid Feature object when provided a valid Geometry', function () {
      assert(gjtk.isFeature(gjtk.Feature(gjtk.random.Geometry(), {})));
    });
  });

  describe('FeatureCollection', function () {
    it('should return a valid FeatureCollection object when provided nothing', function () {
      assert(gjtk.isFeatureCollection(gjtk.FeatureCollection()));
    });
    it('should return a valid FeatureCollection object when provided a valid Feature', function () {
      assert(gjtk.isFeatureCollection(gjtk.FeatureCollection(gjtk.random.Feature())));
    });
  });

  describe('GeometryCollection', function () {
    it('should return a valid GeometryCollection object when provided nothing', function () {
      assert(gjtk.isGeometryCollection(gjtk.GeometryCollection()));
    });
    it('should return a valid GeometryCollection object when provided a valid Geometry', function () {
      assert(gjtk.isGeometryCollection(gjtk.GeometryCollection(gjtk.random.Geometry())));
    });
  });

  // Extraction Methods

  describe('positionsOf', function () {
    it('should return valid positions when provided a valid Point', function () {
      gjtk.positionsOf(gjtk.random.Point()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid MultiPoint', function () {
      gjtk.positionsOf(gjtk.random.MultiPoint()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid LineString', function () {
      gjtk.positionsOf(gjtk.random.LineString()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid MultiLineString', function () {
      gjtk.positionsOf(gjtk.random.MultiLineString()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid Polygon', function () {
      gjtk.positionsOf(gjtk.random.Polygon()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid MultiPolygon', function () {
      gjtk.positionsOf(gjtk.random.MultiPolygon()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid GeometryCollection', function () {
      gjtk.positionsOf(gjtk.random.GeometryCollection()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid Feature', function () {
      gjtk.positionsOf(gjtk.random.Feature()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid FeatureCollection', function () {
      gjtk.positionsOf(gjtk.random.FeatureCollection()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
  });

  describe('featuresOf', function () {
    it('should return valid features when provided a valid Feature', function () {
      gjtk.featuresOf(gjtk.random.Feature()).every(
        function ( Feature ) {
          assert(gjtk.isFeature(Feature));
        }
      );
    });
    it('should return valid features when provided a valid FeatureCollection', function () {
      gjtk.featuresOf(gjtk.random.FeatureCollection()).every(
        function ( Feature ) {
          assert(gjtk.isFeature(Feature));
        }
      );
    });
  });

  describe('geometriesOf', function () {
    it('should return valid geometries when provided a valid Point', function () {
      gjtk.geometriesOf(gjtk.random.Point()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid MultiPoint', function () {
      gjtk.geometriesOf(gjtk.random.MultiPoint()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid LineString', function () {
      gjtk.geometriesOf(gjtk.random.LineString()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid MultiLineString', function () {
      gjtk.geometriesOf(gjtk.random.MultiLineString()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid Polygon', function () {
      gjtk.geometriesOf(gjtk.random.Polygon()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid MultiPolygon', function () {
      gjtk.geometriesOf(gjtk.random.MultiPolygon()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid GeometryCollection', function () {
      gjtk.geometriesOf(gjtk.random.GeometryCollection()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid Feature', function () {
      gjtk.geometriesOf(gjtk.random.Feature()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid FeatureCollection', function () {
      gjtk.geometriesOf(gjtk.random.FeatureCollection()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
  });

});
