var GeoJSON = require('../GeoJSON');
var assert = require('assert');
var valid = {

  Point: {
      "type": "Point",
      "coordinates": [100.0, 0.0]
  },

  MultiPoint: {
      "type": "MultiPoint",
      "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
  },

  LineString: {
    "type": "LineString",
    "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
  },

  LinearRing: [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],

  MultiLineString: {
    "type": "MultiLineString",
    "coordinates": [
      [ [100.0, 0.0], [101.0, 1.0] ],
      [ [102.0, 2.0], [103.0, 3.0] ]
    ]
  },

  Polygon: {
    "type": "Polygon",
    "coordinates": [
      [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
    ]
  },

  PolygonWithHole: {
    "type": "Polygon",
    "coordinates": [
      [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
      [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
    ]
  },

  MultiPolygon: {
    "type": "MultiPolygon",
    "coordinates": [
      [
        [ [102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0] ]
      ],
      [
        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
        [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
      ]
    ]
  },

  GeometryCollection: {
    "type": "GeometryCollection",
    "geometries": [
      {
        "type": "Point",
        "coordinates": [100.0, 0.0]
      },
      {
        "type": "LineString",
        "coordinates": [ [101.0, 0.0], [102.0, 1.0] ]
      }
    ]
  },

  Feature: {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [125.6, 10.1]
    },
    "properties": {
      "name": "Dinagat Islands"
    }
  },

  FeatureCollection: {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [102.0, 0.5]
        },
        "properties": {
          "prop0": "value0"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [ [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0] ]
        },
        "properties": {
          "prop0": "value0",
          "prop1": 0.0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
          ]
        },
        "properties": {
          "prop0": "value0",
          "prop1": {
            "this": "that"
          }
        }
      }
    ]
  },

  CRSNamed: {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },

  CRSLinked: {
    "type": "link",
    "properties": {
      "href": "http://example.com/crs/42",
      "type": "proj4"
    }
  },

  Link: {
    "href": "data.crs",
    "type": "ogcwkt"
  },

  Bbox: [-180.0, -90.0, 180.0, 90.0],

};
valid.Geometry = function () {
  var Geometries = [
    valid.Point,
    valid.MultiPoint,
    valid.LineString,
    valid.MultiLineString,
    valid.Polygon,
    valid.MultiPolygon,
    valid.GeometryCollection
  ]
  return Geometries[Math.floor(Math.random()*Geometries.length)]
};
valid.Position = function () {
  var length = (Math.round(Math.random()*100)%6)+2;
  var Position = [];
  for (var i=0; i < length ;++i) {
      Position.push((Math.random()-0.5)*100);
  };
  return Position
};

describe('GeoJSON', function () {

  describe('isGeoJSON', function () {
    it('should return true when provided a valid Geometry object', function () {
      assert(GeoJSON.isGeoJSON(valid.Geometry()));
    });
    it('should return true when provided a valid Feature object', function () {
      assert(GeoJSON.isGeoJSON(valid.Feature));
    });
    it('should return true when provided a valid FeatureCollection object', function () {
      assert(GeoJSON.isGeoJSON(valid.FeatureCollection));
    });
  });

  describe('isGeometry', function () {
    it('should return true when provided a valid Point object', function () {
      assert(GeoJSON.isGeometry(valid.Point));
    });
    it('should return true when provided a valid MultiPoint object', function () {
      assert(GeoJSON.isGeometry(valid.MultiPoint));
    });
    it('should return true when provided a valid LineString object', function () {
      assert(GeoJSON.isGeometry(valid.LineString));
    });
    it('should return true when provided a valid MultiLineString object', function () {
      assert(GeoJSON.isGeometry(valid.MultiLineString));
    });
    it('should return true when provided a valid Polygon object', function () {
      assert(GeoJSON.isGeometry(valid.Polygon));
    });
    it('should return true when provided a valid Polygon object with hole(s)', function () {
      assert(GeoJSON.isGeometry(valid.PolygonWithHole));
    });
    it('should return true when provided a valid MultiPolygon object', function () {
      assert(GeoJSON.isGeometry(valid.MultiPolygon));
    });
    it('should return true when provided a valid GeometryCollection object', function () {
      assert(GeoJSON.isGeometry(valid.GeometryCollection));
    });
  });

  describe('isPosition', function () {
    it('should return true when provided an array of at least 2 numbers', function () {
      assert(GeoJSON.isPosition(valid.Position()));
    });
    it('should return false when provided an array of less than 2 numbers', function () {
      assert(!GeoJSON.isPosition([1]));
    });
    it('should return false when provided an array of less than 2 non-numbers', function () {
      assert(!GeoJSON.isPosition(['a']));
    });
    it('should return false when provided an array of at least 2 non-numbers', function () {
      assert(!GeoJSON.isPosition(['foo', 'bar']));
    });
    it('should return false when provided an array of a mix of at least 2 numbers and non-numbers', function () {
      assert(!GeoJSON.isPosition([1, 'a']));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isPosition());
    });
  });

  describe('isPointCoordinates', function () {
    it('should return true when provided valid GeoJSON Point coordinates', function () {
      assert(GeoJSON.isPointCoordinates(valid.Point.coordinates));
    });
  });

  describe('isMultiPointCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiPoint coordinates', function () {
      assert(GeoJSON.isMultiPointCoordinates(valid.MultiPoint.coordinates));
    });
  });

  describe('isLineStringCoordinates', function () {
    it('should return true when provided valid GeoJSON LineString coordinates', function () {
      assert(GeoJSON.isLineStringCoordinates(valid.LineString.coordinates));
    });
  });

  describe('isLinearRingCoordinates', function () {
    it('should return true when provided a valid GeoJSON LinearRing', function () {
      assert(GeoJSON.isLinearRingCoordinates(valid.LinearRing));
    });
  });

  describe('isMultiLineStringCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiLineString coordinates', function () {
      assert(GeoJSON.isMultiLineStringCoordinates(valid.MultiLineString.coordinates));
    });
  });

  describe('isPolygonCoordinates', function () {
    it('should return true when provided valid GeoJSON Polygon coordinates', function () {
      assert(GeoJSON.isPolygonCoordinates(valid.Polygon.coordinates));
    });
  });

  describe('isMultiPolygonCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiPolygon coordinates', function () {
      assert(GeoJSON.isMultiPolygonCoordinates(valid.MultiPolygon.coordinates));
    });
  });

  describe('isPoint', function () {
    it('should return true when provided a valid Point object', function () {
      assert(GeoJSON.isPoint(valid.Point));
    });
    it('should return false when provided a Point object without a type', function () {
      var Point = JSON.parse(JSON.stringify(valid.Point));
      delete Point.type;
      assert(!GeoJSON.isPoint(Point));
    });
    it('should return false when provided a Point object without coordinates', function () {
      var Point = JSON.parse(JSON.stringify(valid.Point));
      delete Point.coordinates;
      assert(!GeoJSON.isPoint(Point));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isPoint());
    });
  });

  describe('isMultiPoint', function () {
    it('should return true when provided a valid MultiPoint object', function () {
      assert(GeoJSON.isMultiPoint(valid.MultiPoint));
    });
    it('should return false when provided a MultiPoint object without a type', function () {
      var MultiPoint = JSON.parse(JSON.stringify(valid.MultiPoint));
      delete MultiPoint.type;
      assert(!GeoJSON.isMultiPoint(MultiPoint));
    });
    it('should return false when provided a MultiPoint object without coordinates', function () {
      var MultiPoint = JSON.parse(JSON.stringify(valid.MultiPoint));
      delete MultiPoint.coordinates;
      assert(!GeoJSON.isMultiPoint(MultiPoint));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isMultiPoint());
    });
  });

  describe('isLineString', function () {
    it('should return true when provided a valid LineString object', function () {
      assert(GeoJSON.isLineString(valid.LineString));
    });
    it('should return false when provided a LineString object without a type', function () {
      var LineString = JSON.parse(JSON.stringify(valid.LineString));
      delete LineString.type;
      assert(!GeoJSON.isLineString(LineString));
    });
    it('should return false when provided a LineString object without coordinates', function () {
      var LineString = JSON.parse(JSON.stringify(valid.LineString));
      delete LineString.coordinates;
      assert(!GeoJSON.isLineString(LineString));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isLineString());
    });
  });

  describe('isMultiLineString', function () {
    it('should return true when provided a valid MultiLineString object', function () {
      assert(GeoJSON.isMultiLineString(valid.MultiLineString));
    });
    it('should return false when provided a MultiLineString object without a type', function () {
      var MultiLineString = JSON.parse(JSON.stringify(valid.MultiLineString));
      delete MultiLineString.type;
      assert(!GeoJSON.isMultiLineString(MultiLineString));
    });
    it('should return false when provided a MultiLineString object without coordinates', function () {
      var MultiLineString = JSON.parse(JSON.stringify(valid.MultiLineString));
      delete MultiLineString.coordinates;
      assert(!GeoJSON.isMultiLineString(MultiLineString));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isMultiLineString());
    });
  });

  describe('isPolygon', function () {
    it('should return true when provided a valid Polygon object', function () {
      assert(GeoJSON.isPolygon(valid.Polygon));
    });
    it('should return false when provided a Polygon object without a type', function () {
      var Polygon = JSON.parse(JSON.stringify(valid.Polygon));
      delete Polygon.type;
      assert(!GeoJSON.isPolygon(Polygon));
    });
    it('should return false when provided a Polygon object without coordinates', function () {
      var Polygon = JSON.parse(JSON.stringify(valid.Polygon));
      delete Polygon.coordinates;
      assert(!GeoJSON.isPolygon(Polygon));
    });
    it('should return true when provided a valid Polygon object wih hole(s)', function () {
      assert(GeoJSON.isPolygon(valid.PolygonWithHole));
    });
    it('should return false when provided a Polygon object wih hole(s) without a type', function () {
      var PolygonWithHole = JSON.parse(JSON.stringify(valid.PolygonWithHole));
      delete PolygonWithHole.type;
      assert(!GeoJSON.isPolygon(PolygonWithHole));
    });
    it('should return false when provided a Polygon object wih hole(s) without coordinates', function () {
      var PolygonWithHole = JSON.parse(JSON.stringify(valid.PolygonWithHole));
      delete PolygonWithHole.coordinates;
      assert(!GeoJSON.isPolygon(PolygonWithHole));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isPolygon());
    });
  });

  describe('isMultiPolygon', function () {
    it('should return true when provided a valid MultiPolygon object', function () {
      assert(GeoJSON.isMultiPolygon(valid.MultiPolygon));
    });
    it('should return false when provided a MultiPolygon object without a type', function () {
      var MultiPolygon = JSON.parse(JSON.stringify(valid.MultiPolygon));
      delete MultiPolygon.type;
      assert(!GeoJSON.isMultiPolygon(MultiPolygon));
    });
    it('should return false when provided a MultiPolygon object without coordinates', function () {
      var MultiPolygon = JSON.parse(JSON.stringify(valid.MultiPolygon));
      delete MultiPolygon.coordinates;
      assert(!GeoJSON.isMultiPolygon(MultiPolygon));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isMultiPolygon());
    });
  });

  describe('isGeometryCollection', function () {
    it('should return true when provided a valid GeometryCollection object', function () {
      assert(GeoJSON.isGeometryCollection(valid.GeometryCollection));
    });
    it('should return false when provided a GeometryCollection object without a type', function () {
      var GeometryCollection = JSON.parse(JSON.stringify(valid.GeometryCollection));
      delete GeometryCollection.type;
      assert(!GeoJSON.isGeometryCollection(GeometryCollection));
    });
    it('should return false when provided a GeometryCollection object without geometries', function () {
      var GeometryCollection = JSON.parse(JSON.stringify(valid.GeometryCollection));
      delete GeometryCollection.geometries;
      assert(!GeoJSON.isGeometryCollection(GeometryCollection));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isGeometryCollection());
    });
  });

  describe('isFeature', function () {
    it('should return true when provided a valid Feature object', function () {
      assert(GeoJSON.isFeature(valid.Feature));
    });
    it('should return false when provided a Feature object without a type', function () {
      var Feature = JSON.parse(JSON.stringify(valid.Feature));
      delete Feature.type;
      assert(!GeoJSON.isFeature(Feature));
    });
    it('should return false when provided a Feature object without geometry', function () {
      var Feature = JSON.parse(JSON.stringify(valid.Feature));
      delete Feature.geometry;
      assert(!GeoJSON.isFeature(Feature));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isFeature());
    });
  });

  describe('isFeatureCollection', function () {
    it('should return true when provided a valid FeatureCollection object', function () {
      assert(GeoJSON.isFeatureCollection(valid.FeatureCollection));
    });
    it('should return false when provided a FeatureCollection object without a type', function () {
      var FeatureCollection = JSON.parse(JSON.stringify(valid.FeatureCollection));
      delete FeatureCollection.type;
      assert(!GeoJSON.isFeatureCollection(FeatureCollection));
    });
    it('should return false when provided a FeatureCollection object without features', function () {
      var FeatureCollection = JSON.parse(JSON.stringify(valid.FeatureCollection));
      delete FeatureCollection.features;
      assert(!GeoJSON.isFeatureCollection(FeatureCollection));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isFeatureCollection());
    });
  });

  describe('isCRS', function () {
    it('should return true when provided a valid Named CRS object', function () {
      assert(GeoJSON.isCRS(valid.CRSNamed));
    });
    it('should return false when provided a Named CRS object without a type', function () {
      var CRSNamed = JSON.parse(JSON.stringify(valid.CRSNamed));
      delete CRSNamed.type;
      assert(!GeoJSON.isCRS(CRSNamed));
    });
    it('should return false when provided a Named CRS object without properties', function () {
      var CRSNamed = JSON.parse(JSON.stringify(valid.CRSNamed));
      delete CRSNamed.properties;
      assert(!GeoJSON.isCRS(CRSNamed));
    });
    it('should return true when provided a valid Linked CRS object', function () {
      assert(GeoJSON.isCRS(valid.CRSLinked));
    });
    it('should return false when provided a Linked CRS object without a type', function () {
      var CRSLinked = JSON.parse(JSON.stringify(valid.CRSLinked));
      delete CRSLinked.type;
      assert(!GeoJSON.isCRS(CRSLinked));
    });
    it('should return false when provided a Linked CRS object without properties', function () {
      var CRSLinked = JSON.parse(JSON.stringify(valid.CRSLinked));
      delete CRSLinked.properties;
      assert(!GeoJSON.isCRS(CRSLinked));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isCRS());
    });
  });

  describe('isLink', function () {
    it('should return true when provided a valid Link object', function () {
      assert(GeoJSON.isLink(valid.Link));
    });
    it('should return true when provided a Link object without a type', function () {
      var Link = JSON.parse(JSON.stringify(valid.Link));
      delete Link.type;
      assert(GeoJSON.isLink(Link));
    });
    it('should return false when provided a Link object without href', function () {
      var Link = JSON.parse(JSON.stringify(valid.Link));
      delete Link.href;
      assert(!GeoJSON.isLink(Link));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isLink());
    });
  });

  describe('isBbox', function () {
    xit('should return true when provided a valid Bbox', function () {
      assert(GeoJSON.isBbox(valid.Bbox));
    });
  });

  describe('Point', function () {
    it('should return a valid Point object when provided a valid Position', function () {
      assert(GeoJSON.isPoint(GeoJSON.Point(valid.Position())));
    });
  });

  describe('Feature', function () {
    it('should return a valid Feature object when provided a valid Geometry', function () {
      assert(GeoJSON.isFeature(GeoJSON.Feature(valid.Geometry(), {})));
    });
  });

  describe('FeatureCollection', function () {
    it('should return a valid FeatureCollection object when provided nothing', function () {
      assert(GeoJSON.isFeatureCollection(GeoJSON.FeatureCollection()));
    });
    it('should return a valid FeatureCollection object when provided a valid Feature', function () {
      assert(GeoJSON.isFeatureCollection(GeoJSON.FeatureCollection(valid.Feature)));
    });
  });

  describe('GeometryCollection', function () {
    it('should return a valid GeometryCollection object when provided nothing', function () {
      assert(GeoJSON.isGeometryCollection(GeoJSON.GeometryCollection()));
    });
    it('should return a valid GeometryCollection object when provided a valid Geometry', function () {
      assert(GeoJSON.isGeometryCollection(GeoJSON.GeometryCollection(valid.Geometry())));
    });
  });

});
