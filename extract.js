
var extract = module.exports = {

    positionsOf: function ( geojson ) {
        // Find all the Positions in a valid GeoJSON object.
        var positions = [];
        var extractLineStringPositions = function ( LineStringPosition ) {
            LineStringPosition.forEach(
                function ( Position ) {
                    positions.push(Position);
                }
            );
        };
        var extractPolygonPositions = function ( PolygonPosition ) {
            PolygonPosition.forEach(extractLineStringPositions);
        };
        switch (geojson.type) {
            case 'Point':
                positions.push(geojson.coordinates);
                break;
            case 'MultiPoint':
            case 'LineString':
                extractLineStringPositions(geojson.coordinates);
                break;
            case 'MultiLineString':
            case 'Polygon':
                extractPolygonPositions(geojson.coordinates);
                break;
            case 'MultiPolygon':
                geojson.coordinates.forEach(extractPolygonPositions);
                break;
            case 'GeometryCollection':
                extractLineStringPositions(
                    extract.positionsOf(geojson.geometries)
                );
                break;
            case 'Feature':
                extractLineStringPositions(
                    extract.positionsOf(geojson.geometry)
                );
                break;
            case 'FeatureCollection':
                geojson.features.forEach(
                    function ( Feature ) {
                        extractLineStringPositions(
                            extract.positionsOf(Feature.geometry)
                        );
                    }
                );
                break;
        }
        return positions;
    },

    featuresOf: function ( geojson ) {
        // Find all Features in a valid GeoJSON object.
        var features = [];
        switch (geojson.type) {
            case 'Feature':
                features.push(geojson);
                break;
            case 'FeatureCollection':
                geojson.features.forEach(
                    function ( Feature ) {
                        extract.featuresOf(Feature).forEach(
                            function ( Feature ) {
                                features.push(Feature);
                            }
                        );
                    }
                );
                break;
        }
        return features;
    },

    geometriesOf: function ( geojson ) {
        // Find all Geometries in a valid GeoJSON object.
        var geometries = [];
        var extractFeatureGeometries = function ( Feature ) {
            extract.geometriesOf(Feature.geometry).forEach(
                function ( Geometry ) {
                    geometries.push(Geometry);
                }
            );
        };
        switch (geojson.type) {
            case 'Point':
            case 'MultiPoint':
            case 'LineString':
            case 'MultiLineString':
            case 'Polygon':
            case 'MultiPolygon':
                geometries.push(geojson);
                break;
            case 'GeometryCollection':
                geojson.geometries.forEach(
                    function ( Geometry ) {
                        extract.geometriesOf(Geometry).forEach(
                            function ( Geometry ) {
                                geometries.push(Geometry);
                            }
                        );
                    }
                );
                break;
            case 'Feature':
                extractFeatureGeometries(geojson);
                break;
            case 'FeatureCollection':
                geojson.features.forEach(extractFeatureGeometries);
                break;
        }
        return geometries;
    },

}
