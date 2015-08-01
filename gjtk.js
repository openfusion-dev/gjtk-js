var inside = require('point-in-polygon');
var URI = require('uri-js');

var gjtk = module.exports = {


///////////////////////////////////////////////////////////////////// VALIDATION


    isGeoJSON: function ( x ) {
        // Validate a GeoJSON object.
        return (
            gjtk.isGeometry(x) ||
            gjtk.isFeature(x) ||
            gjtk.isFeatureCollection(x)
        );
    },


    isGeometry: function ( x ) {
        // Validate a GeoJSON Geometry.
        return (
            gjtk.isPoint(x) ||
            gjtk.isMultiPoint(x) ||
            gjtk.isLineString(x) ||
            gjtk.isMultiLineString(x) ||
            gjtk.isPolygon(x) ||
            gjtk.isMultiPolygon(x) ||
            gjtk.isGeometryCollection(x)
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
        return gjtk.isPosition(x);
    },


    isMultiPointCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON MultiPoint.
        return (
            Array.isArray(x) &&
            x.every(gjtk.isPosition)
        );
    },


    isLineStringCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON LineString.
        return (
            Array.isArray(x) &&
            x.length > 1 &&
            gjtk.isMultiPointCoordinates(x)
        );
    },


    isLinearRingCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON LinearRing.
        return (
            Array.isArray(x) &&
            x.length > 3 &&
            gjtk.isLineStringCoordinates(x) &&
            gjtk.equalPositions(x[0],x[x.length-1])
        );
    },


    isMultiLineStringCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON MultiLineString.
        return (
            Array.isArray(x) &&
            x.every(gjtk.isLineStringCoordinates)
        );
    },


    isPolygonCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON Polygon.
        return (
            Array.isArray(x) &&
            x.every(gjtk.isLinearRingCoordinates) &&
            x.every(
                function ( LinearRingPosition , i , PolygonPosition ) {
                    if (i == 0) return true;
                    else return gjtk.containedPolygon(
                        LinearRingPosition,
                        PolygonPosition[0]
                    );
                }
            )
        );
    },


    isMultiPolygonCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON MultiPolygon.
        return (
            Array.isArray(x) &&
            x.every(gjtk.isPolygonCoordinates)
        );
    },


    isPoint: function ( x ) {
        // Validate a GeoJSON Point.
        return (
            x != null &&
            x.type === 'Point' &&
            gjtk.isPointCoordinates(x.coordinates) &&
            gjtk.hasCRS(x) &&
            gjtk.hasBbox(x)
        );
    },


    isMultiPoint: function ( x ) {
        // Validate a GeoJSON MultiPoint.
        return (
            x != null &&
            x.type === 'MultiPoint' &&
            gjtk.isMultiPointCoordinates(x.coordinates) &&
            gjtk.hasCRS(x) &&
            gjtk.hasBbox(x)
        );
    },


    isLineString: function ( x ) {
        // Validate a GeoJSON LineString.
        return (
            x != null &&
            x.type === 'LineString' &&
            gjtk.isLineStringCoordinates(x.coordinates) &&
            gjtk.hasCRS(x) &&
            gjtk.hasBbox(x)
        );
    },


    isMultiLineString: function ( x ) {
        // Validate a GeoJSON MultiLineString.
        return (
            x != null &&
            x.type === 'MultiLineString' &&
            gjtk.isMultiLineStringCoordinates(x.coordinates) &&
            gjtk.hasCRS(x) &&
            gjtk.hasBbox(x)
        );
    },


    isPolygon: function ( x ) {
        // Validate a GeoJSON Polygon.
        return (
            x != null &&
            x.type === 'Polygon' &&
            gjtk.isPolygonCoordinates(x.coordinates) &&
            gjtk.hasCRS(x) &&
            gjtk.hasBbox(x)
        );
    },


    isMultiPolygon: function ( x ) {
        // Validate a GeoJSON MultiPolygon.
        return (
            x != null &&
            x.type === 'MultiPolygon' &&
            gjtk.isMultiPolygonCoordinates(x.coordinates) &&
            gjtk.hasCRS(x) &&
            gjtk.hasBbox(x)
        );
    },


    isGeometryCollection: function ( x ) {
        // Validate a GeoJSON GeometryCollection.
        return (
            x != null &&
            x.type === 'GeometryCollection' &&
            Array.isArray(x.geometries) &&
            x.geometries.every(gjtk.isGeometry) &&
            gjtk.hasCRS(x) &&
            gjtk.hasBbox(x)
        );
    },


    isFeature: function ( x ) {
        // Validate a GeoJSON Feature.
        return (
            x != null &&
            x.type === 'Feature' &&
            typeof x.properties === 'object' &&
            gjtk.hasCRS(x) &&
            gjtk.hasBbox(x) &&
            (
                x.geometry === null ||
                gjtk.isGeometry(x.geometry)
            )
        );
    },


    isFeatureCollection: function ( x ) {
        // Validate a GeoJSON FeatureCollection.
        return (
            x != null &&
            x.type === 'FeatureCollection' &&
            Array.isArray(x.features) &&
            x.features.every(gjtk.isFeature) &&
            gjtk.hasCRS(x) &&
            gjtk.hasBbox(x)
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
                    gjtk.isLink(x.properties)
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
                gjtk.isCRS(x.crs)
            )
        )
    },


    isLink: function ( x ) {
        // Validate a GeoJSON Link.
        try {
            return (
                x != null &&
                typeof x.href === 'string' &&
                URI.parse(x.href) &&
                (
                    typeof x.type === 'undefined' ||
                    (
                        typeof x.type === 'string' &&
                        x.type.length > 0
                    )
                )
            );
        }
        catch (e) {
            return false;
        }
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
                gjtk.isBbox(x.bbox)
            )
        );
    },


///////////////////////////////////////////////////////////////////// COMPARISON


    equalPositions: function ( a , b ) {
        // Compare two GeoJSON Positions for equality.
        return (
            gjtk.isPosition(a) && gjtk.isPosition(b) &&
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
    },


/////////////////////////////////////////////////////////////////////// TEMPLATE


    Point: function ( Position ) {
        // Create a valid GeoJSON Point geometry.
        if (!gjtk.isPosition(Position)) throw Error('Invalid Position');
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
        if (gjtk.isGeometry(Geometry)) Feature.geometry = Geometry;
        return Feature;
    },


    FeatureCollection: function ( Features ) {
        // Create a valid GeoJSON FeatureCollection.
        var FeatureCollection = {
            type: 'FeatureCollection',
            features: []
        };
        if (gjtk.isFeature(Features)) {
            FeatureCollection.features.push(Features);
        }
        else if (Array.isArray(Features)) Features.forEach(
            function ( Feature ) {
                if (gjtk.isFeature(Feature)) {
                    FeatureCollection.features.push(Feature);
                }
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
        if (gjtk.isGeometry(Geometries)) {
            GeometryCollection.geometries.push(Geometries);
        }
        else if (Array.isArray(Geometries)) Geometries.forEach(
            function ( Geometry ) {
                if (gjtk.isGeometry(Geometry)) {
                    GeometryCollection.geometries.push(Geometry);
                }
            }
        );
        return GeometryCollection;
    },


///////////////////////////////////////////////////////////////////// EXTRACTION


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
                    gjtk.positionsOf(geojson.geometries)
                );
                break;
            case 'Feature':
                extractLineStringPositions(
                    gjtk.positionsOf(geojson.geometry)
                );
                break;
            case 'FeatureCollection':
                geojson.features.forEach(
                    function ( Feature ) {
                        extractLineStringPositions(
                            gjtk.positionsOf(Feature.geometry)
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
                        gjtk.featuresOf(Feature).forEach(
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
            gjtk.geometriesOf(Feature.geometry).forEach(
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
                        gjtk.geometriesOf(Geometry).forEach(
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


///////////////////////////////////////////////////////////////////// DEPRECATED


    validCRS: function ( x ) {
        // DEPRECATED: Use hasCRS instead.
        return gjtk.hasCRS(x);
    },
    
    
    validBbox: function ( x ) {
        // DEPRECATED: Use hasBbox instead.
        return gjtk.hasBbox(x);
    }


};
