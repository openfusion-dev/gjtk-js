
var inside = require('point-in-polygon');

var validate = module.exports = {

    isGeoJSON: function ( x ) {
        // Validate a GeoJSON object.
        return (
            validate.isGeometry(x) ||
            validate.isFeature(x) ||
            validate.isFeatureCollection(x)
        );
    },

    isGeometry: function ( x ) {
        // Validate a GeoJSON Geometry.
        return (
            validate.isPoint(x) ||
            validate.isMultiPoint(x) ||
            validate.isLineString(x) ||
            validate.isMultiLineString(x) ||
            validate.isPolygon(x) ||
            validate.isMultiPolygon(x) ||
            validate.isGeometryCollection(x)
        );
    },

    isPosition: function ( x ) {
        // Validate a GeoJSON Position.
        return (
            Array.isArray(x) &&
            x.length > 1 &&
            x.every(
                function ( element ) {
                    return (typeof element === 'number');
                }
            )
        );
    },

    isPointCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON Point.
        return validate.isPosition(x);
    },

    isMultiPointCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON MultiPoint.
        return (
            Array.isArray(x) &&
            x.every(validate.isPosition)
        );
    },

    isLineStringCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON LineString.
        return (
            Array.isArray(x) &&
            x.length > 1 &&
            validate.isMultiPointCoordinates(x)
        );
    },

    isLinearRingCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON LinearRing.
        return (
            Array.isArray(x) &&
            x.length > 3 &&
            validate.isLineStringCoordinates(x) &&
            validate.equalPositions(x[0],x[x.length-1])
        );
    },

    isMultiLineStringCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON MultiLineString.
        return (
            Array.isArray(x) &&
            x.every(validate.isLineStringCoordinates)
        );
    },

    isPolygonCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON Polygon.
        return (
            Array.isArray(x) &&
            x.every(validate.isLinearRingCoordinates) &&
            x.every(
                function ( LinearRingPosition , i , PolygonPosition ) {
                    return (
                        i == 0 ||
                        validate.containedPolygon(
                            LinearRingPosition,
                            PolygonPosition[0]
                        )
                    );
                }
            )
        );
    },

    isMultiPolygonCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON MultiPolygon.
        return (
            Array.isArray(x) &&
            x.every(validate.isPolygonCoordinates)
        );
    },

    isPoint: function ( x ) {
        // Validate a GeoJSON Point.
        return (
            x != null &&
            x.type === 'Point' &&
            validate.isPointCoordinates(x.coordinates) &&
            validate.hasCRS(x) &&
            validate.hasBbox(x)
        );
    },

    isMultiPoint: function ( x ) {
        // Validate a GeoJSON MultiPoint.
        return (
            x != null &&
            x.type === 'MultiPoint' &&
            validate.isMultiPointCoordinates(x.coordinates) &&
            validate.hasCRS(x) &&
            validate.hasBbox(x)
        );
    },

    isLineString: function ( x ) {
        // Validate a GeoJSON LineString.
        return (
            x != null &&
            x.type === 'LineString' &&
            validate.isLineStringCoordinates(x.coordinates) &&
            validate.hasCRS(x) &&
            validate.hasBbox(x)
        );
    },

    isMultiLineString: function ( x ) {
        // Validate a GeoJSON MultiLineString.
        return (
            x != null &&
            x.type === 'MultiLineString' &&
            validate.isMultiLineStringCoordinates(x.coordinates) &&
            validate.hasCRS(x) &&
            validate.hasBbox(x)
        );
    },

    isPolygon: function ( x ) {
        // Validate a GeoJSON Polygon.
        return (
            x != null &&
            x.type === 'Polygon' &&
            validate.isPolygonCoordinates(x.coordinates) &&
            validate.hasCRS(x) &&
            validate.hasBbox(x)
        );
    },

    isMultiPolygon: function ( x ) {
        // Validate a GeoJSON MultiPolygon.
        return (
            x != null &&
            x.type === 'MultiPolygon' &&
            validate.isMultiPolygonCoordinates(x.coordinates) &&
            validate.hasCRS(x) &&
            validate.hasBbox(x)
        );
    },

    isGeometryCollection: function ( x ) {
        // Validate a GeoJSON GeometryCollection.
        return (
            x != null &&
            x.type === 'GeometryCollection' &&
            Array.isArray(x.geometries) &&
            x.geometries.every(validate.isGeometry) &&
            validate.hasCRS(x) &&
            validate.hasBbox(x)
        );
    },

    isFeature: function ( x ) {
        // Validate a GeoJSON Feature.
        return (
            x != null &&
            x.type === 'Feature' &&
            typeof x.properties === 'object' &&
            validate.hasCRS(x) &&
            validate.hasBbox(x) &&
            (
                x.geometry === null ||
                validate.isGeometry(x.geometry)
            )
        );
    },

    isFeatureCollection: function ( x ) {
        // Validate a GeoJSON FeatureCollection.
        return (
            x != null &&
            x.type === 'FeatureCollection' &&
            Array.isArray(x.features) &&
            x.features.every(validate.isFeature) &&
            validate.hasCRS(x) &&
            validate.hasBbox(x)
        );
    },

    isCRS: function ( x ) {
        // Validate a GeoJSON Coordinate Reference System.
        return (
            x != null &&
            (
                (
                    x.type === 'name' &&
                    x.properties != null &&
                    typeof x.properties.name === 'string' &&
                    x.properties.name.length > 0
                ) ||
                (
                    x.type === 'link' &&
                    validate.isLink(x.properties)
                )
            )
        );
    },

    hasCRS: function ( x ) {
        // Validate the CRS property of a GeoJSON object.
        return (
            x != null &&
            (
                typeof x.crs === 'undefined' ||
                x.crs === null ||
                validate.isCRS(x.crs)
            )
        )
    },

    isLink: function ( x ) {
        // Validate a GeoJSON Link.
        return (
            x != null &&
            typeof x.href === 'string' &&
            (
                typeof x.type === 'undefined' ||
                (
                    typeof x.type === 'string' &&
                    x.type.length > 0
                )
            )
        );
    },

    isBbox: function ( x ) {
        // Validate a GeoJSON Bounding Box.
        if (!Array.isArray(x)) return false;
        if (x.length%2 !== 0) return false;
        var pivot = x.length/2;
        for (var i=0; i < pivot; ++i) if (x[i] > x[i+pivot]) return false;
        return true;
    },

    hasBbox: function ( x ) {
        // Validate the bbox property of a GeoJSON object.
        return (
            x != null &&
            (
                typeof x.bbox === 'undefined' ||
                validate.isBbox(x.bbox)
            )
        );
    },

///////////////////////////////////////////////////////////////////// COMPARISON

    equalPositions: function ( a , b ) {
        // Compare two GeoJSON Positions for equality.
        return (
            validate.isPosition(a) && validate.isPosition(b) &&
            a.length == b.length &&
            a.every(
                function ( element , index ) {
                    return (a[index] == b[index]);
                }
            )
        );
    },

    containedPolygon: function ( inner , outer ) {
        // Determine whether one GeoJSON LinearRing contains another.
        return inner.every(
            function ( Position ) {
                return inside([Position[0], Position[1]], outer);
            }
        );
    }

};
