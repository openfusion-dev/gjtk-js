var inside = require('point-in-polygon');
var URI = require('uri-js');

var GeoJSON = module.exports = {


///////////////////////////////////////////////////////////////////// VALIDATION
    
    
    isGeoJSON: function ( x ) {
        // Validate a GeoJSON object.
        return (
            GeoJSON.isGeometry(x) ||
            GeoJSON.isFeature(x)  ||
            GeoJSON.isFeatureCollection(x)
        );
    },
    
    
    isGeometry: function ( x ) {
        // Validate a GeoJSON Geometry.
        return (
            GeoJSON.isPoint(x) ||
            GeoJSON.isMultiPoint(x) ||
            GeoJSON.isLineString(x) ||
            GeoJSON.isMultiLineString(x) ||
            GeoJSON.isPolygon(x) ||
            GeoJSON.isMultiPolygon(x) ||
            GeoJSON.isGeometryCollection(x)
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


    isPointPosition: function ( x ) {
        // Validate the coordinates of a GeoJSON Point.
        return GeoJSON.isPosition(x);
    },
    
    
    isMultiPointPosition: function ( x ) {
        // Validate the coordinates of a GeoJSON MultiPoint.
        return (
            Array.isArray(x) &&
            x.every(GeoJSON.isPosition)
        );
    },
    
    
    isLineStringPosition: function ( x ) {
        // Validate the coordinates of a GeoJSON LineString.
        return (
            Array.isArray(x) &&
            x.length > 1 &&
            GeoJSON.isMultiPointPosition(x)
        );
    },
    
    
    isLinearRingPosition: function ( x ) {
        // Validate the coordinates of a GeoJSON LinearRing.
        return (
            Array.isArray(x) &&
            x.length > 3 &&
            GeoJSON.isLineStringPosition(x) &&
            GeoJSON.equalPositions(x[0],x[x.length-1])
        );
    },
    
    
    isMultiLineStringPosition: function ( x ) {
        // Validate the coordinates of a GeoJSON MultiLineString.
        return (
            Array.isArray(x) &&
            x.every(GeoJSON.isLineStringPosition)
        );
    },
    
    
    isPolygonPosition: function ( x ) {
        // Validate the coordinates of a GeoJSON Polygon.
        return (
            Array.isArray(x) &&
            x.every(GeoJSON.isLinearRingPosition) &&
            x.every(
                function ( LinearRingCoordinates , i , PolygonCoordinates ) {
                    if (i == 0) return true;
                    else return GeoJSON.containedPolygon(
                        LinearRingCoordinates,
                        PolygonCoordinates[0]
                    );
                }
            )
        );
    },
    
    
    isMultiPolygonCoordinates: function ( x ) {
        // Validate the coordinates of a GeoJSON MultiPolygon.
        return (
            Array.isArray(x) &&
            x.every(GeoJSON.isPolygonPosition)
        );
    },
    
    
    isPoint: function ( x ) {
        // Validate a GeoJSON Point.
        return (
            x != null &&
            x.type === 'Point' &&
            GeoJSON.isPointPosition(x.coordinates) &&
            GeoJSON.validCRS(x) &&
            GeoJSON.validBbox(x)
        );
    },
    
    
    isMultiPoint: function ( x ) {
        // Validate a GeoJSON MultiPoint.
        return (
            x != null &&
            x.type === 'MultiPoint' &&
            GeoJSON.isMultiPointPosition(x.coordinates) &&
            GeoJSON.validCRS(x) &&
            GeoJSON.validBbox(x)
        );
    },
    
    
    isLineString: function ( x ) {
        // Validate a GeoJSON LineString.
        return (
            x != null &&
            x.type === 'LineString' &&
            GeoJSON.isLineStringPosition(x.coordinates) &&
            GeoJSON.validCRS(x) &&
            GeoJSON.validBbox(x)
        );
    },
    
    
    isMultiLineString: function ( x ) {
        // Validate a GeoJSON MultiLineString.
        return (
            x != null &&
            x.type === 'MultiLineString' &&
            GeoJSON.isMultiLineStringPosition(x.coordinates) &&
            GeoJSON.validCRS(x) &&
            GeoJSON.validBbox(x)
        );
    },
    
    
    isPolygon: function ( x ) {
        // Validate a GeoJSON Polygon.
        return (
            x != null &&
            x.type === 'Polygon' &&
            GeoJSON.isPolygonPosition(x.coordinates) &&
            GeoJSON.validCRS(x) &&
            GeoJSON.validBbox(x)
        );
    },
    
    
    isMultiPolygon: function ( x ) {
        // Validate a GeoJSON MultiPolygon.
        return (
            x != null &&
            x.type === 'MultiPolygon' &&
            GeoJSON.isMultiPolygonCoordinates(x.coordinates) &&
            GeoJSON.validCRS(x) &&
            GeoJSON.validBbox(x)
        );
    },
    
    
    isGeometryCollection: function ( x ) {
        // Validate a GeoJSON GeometryCollection.
        return (
            x != null &&
            x.type === 'GeometryCollection' &&
            Array.isArray(x.geometries) &&
            x.geometries.every(GeoJSON.isGeometry) &&
            GeoJSON.validCRS(x) &&
            GeoJSON.validBbox(x)
        );
    },
    
    
    isFeature: function ( x ) {
        // Validate a GeoJSON Feature.
        return (
            x != null &&
            x.type === 'Feature' &&
            typeof x.properties === 'object' &&
            GeoJSON.validCRS(x) &&
            GeoJSON.validBbox(x) &&
            (
                x.geometry === null ||
                GeoJSON.isGeometry(x.geometry)
            )
        );
    },
    
    
    isFeatureCollection: function ( x ) {
        // Validate a GeoJSON FeatureCollection.
        return (
            x != null &&
            x.type === 'FeatureCollection' &&
            Array.isArray(x.features) &&
            x.features.every(GeoJSON.isFeature) &&
            GeoJSON.validCRS(x) &&
            GeoJSON.validBbox(x)
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
                    GeoJSON.isLink(x.properties)
                )
            )
        );
    },
    
    
    validCRS: function ( x ) {
        // Validate the CRS property of a GeoJSON object.
        return (
            x != null &&
            (
                typeof x.crs === 'undefined' ||
                x.crs === null ||
                GeoJSON.isCRS(x.crs)
            )
        )
    },


    isBbox: function ( x ) {
        throw 'Not Implemented'
    },
    
    
    validBbox: function ( x ) {
        // Validate the bbox property of a GeoJSON object.
        return (
            x != null &&
            (
                typeof x.bbox === 'undefined' ||
                (
                    Array.isArray(x.bbox) &&
                    x.bbox.length%2 === 0 &&
                    GeoJSON.isBbox()
                )
            )
        );
    },
    
    
    isLink: function ( x ) {
        // Validate a GeoJSON Link.
        try {
            return (
                x != null &&
                x.properties != null &&
                typeof x.properties.href === 'string' &&
                URI.parse(x.properties.href) &&
                (
                    typeof x.properties.type === 'undefined' ||
                    (
                        typeof x.properties.type === 'string' &&
                        x.properties.type.length > 0
                    )
                )
            );
        }
        catch (e) {
            return false;
        }
    },
    
    
//////////////////////////////////////////////////////////////////////// UTILITY
    
    
    equalPositions: function ( a , b ) {
        // Compare two GeoJSON Positions for equality.
        return (
            GeoJSON.isPosition(a) && GeoJSON.isPosition(b) &&
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
                return inside(Position,outer);
            }
        );
    },
    
    
    Point: function ( latitude , longitude , altitude ) {
        // Create a valid GeoJSON Point geometry.
        var Point = null;
        if (typeof longitude === 'number' && typeof latitude === 'number') {
            Point = {
                type: 'Point',
                coordinates: [longitude,latitude]
            };
            if (typeof altitude === 'number') Point.coordinates.push(altitude);
        }
        return Point;
    },
    
    
    Feature: function ( Geometry , properties ) {
        // Create a valid GeoJSON Feature.
        var Feature = {
            type: 'Feature',
            geometry: null,
            properties: (typeof properties === 'object') ? properties : {}
        };
        if (GeoJSON.isGeometry(Geometry)) Feature.geometry = Geometry;
        return Feature;
    },
    
    
    FeatureCollection: function ( Features ) {
        // Create a valid GeoJSON FeatureCollection.
        var FeatureCollection = {
            type: 'FeatureCollection',
            features: []
        };
        if (GeoJSON.isFeature(Features)) {
            FeatureCollection.features.push(Features);
        }
        else if (Array.isArray(Features)) Features.forEach(
            function ( Feature ) {
                if (GeoJSON.isFeature(Feature)) {
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
        if (GeoJSON.isGeometry(Geometries)) {
            GeometryCollection.geometries.push(Geometries);
        }
        else if (Array.isArray(Geometries)) Geometries.forEach(
            function ( Geometry ) {
                if (GeoJSON.isGeometry(Geometry)) {
                    GeometryCollection.geometries.push(Geometry);
                }
            }
        );
        return GeometryCollection;
    },
    
    
    positionsOf: function ( geojson ) {
        // Find all the Positions in a valid GeoJSON object.
        var positions = [];
        var extractLineStringPositions = function ( LineStringCoordinates ) {
            LineStringCoordinates.forEach(
                function ( Position ) {
                    positions.push(Position);
                }
            );
        };
        var extractPolygonPositions = function ( PolygonCoordinates ) {
            PolygonCoordinates.forEach(extractLineStringPositions);
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
                    GeoJSON.positionsOf(geojson.geometries)
                );
                break;
            case 'Feature':
                extractLineStringPositions(
                    GeoJSON.positionsOf(geojson.geometry)
                );
                break;
            case 'FeatureCollection':
                geojson.features.forEach(
                    function ( Feature ) {
                        extractLineStringPositions(
                            GeoJSON.positionsOf(Feature.geometry)
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
                        GeoJSON.featuresOf(Feature).forEach(
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
            GeoJSON.geometriesOf(Feature.geometry).forEach(
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
                        GeoJSON.geometriesOf(Geometry).forEach(
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
    
    
    isPointCoordinates: function ( x ) {
        // DEPRECATED: Use isPointPosition.
        return GeoJSON.isPointPosition(x);
    },
    
    
    isMultiPointCoordinates: function ( x ) {
        // DEPRECATED: Use isMultiPointPosition.
        return GeoJSON.isMultiPointPosition(x);
    },
    
    
    isLineStringCoordinates: function ( x ) {
        // DEPRECATED: Use isLineStringPosition.
        return GeoJSON.isLineStringPosition(x);
    },
    
    
    isLinearRingCoordinates: function ( x ) {
        // DEPRECATED: Use isLinearRingPosition.
        return GeoJSON.isLinearRingPosition(x);
    },


    isMultiLineStringCoordinates: function ( x ) {
        // DEPRECATED: Use isMultiLineStringPosition.
        return GeoJSON.isMultiLineStringPosition(x);
    },


    isPolygonCoordinates: function ( x ) {
        // DEPRECATED: Use isPolygonPosition.
        return GeoJSON.isPolygonPosition(x);
    }
    
    
};
