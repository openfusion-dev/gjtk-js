
var random = module.exports = {

  Position: function () {
    var length = (Math.round(Math.random()*100)%6)+2;
    var Position = [];
    for (var i=0; i < length ;++i) {
        Position.push((Math.random()-0.5)*100);
    };
    return Position;
  },

  PointCoordinates: function () {
      return random.Position();
  },

  MultiPointCoordinates: function () {
    var length = Math.round(Math.random()*100)%6;
    var MultiPointCoordinates = [];
    for (var i=0; i < length ;++i) {
        MultiPointCoordinates.push(random.Position());
    };
    return MultiPointCoordinates;
  },

  LineStringCoordinates: function () {
    var length = (Math.round(Math.random()*100)%6)+2;
    var LineStringCoordinates = [];
    for (var i=0; i < length ;++i) {
        LineStringCoordinates.push(random.Position());
    };
    return LineStringCoordinates;
  },

  LinearRingCoordinates: function () {
    var LinearRingCoordinates = [];
    var origin = random.Position();
    LinearRingCoordinates.push(origin);
    LinearRingCoordinates = LinearRingCoordinates.concat(random.LineStringCoordinates());
    LinearRingCoordinates.push(origin);
    return LinearRingCoordinates;
  },

  MultiLineStringCoordinates: function () {
    var length = Math.round(Math.random()*100)%6;
    var MultiLineStringCoordinates = [];
    for (var i=0; i < length ;++i) {
        MultiLineStringCoordinates.push(random.LineStringCoordinates());
    };
    return MultiLineStringCoordinates;
  },

  PolygonCoordinates: function () {
    var PolygonCoordinates = [
      [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
      [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
    ];
    if (Math.random() < 0.5) {
      PolygonCoordinates = [random.LinearRingCoordinates()];
    }
    return PolygonCoordinates;
  },

  MultiPolygonCoordinates: function () {
    var length = Math.round(Math.random()*100)%6;
    var MultiPolygonCoordinates = [];
    for (var i=0; i < length ;++i) {
        MultiPolygonCoordinates.push(random.PolygonCoordinates());
    };
    return MultiPolygonCoordinates;
  },

  Geometry: function () {
    var Geometries = [
      random.Point,
      random.MultiPoint,
      random.LineString,
      random.MultiLineString,
      random.Polygon,
      random.MultiPolygon,
      random.GeometryCollection
    ];
    return Geometries[Math.floor(Math.random()*Geometries.length)]();
  },

  Point: function () {
    return {
      "type": "Point",
      "coordinates": random.PointCoordinates()
    };
  },

  MultiPoint: function () {
    return {
      "type": "MultiPoint",
      "coordinates": random.MultiPointCoordinates()
    };
  },

  LineString: function () {
    return {
      "type": "LineString",
      "coordinates": random.LineStringCoordinates()
    };
  },

  MultiLineString: function () {
    return {
      "type": "MultiLineString",
      "coordinates": random.MultiLineStringCoordinates()
    };
  },

  Polygon: function () {
    return {
      "type": "Polygon",
      "coordinates": random.PolygonCoordinates()
    };
  },

  MultiPolygon: function () {
    return {
      "type": "MultiPolygon",
      "coordinates": random.MultiPolygonCoordinates()
    };
  },

  GeometryCollection: function () {
    var length = Math.round(Math.random()*100)%3;
    var geometries = [];
    for (var i=0; i < length ;++i) {
        geometries.push(random.Geometry());
    };
    return {
      "type": "GeometryCollection",
      "geometries": geometries
    };
  },

  Feature: function () {
    return {
      "type": "Feature",
      "geometry": random.Geometry(),
      "properties": null
    }
  },

  FeatureCollection: function () {
    var length = Math.round(Math.random()*100)%6;
    var features = [];
    for (var i=0; i < length ;++i) {
        features.push(random.Feature());
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
        "properties": random.Link()
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
