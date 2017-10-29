

var gjtk = require('../gjtk');
var assert = require('assert');


describe('gjtk.validate', function () {

  describe('isGeoJSON', function () {
    it('should return true when provided a valid Geometry object', function () {
      assert(gjtk.validate.isGeoJSON(gjtk.random.Geometry()));
    });
    it('should return true when provided a valid Feature object', function () {
      assert(gjtk.validate.isGeoJSON(gjtk.random.Feature()));
    });
    it('should return true when provided a valid FeatureCollection object', function () {
      assert(gjtk.validate.isGeoJSON(gjtk.random.FeatureCollection()));
    });
  });

  describe('isGeometry', function () {
    it('should return true when provided a valid Point object', function () {
      assert(gjtk.validate.isGeometry(gjtk.random.Point()));
    });
    it('should return true when provided a valid MultiPoint object', function () {
      assert(gjtk.validate.isGeometry(gjtk.random.MultiPoint()));
    });
    it('should return true when provided a valid LineString object', function () {
      assert(gjtk.validate.isGeometry(gjtk.random.LineString()));
    });
    it('should return true when provided a valid MultiLineString object', function () {
      assert(gjtk.validate.isGeometry(gjtk.random.MultiLineString()));
    });
    it('should return true when provided a valid Polygon object', function () {
      assert(gjtk.validate.isGeometry(gjtk.random.Polygon()));
    });
    it('should return true when provided a valid MultiPolygon object', function () {
      assert(gjtk.validate.isGeometry(gjtk.random.MultiPolygon()));
    });
    it('should return true when provided a valid GeometryCollection object', function () {
      assert(gjtk.validate.isGeometry(gjtk.random.GeometryCollection()));
    });
  });

  describe('isPosition', function () {
    it('should return true when provided an array of at least 2 numbers', function () {
      assert(gjtk.validate.isPosition(gjtk.random.Position()));
    });
    it('should return false when provided an array of less than 2 numbers', function () {
      assert(!gjtk.validate.isPosition([1]));
    });
    it('should return false when provided an array of less than 2 non-numbers', function () {
      assert(!gjtk.validate.isPosition(['a']));
    });
    it('should return false when provided an array of at least 2 non-numbers', function () {
      assert(!gjtk.validate.isPosition(['foo', 'bar']));
    });
    it('should return false when provided an array of a mix of at least 2 numbers and non-numbers', function () {
      assert(!gjtk.validate.isPosition([1, 'a']));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.validate.isPosition());
    });
  });

  describe('isPointCoordinates', function () {
    it('should return true when provided valid GeoJSON Point coordinates', function () {
      assert(gjtk.validate.isPointCoordinates(gjtk.random.PointCoordinates()));
    });
  });

  describe('isMultiPointCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiPoint coordinates', function () {
      assert(gjtk.validate.isMultiPointCoordinates(gjtk.random.MultiPointCoordinates()));
    });
  });

  describe('isLineStringCoordinates', function () {
    it('should return true when provided valid GeoJSON LineString coordinates', function () {
      assert(gjtk.validate.isLineStringCoordinates(gjtk.random.LineStringCoordinates()));
    });
  });

  describe('isLinearRingCoordinates', function () {
    it('should return true when provided a valid GeoJSON LinearRing', function () {
      assert(gjtk.validate.isLinearRingCoordinates(gjtk.random.LinearRingCoordinates()));
    });
  });

  describe('isMultiLineStringCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiLineString coordinates', function () {
      assert(gjtk.validate.isMultiLineStringCoordinates(gjtk.random.MultiLineStringCoordinates()));
    });
  });

  describe('isPolygonCoordinates', function () {
    it('should return true when provided valid GeoJSON Polygon coordinates', function () {
      assert(gjtk.validate.isPolygonCoordinates(gjtk.random.PolygonCoordinates()));
    });
  });

  describe('isMultiPolygonCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiPolygon coordinates', function () {
      assert(gjtk.validate.isMultiPolygonCoordinates(gjtk.random.MultiPolygonCoordinates()));
    });
  });

  describe('isPoint', function () {
    it('should return true when provided a valid Point object', function () {
      assert(gjtk.validate.isPoint(gjtk.random.Point()));
    });
    it('should return false when provided a Point object without a type', function () {
      var Point = gjtk.random.Point();
      delete Point.type;
      assert(!gjtk.validate.isPoint(Point));
    });
    it('should return false when provided a Point object without coordinates', function () {
      var Point = gjtk.random.Point();
      delete Point.coordinates;
      assert(!gjtk.validate.isPoint(Point));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.validate.isPoint());
    });
  });

  describe('isMultiPoint', function () {
    it('should return true when provided a valid MultiPoint object', function () {
      assert(gjtk.validate.isMultiPoint(gjtk.random.MultiPoint()));
    });
    it('should return false when provided a MultiPoint object without a type', function () {
      var MultiPoint = gjtk.random.MultiPoint();
      delete MultiPoint.type;
      assert(!gjtk.validate.isMultiPoint(MultiPoint));
    });
    it('should return false when provided a MultiPoint object without coordinates', function () {
      var MultiPoint = gjtk.random.MultiPoint();
      delete MultiPoint.coordinates;
      assert(!gjtk.validate.isMultiPoint(MultiPoint));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.validate.isMultiPoint());
    });
  });

  describe('isLineString', function () {
    it('should return true when provided a valid LineString object', function () {
      assert(gjtk.validate.isLineString(gjtk.random.LineString()));
    });
    it('should return false when provided a LineString object without a type', function () {
      var LineString = gjtk.random.LineString();
      delete LineString.type;
      assert(!gjtk.validate.isLineString(LineString));
    });
    it('should return false when provided a LineString object without coordinates', function () {
      var LineString = gjtk.random.LineString();
      delete LineString.coordinates;
      assert(!gjtk.validate.isLineString(LineString));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.validate.isLineString());
    });
  });

  describe('isMultiLineString', function () {
    it('should return true when provided a valid MultiLineString object', function () {
      assert(gjtk.validate.isMultiLineString(gjtk.random.MultiLineString()));
    });
    it('should return false when provided a MultiLineString object without a type', function () {
      var MultiLineString = gjtk.random.MultiLineString();
      delete MultiLineString.type;
      assert(!gjtk.validate.isMultiLineString(MultiLineString));
    });
    it('should return false when provided a MultiLineString object without coordinates', function () {
      var MultiLineString = gjtk.random.MultiLineString();
      delete MultiLineString.coordinates;
      assert(!gjtk.validate.isMultiLineString(MultiLineString));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.validate.isMultiLineString());
    });
  });

  describe('isPolygon', function () {
    it('should return true when provided a valid Polygon object', function () {
      assert(gjtk.validate.isPolygon(gjtk.random.Polygon()));
    });
    it('should return false when provided a Polygon object without a type', function () {
      var Polygon = gjtk.random.Polygon();
      delete Polygon.type;
      assert(!gjtk.validate.isPolygon(Polygon));
    });
    it('should return false when provided a Polygon object without coordinates', function () {
      var Polygon = gjtk.random.Polygon();
      delete Polygon.coordinates;
      assert(!gjtk.validate.isPolygon(Polygon));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.validate.isPolygon());
    });
  });

  describe('isMultiPolygon', function () {
    it('should return true when provided a valid MultiPolygon object', function () {
      assert(gjtk.validate.isMultiPolygon(gjtk.random.MultiPolygon()));
    });
    it('should return false when provided a MultiPolygon object without a type', function () {
      var MultiPolygon = gjtk.random.MultiPolygon();
      delete MultiPolygon.type;
      assert(!gjtk.validate.isMultiPolygon(MultiPolygon));
    });
    it('should return false when provided a MultiPolygon object without coordinates', function () {
      var MultiPolygon = gjtk.random.MultiPolygon();
      delete MultiPolygon.coordinates;
      assert(!gjtk.validate.isMultiPolygon(MultiPolygon));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.validate.isMultiPolygon());
    });
  });

  describe('isGeometryCollection', function () {
    it('should return true when provided a valid GeometryCollection object', function () {
      assert(gjtk.validate.isGeometryCollection(gjtk.random.GeometryCollection()));
    });
    it('should return false when provided a GeometryCollection object without a type', function () {
      var GeometryCollection = gjtk.random.GeometryCollection();
      delete GeometryCollection.type;
      assert(!gjtk.validate.isGeometryCollection(GeometryCollection));
    });
    it('should return false when provided a GeometryCollection object without geometries', function () {
      var GeometryCollection = gjtk.random.GeometryCollection();
      delete GeometryCollection.geometries;
      assert(!gjtk.validate.isGeometryCollection(GeometryCollection));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.validate.isGeometryCollection());
    });
  });

  describe('isFeature', function () {
    it('should return true when provided a valid Feature object', function () {
      assert(gjtk.validate.isFeature(gjtk.random.Feature()));
    });
    it('should return false when provided a Feature object without a type', function () {
      var Feature = gjtk.random.Feature();
      delete Feature.type;
      assert(!gjtk.validate.isFeature(Feature));
    });
    it('should return false when provided a Feature object without geometry', function () {
      var Feature = gjtk.random.Feature();
      delete Feature.geometry;
      assert(!gjtk.validate.isFeature(Feature));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.validate.isFeature());
    });
  });

  describe('isFeatureCollection', function () {
    it('should return true when provided a valid FeatureCollection object', function () {
      assert(gjtk.validate.isFeatureCollection(gjtk.random.FeatureCollection()));
    });
    it('should return false when provided a FeatureCollection object without a type', function () {
      var FeatureCollection = gjtk.random.FeatureCollection();
      delete FeatureCollection.type;
      assert(!gjtk.validate.isFeatureCollection(FeatureCollection));
    });
    it('should return false when provided a FeatureCollection object without features', function () {
      var FeatureCollection = gjtk.random.FeatureCollection();
      delete FeatureCollection.features;
      assert(!gjtk.validate.isFeatureCollection(FeatureCollection));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.validate.isFeatureCollection());
    });
  });

  describe('isCRS', function () {
    it('should return true when provided a valid CRS object', function () {
      assert(gjtk.validate.isCRS(gjtk.random.CRS()));
    });
    it('should return false when provided a CRS object without a type', function () {
      var crs = gjtk.random.CRS();
      delete crs.type;
      assert(!gjtk.validate.isCRS(crs));
    });
    it('should return false when provided a CRS object without properties', function () {
      var crs = gjtk.random.CRS();
      delete crs.properties;
      assert(!gjtk.validate.isCRS(crs));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.validate.isCRS());
    });
  });

  describe('hasCRS', function () {
    it('should return true when provided a Geometry with a valid CRS', function () {
      var GeometryCRS = gjtk.random.Geometry()
      GeometryCRS.crs = gjtk.random.CRS()
      assert(gjtk.validate.hasCRS(GeometryCRS));
    });
    it('should return true when provided a Feature with a valid CRS', function () {
      var FeatureCRS = gjtk.random.Feature()
      FeatureCRS.crs = gjtk.random.CRS()
      assert(gjtk.validate.hasCRS(FeatureCRS));
    });
    it('should return true when provided a FeatureCollection with a valid CRS', function () {
      var FeatureCollectionCRS = gjtk.random.FeatureCollection()
      FeatureCollectionCRS.crs = gjtk.random.CRS()
      assert(gjtk.validate.hasCRS(FeatureCollectionCRS));
    });
  });

  describe('isLink', function () {
    it('should return true when provided a valid Link object', function () {
      assert(gjtk.validate.isLink(gjtk.random.Link()));
    });
    it('should return true when provided a Link object without a type', function () {
      var Link = gjtk.random.Link();
      delete Link.type;
      assert(gjtk.validate.isLink(Link));
    });
    it('should return false when provided a Link object without href', function () {
      var Link = gjtk.random.Link();
      delete Link.href;
      assert(!gjtk.validate.isLink(Link));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.validate.isLink());
    });
  });

  describe('isBbox', function () {
    it('should return true when provided a valid Bbox', function () {
      assert(gjtk.validate.isBbox(gjtk.random.Bbox()));
    });
    it('should return false when not provided an array', function () {
      assert(!gjtk.validate.isBbox({}));
    });
    it('should return false when not provided an array with an even number of elements', function () {
      assert(!gjtk.validate.isBbox(['invalid']));
    });
    it('should return false when not provided an invalid Bbox', function () {
      assert(!gjtk.validate.isBbox([2, 1]));
    });
  });

  describe('hasBbox', function () {
    it('should return true when provided a Geometry with a valid Bbox', function () {
      var GeometryBbox = gjtk.random.Geometry()
      GeometryBbox.bbox = gjtk.random.Bbox()
      assert(gjtk.validate.hasBbox(GeometryBbox));
    });
    it('should return true when provided a Feature with a valid Bbox', function () {
      var FeatureBbox = gjtk.random.Feature()
      FeatureBbox.bbox = gjtk.random.Bbox()
      assert(gjtk.validate.hasBbox(FeatureBbox));
    });
    it('should return true when provided a FeatureCollection with a valid Bbox', function () {
      var FeatureCollectionBbox = gjtk.random.FeatureCollection()
      FeatureCollectionBbox.bbox = gjtk.random.Bbox()
      assert(gjtk.validate.hasBbox(FeatureCollectionBbox));
    });
  });

  // Comparison Methods

  describe('equalPositions', function () {
    it('should return true when provided identical Positions', function () {
      var position = gjtk.random.Position();
      assert(gjtk.validate.equalPositions(position, position));
    });
    it('should return false when provided different Positions', function () {
      var positionA = gjtk.random.Position();
      var positionB = JSON.parse(JSON.stringify(positionA));
      positionB[0] += 1
      assert(!gjtk.validate.equalPositions(positionA, positionB));
    });
  });

  describe('containedPolygon', function () {
    var inner = [[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]];
    var outer = [[0, 0], [0, 5], [5, 5], [5, 0], [0, 0]];
    it('should return true when provided a LinearRing that contains another LinearRing.', function () {
      assert(gjtk.validate.containedPolygon(inner, outer));
    });
    it('should return false when provided a LinearRing that does not contain another LinearRing.', function () {
      assert(!gjtk.validate.containedPolygon(outer, inner));
    });
  });

});
