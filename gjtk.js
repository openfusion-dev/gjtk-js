
var gjtk = module.exports = {

    extract: require('./extract'),
    generate: require('./generate'),
    random: require('./random'),
    validate: require('./validate'),

//////////////////////////////////////////////////////// Backwards-Compatibility

    isGeoJSON: function ( x ) { return gjtk.validate.isGeoJSON(x); },
    isGeometry: function ( x ) { return gjtk.validate.isGeometry(x); },
    isPosition: function ( x ) { return gjtk.validate.isPosition(x); },
    isPointCoordinates: function ( x ) { return gjtk.validate.isPointCoordinates(x); },
    isMultiPointCoordinates: function ( x ) { return gjtk.validate.isMultiPointCoordinates(x); },
    isLineStringCoordinates: function ( x ) { return gjtk.validate.isLineStringCoordinates(x); },
    isLinearRingCoordinates: function ( x ) { return gjtk.validate.isLinearRingCoordinates(x); },
    isMultiLineStringCoordinates: function ( x ) { return gjtk.validate.isMultiLineStringCoordinates(x); },
    isPolygonCoordinates: function ( x ) { return gjtk.validate.isPolygonCoordinates(x); },
    isMultiPolygonCoordinates: function ( x ) { return gjtk.validate.isMultiPolygonCoordinates(x); },
    isPoint: function ( x ) { return gjtk.validate.isPoint(x); },
    isMultiPoint: function ( x ) { return gjtk.validate.isMultiPoint(x); },
    isLineString: function ( x ) { return gjtk.validate.isLineString(x); },
    isMultiLineString: function ( x ) { return gjtk.validate.isMultiLineString(x); },
    isPolygon: function ( x ) { return gjtk.validate.isPolygon(x); },
    isMultiPolygon: function ( x ) { return gjtk.validate.isMultiPolygon(x); },
    isGeometryCollection: function ( x ) { return gjtk.validate.isGeometryCollection(x); },
    isFeature: function ( x ) { return gjtk.validate.isFeature(x); },
    isFeatureCollection: function ( x ) { return gjtk.validate.isFeatureCollection(x); },
    isCRS: function ( x ) { return gjtk.validate.isCRS(x); },
    hasCRS: function ( x ) { return gjtk.validate.hasCRS(x); },
    isLink: function ( x ) { return gjtk.validate.isLink(x); },
    isBbox: function ( x ) { return gjtk.validate.isBbox(x); },
    hasBbox: function ( x ) { return gjtk.validate.hasBbox(x); },
    equalPositions: function ( a , b ) { return gjtk.validate.equalPositions(a, b); },
    containedPolygon: function ( inner , outer ) { return gjtk.validate.containedPolygon(inner, outer); },

    Point: function ( Position ) { return gjtk.generate.Point(Position); },
    GeometryCollection: function ( Geometries ) { return gjtk.generate.GeometryCollection(Geometries); },
    Feature: function ( Geometry , properties ) { return gjtk.generate.Feature(Geometry, properties); },
    FeatureCollection: function ( Features ) { return gjtk.generate.FeatureCollection(Features); },

    positionsOf: function ( geojson ) { return gjtk.extract.positionsOf(geojson); },
    geometriesOf: function ( geojson ) { return gjtk.extract.geometriesOf(geojson); },
    featuresOf: function ( geojson ) { return gjtk.extract.featuresOf(geojson); },

///////////////////////////////////////////////////////////////////// DEPRECATED

    validCRS: function ( x ) { return gjtk.hasCRS(x); },
    validBbox: function ( x ) { return gjtk.hasBbox(x); }

};
