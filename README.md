# GeoJSON ToolKit

`gjtk` is a library for working with [GeoJSON](http://geojson.org/).

[![Build Status](https://img.shields.io/travis/com/openfusion-dev/gjtk-js.svg)](https://travis-ci.com/openfusion-dev/gjtk-js)
[![Dependency Status](https://img.shields.io/david/openfusion-dev/gjtk-js.svg)](https://david-dm.org/openfusion-dev/gjtk-js)
[![NPM Version](https://img.shields.io/npm/v/gjtk.svg)](https://www.npmjs.com/package/gjtk)

## Installation
`gjtk` is available on [npm](//www.npmjs.com/package/gjtk).
``` sh
npm install gjtk
```

## Usage
``` js
var gjtk = require('gjtk');
```

## Validation Methods

All validation methods take a single argument.

### isGeoJSON
returns `true` when passed a valid [GeoJSON object](http://geojson.org/geojson-spec.html#geojson-objects), otherwise `false`

> GeoJSON always consists of a single object. This object (referred to as the GeoJSON object [above]) represents a geometry, feature, or collection of features.

### isGeometry
returns `true` when passed a valid [GeoJSON Geometry](http://geojson.org/geojson-spec.html#geometry-objects), otherwise `false`

> A geometry is a GeoJSON object where the type member's value is one of the following strings: "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", or "GeometryCollection".

### isPosition
returns `true` when passed a valid [GeoJSON Position](http://geojson.org/geojson-spec.html#positions), otherwise `false`

> A position is represented by an array of numbers. There must be at least two elements, and may be more. The order of elements must follow x, y, z order (easting, northing, altitude for coordinates in a projected coordinate reference system, or longitude, latitude, altitude for coordinates in a geographic coordinate reference system). Any number of additional elements are allowed -- interpretation and meaning of additional elements is beyond the scope of this specification.

### isPointCoordinates
returns `true` when passed valid [GeoJSON Point](http://geojson.org/geojson-spec.html#point) coordinates, otherwise `false`

#### example
``` json
[100.0, 0.0]
```

### isMultiPointCoordinates
returns `true` when passed valid [GeoJSON MultiPoint](http://geojson.org/geojson-spec.html#multipoint) coordinates, otherwise `false`

#### example
``` json
[ [100.0, 0.0], [101.0, 1.0], [102.0, 2.0] ]
```

### isLineStringCoordinates
returns `true` when passed valid [GeoJSON LineString](http://geojson.org/geojson-spec.html#linestring) coordinates, otherwise `false`

#### example
``` json
[ [100.0, 0.0], [101.0, 1.0] ]
```

### isLinearRingCoordinates
returns `true` when passed valid [GeoJSON LinearRing](http://geojson.org/geojson-spec.html#linestring) coordinates, otherwise `false`

> A LinearRing is closed LineString with 4 or more positions. The first and last positions are equivalent (they represent equivalent points). Though a LinearRing is not explicitly represented as a GeoJSON geometry type, it is referred to in the Polygon geometry type definition.

#### example
``` json
[ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
```

### isMultiLineStringCoordinates
returns `true` when passed valid [GeoJSON MultiLineString](http://geojson.org/geojson-spec.html#multilinestring) coordinates, otherwise `false`

#### example
``` json
[
  [ [100.0, 0.0], [101.0, 1.0] ],
  [ [102.0, 2.0], [103.0, 3.0] ]
]
```

### isPolygonCoordinates
returns `true` when passed valid [GeoJSON Polygon](http://geojson.org/geojson-spec.html#polygon) coordinates, otherwise `false`

#### example
* 0 holes
``` json
[
  [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
]
```
* 1 hole
``` json
[
  [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
  [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
]
```
* etc.

### isMultiPolygonCoordinates
returns `true` when passed valid [GeoJSON MultiPolygon](http://geojson.org/geojson-spec.html#multipolygon) coordinates, otherwise `false`

#### example
``` json
[
  [
    [ [102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0] ]
  ],
  [
    [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
    [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
  ]
]
```

### isPoint
returns `true` when passed a valid [GeoJSON Point](http://geojson.org/geojson-spec.html#point), otherwise `false`

#### example
``` json
{ "type": "Point", "coordinates": [100.0, 0.0] }
```

### isMultiPoint
returns `true` when passed a valid [GeoJSON MultiPoint](http://geojson.org/geojson-spec.html#multipoint), otherwise `false`

#### example
``` json
{ "type": "MultiPoint", "coordinates": [ [100.0, 0.0], [101.0, 1.0] ] }
```

### isLineString
returns `true` when passed a valid [GeoJSON LineString](http://geojson.org/geojson-spec.html#linestring), otherwise `false`

#### example
``` json
{
  "type": "LineString",
  "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
}
```

### isMultiLineString
returns `true` when passed a valid [GeoJSON MultiLineString](http://geojson.org/geojson-spec.html#multilinestring), otherwise `false`

#### example
``` json
{
  "type": "MultiLineString",
  "coordinates": [
    [ [100.0, 0.0], [101.0, 1.0] ],
    [ [102.0, 2.0], [103.0, 3.0] ]
  ]
}
```

### isPolygon
returns `true` when passed a valid [GeoJSON Polygon](http://geojson.org/geojson-spec.html#polygon), otherwise `false`

#### example
* 0 holes
``` json
{
  "type": "Polygon",
  "coordinates": [
    [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
  ]
}
```
* 1 hole
``` json
{
  "type": "Polygon",
  "coordinates": [
    [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
    [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
  ]
}
```
* etc.

### isMultiPolygon
returns `true` when passed a valid [GeoJSON MultiPolygon](http://geojson.org/geojson-spec.html#multipolygon), otherwise `false`

#### example
``` json
{
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
}
```

### isGeometryCollection
returns `true` when passed a valid [GeoJSON Geometry Collection](http://geojson.org/geojson-spec.html#geometry-collection), otherwise `false`

#### example
``` json
{
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
}
```

### isFeature
returns `true` when passed a valid [GeoJSON Feature](http://geojson.org/geojson-spec.html#feature-objects), otherwise `false`

#### example
``` json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
```

### isFeatureCollection
returns `true` when passed a valid [GeoJSON Feature Collection](http://geojson.org/geojson-spec.html#feature-collection-objects), otherwise `false`

#### example
``` json
{
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
}
```

### isCRS
returns `true` when passed a valid [GeoJSON Coordinate Reference System](http://geojson.org/geojson-spec.html#coordinate-reference-system-objects), otherwise `false`

#### example
* [Named CRS](http://geojson.org/geojson-spec.html#named-crs)
``` json
{
  "type": "name",
  "properties": {
    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
  }
}
```
* [Linked CRS](http://geojson.org/geojson-spec.html#linked-crs)
``` json
{
  "type": "link", 
  "properties": {
    "href": "http://example.com/crs/42",
    "type": "proj4"
  }
}
```

### hasCRS
returns `true` when passed an object that validly specifies a [GeoJSON Coordinate Reference System](http://geojson.org/geojson-spec.html#coordinate-reference-system-objects), otherwise `false`

> The coordinate reference system (CRS) of a GeoJSON object is determined by its "crs" member (referred to as the CRS object below). If an object has no crs member, then its parent or grandparent object's crs member may be acquired. If no crs member can be so acquired, the default CRS shall apply to the GeoJSON object.

### isLink
returns `true` when passed a valid [GeoJSON Link](http://geojson.org/geojson-spec.html#link-objects), otherwise `false`

#### example
``` json
{
  "type": "link",
  "properties": {
    "href": "data.crs",
    "type": "ogcwkt"
  }
}
```

### isBbox (not implemented)
returns `true` when passed a valid [GeoJSON Bounding Box](http://geojson.org/geojson-spec.html#bounding-boxes), otherwise `false`

#### example
``` json
[-180.0, -90.0, 180.0, 90.0]
```

### hasBbox (partially implemented)
returns `true` when passed an object that validly specifies a [GeoJSON Bounding Box](http://geojson.org/geojson-spec.html#bounding-boxes), otherwise `false`

#### example
``` json
{
  "type": "Feature",
  "bbox": [-180.0, -90.0, 180.0, 90.0],
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [ [-180.0, 10.0], [20.0, 90.0], [180.0, -5.0], [-30.0, -90.0] ]
    ]
  }
}
```

## Utility Methods

### Comparison

#### equalPositions(_position1_, _position2_)
returns `true` when all parameters are identical [GeoJSON Positions](http://geojson.org/geojson-spec.html#positions), otherwise `false`

#### containedPolygon(_innerLinearRing_, _outerLinearRing_)
returns `true` when one [GeoJSON LinearRing](http://geojson.org/geojson-spec.html#linestring) contains another, otherwise `false`

### Templates

#### Point(_Position_)
returns a [GeoJSON Point](http://geojson.org/geojson-spec.html#point) object

#### Feature(_Geometry_, _properties_)
returns a [GeoJSON Feature](http://geojson.org/geojson-spec.html#feature-objects) object

#### FeatureCollection(_Features_)
returns a [GeoJSON FeatureCollection](http://geojson.org/geojson-spec.html#feature-collection-objects) object

#### GeometryCollection(_Geometries_)
returns a [GeoJSON GeometryCollection](http://geojson.org/geojson-spec.html#geometry-collection) object

### Extraction

These methods all take a single argument: a valid [GeoJSON object](http://geojson.org/geojson-spec.html#geojson-objects).

#### positionsOf
returns all the Positions in a valid [GeoJSON object](http://geojson.org/geojson-spec.html#geojson-objects)

#### featuresOf
returns all the Features in a valid [GeoJSON object](http://geojson.org/geojson-spec.html#geojson-objects)

#### geometriesOf
returns all the Geometries in a valid [GeoJSON object](http://geojson.org/geojson-spec.html#geojson-objects)
