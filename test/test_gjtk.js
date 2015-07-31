var gjtk = require('../gjtk');
var assert = require('assert');
var valid = {

  Position: function () {
    var length = (Math.round(Math.random()*100)%6)+2;
    var Position = [];
    for (var i=0; i < length ;++i) {
        Position.push((Math.random()-0.5)*100);
    };
    return Position;
  },

  PointCoordinates: function () {
      return valid.Position();
  },

  MultiPointCoordinates: function () {
    var length = Math.round(Math.random()*100)%6;
    var MultiPointCoordinates = [];
    for (var i=0; i < length ;++i) {
        MultiPointCoordinates.push(valid.Position());
    };
    return MultiPointCoordinates;
  },

  LineStringCoordinates: function () {
    var length = (Math.round(Math.random()*100)%6)+2;
    var LineStringCoordinates = [];
    for (var i=0; i < length ;++i) {
        LineStringCoordinates.push(valid.Position());
    };
    return LineStringCoordinates;
  },

  LinearRingCoordinates: function () {
    var LinearRingCoordinates = [];
    var origin = valid.Position();
    LinearRingCoordinates.push(origin);
    LinearRingCoordinates = LinearRingCoordinates.concat(valid.LineStringCoordinates());
    LinearRingCoordinates.push(origin);
    return LinearRingCoordinates;
  },

  MultiLineStringCoordinates: function () {
    var length = Math.round(Math.random()*100)%6;
    var MultiLineStringCoordinates = [];
    for (var i=0; i < length ;++i) {
        MultiLineStringCoordinates.push(valid.LineStringCoordinates());
    };
    return MultiLineStringCoordinates;
  },

  PolygonCoordinates: function () {
    var PolygonCoordinates = [
      [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
      [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
    ];
    if (Math.random() < 0.5) {
      PolygonCoordinates = [valid.LinearRingCoordinates()];
    }
    return PolygonCoordinates;
  },

  MultiPolygonCoordinates: function () {
    var length = Math.round(Math.random()*100)%6;
    var MultiPolygonCoordinates = [];
    for (var i=0; i < length ;++i) {
        MultiPolygonCoordinates.push(valid.PolygonCoordinates());
    };
    return MultiPolygonCoordinates;
  },

  Geometry: function () {
    var Geometries = [
      valid.Point(),
      valid.MultiPoint(),
      valid.LineString(),
      valid.MultiLineString(),
      valid.Polygon(),
      valid.MultiPolygon(),
      valid.GeometryCollection()
    ];
    return Geometries[Math.floor(Math.random()*Geometries.length)];
  },

  Point: function () {
    return {
      "type": "Point",
      "coordinates": valid.PointCoordinates()
    };
  },

  MultiPoint: function () {
    return {
      "type": "MultiPoint",
      "coordinates": valid.MultiPointCoordinates()
    };
  },

  LineString: function () {
    return {
      "type": "LineString",
      "coordinates": valid.LineStringCoordinates()
    };
  },

  MultiLineString: function () {
    return {
      "type": "MultiLineString",
      "coordinates": valid.MultiLineStringCoordinates()
    };
  },

  Polygon: function () {
    return {
      "type": "Polygon",
      "coordinates": valid.PolygonCoordinates()
    };
  },

  MultiPolygon: function () {
    return {
      "type": "MultiPolygon",
      "coordinates": valid.MultiPolygonCoordinates()
    };
  },

  GeometryCollection: function () {
    var length = Math.round(Math.random()*100)%3;
    var geometries = [];
    for (var i=0; i < length ;++i) {
        geometries.push(valid.Geometry());
    };
    return {
      "type": "GeometryCollection",
      "geometries": geometries
    };
  },

  Feature: function () {
    return {
      "type": "Feature",
      "geometry": valid.Geometry(),
      "properties": null
    }
  },

  FeatureCollection: function () {
    var length = Math.round(Math.random()*100)%6;
    var features = [];
    for (var i=0; i < length ;++i) {
        features.push(valid.Feature());
    };
    return {
      "type": "FeatureCollection",
      "features": features
    };
  },

  CRS: function () {
    var crs = {
      "type": "name",
      "properties": {
        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
      }
    };
    if (Math.random() < 0.5) {
      crs = {
        "type": "link",
        "properties": valid.Link()
      };
    };
    return crs;
  },

  Link: function () {
    return {
      "href": "data.crs",
      "type": "ogcwkt"
    };
  },

  Bbox: function () {
    return [-180.0, -90.0, 180.0, 90.0];
  }

};


describe('Validation Methods', function () {

  describe('isGeoJSON', function () {
    it('should return true when provided a valid Geometry object', function () {
      assert(gjtk.isGeoJSON(valid.Geometry()));
    });
    it('should return true when provided a valid Feature object', function () {
      assert(gjtk.isGeoJSON(valid.Feature()));
    });
    it('should return true when provided a valid FeatureCollection object', function () {
      assert(gjtk.isGeoJSON(valid.FeatureCollection()));
    });
  });

  describe('isGeometry', function () {
    it('should return true when provided a valid Point object', function () {
      assert(gjtk.isGeometry(valid.Point()));
    });
    it('should return true when provided a valid MultiPoint object', function () {
      assert(gjtk.isGeometry(valid.MultiPoint()));
    });
    it('should return true when provided a valid LineString object', function () {
      assert(gjtk.isGeometry(valid.LineString()));
    });
    it('should return true when provided a valid MultiLineString object', function () {
      assert(gjtk.isGeometry(valid.MultiLineString()));
    });
    it('should return true when provided a valid Polygon object', function () {
      assert(gjtk.isGeometry(valid.Polygon()));
    });
    it('should return true when provided a valid MultiPolygon object', function () {
      assert(gjtk.isGeometry(valid.MultiPolygon()));
    });
    it('should return true when provided a valid GeometryCollection object', function () {
      assert(gjtk.isGeometry(valid.GeometryCollection()));
    });
  });

  describe('isPosition', function () {
    it('should return true when provided an array of at least 2 numbers', function () {
      assert(gjtk.isPosition(valid.Position()));
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
      assert(gjtk.isPointCoordinates(valid.PointCoordinates()));
    });
  });

  describe('isMultiPointCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiPoint coordinates', function () {
      assert(gjtk.isMultiPointCoordinates(valid.MultiPointCoordinates()));
    });
  });

  describe('isLineStringCoordinates', function () {
    it('should return true when provided valid GeoJSON LineString coordinates', function () {
      assert(gjtk.isLineStringCoordinates(valid.LineStringCoordinates()));
    });
  });

  describe('isLinearRingCoordinates', function () {
    it('should return true when provided a valid GeoJSON LinearRing', function () {
      assert(gjtk.isLinearRingCoordinates(valid.LinearRingCoordinates()));
    });
  });

  describe('isMultiLineStringCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiLineString coordinates', function () {
      assert(gjtk.isMultiLineStringCoordinates(valid.MultiLineStringCoordinates()));
    });
  });

  describe('isPolygonCoordinates', function () {
    it('should return true when provided valid GeoJSON Polygon coordinates', function () {
      assert(gjtk.isPolygonCoordinates(valid.PolygonCoordinates()));
    });
  });

  describe('isMultiPolygonCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiPolygon coordinates', function () {
      assert(gjtk.isMultiPolygonCoordinates(valid.MultiPolygonCoordinates()));
    });
  });

  describe('isPoint', function () {
    it('should return true when provided a valid Point object', function () {
      assert(gjtk.isPoint(valid.Point()));
    });
    it('should return false when provided a Point object without a type', function () {
      var Point = valid.Point();
      delete Point.type;
      assert(!gjtk.isPoint(Point));
    });
    it('should return false when provided a Point object without coordinates', function () {
      var Point = valid.Point();
      delete Point.coordinates;
      assert(!gjtk.isPoint(Point));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isPoint());
    });
  });

  describe('isMultiPoint', function () {
    it('should return true when provided a valid MultiPoint object', function () {
      assert(gjtk.isMultiPoint(valid.MultiPoint()));
    });
    it('should return false when provided a MultiPoint object without a type', function () {
      var MultiPoint = valid.MultiPoint();
      delete MultiPoint.type;
      assert(!gjtk.isMultiPoint(MultiPoint));
    });
    it('should return false when provided a MultiPoint object without coordinates', function () {
      var MultiPoint = valid.MultiPoint();
      delete MultiPoint.coordinates;
      assert(!gjtk.isMultiPoint(MultiPoint));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isMultiPoint());
    });
  });

  describe('isLineString', function () {
    it('should return true when provided a valid LineString object', function () {
      assert(gjtk.isLineString(valid.LineString()));
    });
    it('should return false when provided a LineString object without a type', function () {
      var LineString = valid.LineString();
      delete LineString.type;
      assert(!gjtk.isLineString(LineString));
    });
    it('should return false when provided a LineString object without coordinates', function () {
      var LineString = valid.LineString();
      delete LineString.coordinates;
      assert(!gjtk.isLineString(LineString));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isLineString());
    });
  });

  describe('isMultiLineString', function () {
    it('should return true when provided a valid MultiLineString object', function () {
      assert(gjtk.isMultiLineString(valid.MultiLineString()));
    });
    it('should return false when provided a MultiLineString object without a type', function () {
      var MultiLineString = valid.MultiLineString();
      delete MultiLineString.type;
      assert(!gjtk.isMultiLineString(MultiLineString));
    });
    it('should return false when provided a MultiLineString object without coordinates', function () {
      var MultiLineString = valid.MultiLineString();
      delete MultiLineString.coordinates;
      assert(!gjtk.isMultiLineString(MultiLineString));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isMultiLineString());
    });
  });

  describe('isPolygon', function () {
    it('should return true when provided a valid Polygon object', function () {
      assert(gjtk.isPolygon(valid.Polygon()));
    });
    it('should return false when provided a Polygon object without a type', function () {
      var Polygon = valid.Polygon();
      delete Polygon.type;
      assert(!gjtk.isPolygon(Polygon));
    });
    it('should return false when provided a Polygon object without coordinates', function () {
      var Polygon = valid.Polygon();
      delete Polygon.coordinates;
      assert(!gjtk.isPolygon(Polygon));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isPolygon());
    });
  });

  describe('isMultiPolygon', function () {
    it('should return true when provided a valid MultiPolygon object', function () {
      assert(gjtk.isMultiPolygon(valid.MultiPolygon()));
    });
    it('should return false when provided a MultiPolygon object without a type', function () {
      var MultiPolygon = valid.MultiPolygon();
      delete MultiPolygon.type;
      assert(!gjtk.isMultiPolygon(MultiPolygon));
    });
    it('should return false when provided a MultiPolygon object without coordinates', function () {
      var MultiPolygon = valid.MultiPolygon();
      delete MultiPolygon.coordinates;
      assert(!gjtk.isMultiPolygon(MultiPolygon));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isMultiPolygon());
    });
  });

  describe('isGeometryCollection', function () {
    it('should return true when provided a valid GeometryCollection object', function () {
      assert(gjtk.isGeometryCollection(valid.GeometryCollection()));
    });
    it('should return false when provided a GeometryCollection object without a type', function () {
      var GeometryCollection = valid.GeometryCollection();
      delete GeometryCollection.type;
      assert(!gjtk.isGeometryCollection(GeometryCollection));
    });
    it('should return false when provided a GeometryCollection object without geometries', function () {
      var GeometryCollection = valid.GeometryCollection();
      delete GeometryCollection.geometries;
      assert(!gjtk.isGeometryCollection(GeometryCollection));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isGeometryCollection());
    });
  });

  describe('isFeature', function () {
    it('should return true when provided a valid Feature object', function () {
      assert(gjtk.isFeature(valid.Feature()));
    });
    it('should return false when provided a Feature object without a type', function () {
      var Feature = valid.Feature();
      delete Feature.type;
      assert(!gjtk.isFeature(Feature));
    });
    it('should return false when provided a Feature object without geometry', function () {
      var Feature = valid.Feature();
      delete Feature.geometry;
      assert(!gjtk.isFeature(Feature));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isFeature());
    });
  });

  describe('isFeatureCollection', function () {
    it('should return true when provided a valid FeatureCollection object', function () {
      assert(gjtk.isFeatureCollection(valid.FeatureCollection()));
    });
    it('should return false when provided a FeatureCollection object without a type', function () {
      var FeatureCollection = valid.FeatureCollection();
      delete FeatureCollection.type;
      assert(!gjtk.isFeatureCollection(FeatureCollection));
    });
    it('should return false when provided a FeatureCollection object without features', function () {
      var FeatureCollection = valid.FeatureCollection();
      delete FeatureCollection.features;
      assert(!gjtk.isFeatureCollection(FeatureCollection));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isFeatureCollection());
    });
  });

  describe('isCRS', function () {
    it('should return true when provided a valid CRS object', function () {
      assert(gjtk.isCRS(valid.CRS()));
    });
    it('should return false when provided a CRS object without a type', function () {
      var crs = valid.CRS();
      delete crs.type;
      assert(!gjtk.isCRS(crs));
    });
    it('should return false when provided a CRS object without properties', function () {
      var crs = valid.CRS();
      delete crs.properties;
      assert(!gjtk.isCRS(crs));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isCRS());
    });
  });

  describe('hasCRS', function () {
    // TODO
  });

  describe('isLink', function () {
    it('should return true when provided a valid Link object', function () {
      assert(gjtk.isLink(valid.Link()));
    });
    it('should return true when provided a Link object without a type', function () {
      var Link = valid.Link();
      delete Link.type;
      assert(gjtk.isLink(Link));
    });
    it('should return false when provided a Link object without href', function () {
      var Link = valid.Link();
      delete Link.href;
      assert(!gjtk.isLink(Link));
    });
    it('should return false when provided nothing', function () {
      assert(!gjtk.isLink());
    });
  });

  describe('isBbox', function () {
    it('should return true when provided a valid Bbox', function () {
      assert(gjtk.isBbox(valid.Bbox()));
    });
  });

  describe('hasBbox', function () {
    // TODO
  });

});


describe('Comparison Methods', function () {

  describe('equalPositions', function () {
    it('should return true when provided identical Positions', function () {
      var position = valid.Position();
      assert(gjtk.equalPositions(position, position));
    });
    it('should return false when provided different Positions', function () {
      var positionA = valid.Position();
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

});


describe('Template Methods', function () {

  describe('Point', function () {
    it('should return a valid Point object when provided a valid Position', function () {
      assert(gjtk.isPoint(gjtk.Point(valid.Position())));
    });
  });

  describe('Feature', function () {
    it('should return a valid Feature object when provided a valid Geometry', function () {
      assert(gjtk.isFeature(gjtk.Feature(valid.Geometry(), {})));
    });
  });

  describe('FeatureCollection', function () {
    it('should return a valid FeatureCollection object when provided nothing', function () {
      assert(gjtk.isFeatureCollection(gjtk.FeatureCollection()));
    });
    it('should return a valid FeatureCollection object when provided a valid Feature', function () {
      assert(gjtk.isFeatureCollection(gjtk.FeatureCollection(valid.Feature())));
    });
  });

  describe('GeometryCollection', function () {
    it('should return a valid GeometryCollection object when provided nothing', function () {
      assert(gjtk.isGeometryCollection(gjtk.GeometryCollection()));
    });
    it('should return a valid GeometryCollection object when provided a valid Geometry', function () {
      assert(gjtk.isGeometryCollection(gjtk.GeometryCollection(valid.Geometry())));
    });
  });

});


describe('Extraction Methods', function () {

  describe('positionsOf', function () {
    it('should return valid positions when provided a valid Point', function () {
      gjtk.positionsOf(valid.Point()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid MultiPoint', function () {
      gjtk.positionsOf(valid.MultiPoint()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid LineString', function () {
      gjtk.positionsOf(valid.LineString()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid MultiLineString', function () {
      gjtk.positionsOf(valid.MultiLineString()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid Polygon', function () {
      gjtk.positionsOf(valid.Polygon()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid MultiPolygon', function () {
      gjtk.positionsOf(valid.MultiPolygon()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid GeometryCollection', function () {
      gjtk.positionsOf(valid.GeometryCollection()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid Feature', function () {
      gjtk.positionsOf(valid.Feature()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
    it('should return valid positions when provided a valid FeatureCollection', function () {
      gjtk.positionsOf(valid.FeatureCollection()).every(
        function ( Position ) {
          assert(gjtk.isPosition(Position));
        }
      );
    });
  });

  describe('featuresOf', function () {
    it('should return valid features when provided a valid Feature', function () {
      gjtk.featuresOf(valid.Feature()).every(
        function ( Feature ) {
          assert(gjtk.isFeature(Feature));
        }
      );
    });
    it('should return valid features when provided a valid FeatureCollection', function () {
      gjtk.featuresOf(valid.FeatureCollection()).every(
        function ( Feature ) {
          assert(gjtk.isFeature(Feature));
        }
      );
    });
  });

  describe('geometriesOf', function () {
    it('should return valid geometries when provided a valid Point', function () {
      gjtk.geometriesOf(valid.Point()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid MultiPoint', function () {
      gjtk.geometriesOf(valid.MultiPoint()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid LineString', function () {
      gjtk.geometriesOf(valid.LineString()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid MultiLineString', function () {
      gjtk.geometriesOf(valid.MultiLineString()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid Polygon', function () {
      gjtk.geometriesOf(valid.Polygon()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid MultiPolygon', function () {
      gjtk.geometriesOf(valid.MultiPolygon()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid GeometryCollection', function () {
      gjtk.geometriesOf(valid.GeometryCollection()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid Feature', function () {
      gjtk.geometriesOf(valid.Feature()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
    it('should return valid geometries when provided a valid FeatureCollection', function () {
      gjtk.geometriesOf(valid.FeatureCollection()).every(
        function ( Geometry ) {
          assert(gjtk.isGeometry(Geometry));
        }
      );
    });
  });

});
