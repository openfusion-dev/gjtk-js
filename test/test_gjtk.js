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
  var length = (Math.round(Math.random()*100)%5)+2;
  var Position = [];
  for (var i=0; i < length ;++i) {
      Position.push(Math.random());
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
  });
  describe('isPoint', function () {
    it('should return true when provided a valid Point object', function () {
      assert(GeoJSON.isPoint(valid.Point));
    });
  });
  describe('isMultiPoint', function () {
    it('should return true when provided a valid MultiPoint object', function () {
      assert(GeoJSON.isMultiPoint(valid.MultiPoint));
    });
  });
  describe('isLineString', function () {
    it('should return true when provided a valid LineString object', function () {
      assert(GeoJSON.isLineString(valid.LineString));
    });
  });
  describe('isMultiLineString', function () {
    it('should return true when provided a valid MultiLineString object', function () {
      assert(GeoJSON.isMultiLineString(valid.MultiLineString));
    });
  });
  describe('isPolygon', function () {
    it('should return true when provided a valid Polygon object', function () {
      assert(GeoJSON.isPolygon(valid.Polygon));
    });
    it('should return true when provided a valid Polygon object wih hole(s)', function () {
      assert(GeoJSON.isPolygon(valid.PolygonWithHole));
    });
  });
  describe('isMultiPolygon', function () {
    it('should return true when provided a valid MultiPolygon object', function () {
      assert(GeoJSON.isMultiPolygon(valid.MultiPolygon));
    });
  });
  describe('isGeometryCollection', function () {
    it('should return true when provided a valid GeometryCollection object', function () {
      assert(GeoJSON.isGeometryCollection(valid.GeometryCollection));
    });
  });
  describe('isFeature', function () {
    it('should return true when provided a valid Feature object', function () {
      assert(GeoJSON.isFeature(valid.Feature));
    });
  });
  describe('isFeatureCollection', function () {
    it('should return true when provided a valid FeatureCollection object', function () {
      assert(GeoJSON.isFeatureCollection(valid.FeatureCollection));
    });
  });
  describe('isCRS', function () {
    it('should return true when provided a valid Named CRS object', function () {
      assert(GeoJSON.isCRS(valid.CRSNamed));
    });
    it('should return true when provided a valid Linked CRS object', function () {
      assert(GeoJSON.isCRS(valid.CRSLinked));
    });
  });
  describe('isLink', function () {
    it('should return true when provided a valid Link object', function () {
      assert(GeoJSON.isLink(valid.Link));
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