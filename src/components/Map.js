import React from 'react';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import * as turf from '@turf/turf'
import _ from 'underscore';
import { mapConfig } from './../config';
import { rasterLayers, vectorLayers } from './../config';
mapboxgl.accessToken = mapConfig.accessToken;

class ConnectedMap extends React.Component {
  map;
  constructor(props: Props) {
    super(props);
    this.state = {
      lng: 44.4237,
      lat: 33.3146,
      zoom: 11
    };
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    //Display map
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: mapConfig.style,
      center: [lng, lat],
      zoom
    });

    //Load the data
    this.map.on('load', () => {
      this.loadRasterLayers();
      this.loadVectorLayers();
    });
  }

  loadVectorLayers = () => {
    for (let i = 0; i < vectorLayers.length; i++) {
      const layer = vectorLayers[i];
      const that = this;
      axios.get(layer.source)
        .then(function (response) {
          that.map.addSource(layer.id, {
            type: 'geojson',
            data: response.data
          });
          that.map.addLayer({
            'id': layer.id,
            'type': 'fill',
            'source': layer.id,
            'layout': {},
            'paint': {
              'fill-color': '#f9f024',
              'fill-opacity': 0.1
            }
          });
          that.map.addLayer({
            "id": layer.id + '-l',
            "type": "line",
            "source": layer.id,
            "layout": {
              "line-join": "round",
              "line-cap": "round"
            },
            "paint": {
              "line-color": "#f9f024",
              "line-width": 1
            }
          });
          if (!layer.active) {
            that.map.setLayoutProperty(layer.id, 'visibility', 'none');
            that.map.setLayoutProperty(layer.id + '-l', 'visibility', 'none');
          }
        });
    }
  }

  loadRasterLayers = () => {
    for (let i = 0; i < rasterLayers.length; i++) {
      const layer = rasterLayers[i];
      this.map.addLayer(
        {
          id: layer.id,
          type: 'raster',
          source: {
            type: 'raster',
            tiles: [layer.source],
            tileSize: 256
          },
          paint: {}
        }
      );
      if (!layer.active) {
        this.map.setLayoutProperty(layer.id, 'visibility', 'none');
      }
    }
  }

  componentDidUpdate() {
    const { rasterLayer, vectorLayer } = this.props;
    if (rasterLayer && rasterLayer.id) {
      this.map.setLayoutProperty(rasterLayer.id, 'visibility', rasterLayer.active ? 'visible' : 'none');
    }
    if (vectorLayer && vectorLayer.id) {
      var bbox = turf.bbox(this.map.getSource(vectorLayer.id)._options.data);
      this.map.fitBounds(bbox);
      // this.map.setLayoutProperty(vectorLayer.id, 'visibility', vectorLayer.active ? 'visible' : 'none');
      // this.map.setLayoutProperty(vectorLayer.id + '-l', 'visibility', vectorLayer.active ? 'visible' : 'none');

    }
  }
  render() {
    return <div ref={el => (this.mapContainer = el)} className="mapContent" />;
  }
}

const mapStateToProps = state => {
  return {
    rasterLayer: state.rasterLayer,
    vectorLayer: state.vectorLayer
  };
};

const Map = connect(mapStateToProps)(ConnectedMap);

Map.propTypes = {
  rasterLayer: PropTypes.object,
  vectorLayer: PropTypes.object
};

export default Map;
