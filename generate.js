
var generate = module.exports = {

    Point: function ( Position ) {
        // Create a valid GeoJSON Point geometry.
        return {
          type: "Point",
          "coordinates": Position
        };
    },

    Feature: function ( Geometry , properties ) {
        // Create a valid GeoJSON Feature.
        var Feature = {
            type: 'Feature',
            geometry: null,
            properties: (typeof properties === 'object') ? properties : {}
        };
        Feature.geometry = Geometry;
        return Feature;
    },

    FeatureCollection: function ( Features ) {
        // Create a valid GeoJSON FeatureCollection.
        var FeatureCollection = {
            type: 'FeatureCollection',
            features: []
        };
        if (Array.isArray(Features)) Features.forEach(
            function ( Feature ) {
                FeatureCollection.features.push(Feature);
            }
        );
        return FeatureCollection;
    },

    GeometryCollection: function ( Geometries ) {
        // Create a valid GeoJSON GeometryCollection.
        var GeometryCollection = {
            type: 'GeometryCollection',
            geometries: []
        };
        if (Array.isArray(Geometries)) Geometries.forEach(
            function ( Geometry ) {
                GeometryCollection.geometries.push(Geometry);
            }
        );
        return GeometryCollection;
    },

}
