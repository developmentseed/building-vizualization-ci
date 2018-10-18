import React from 'react';
import ReactDOM from 'react-dom';

import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      zoom: 12
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
      this.map.addSource(layer.id, {
        type: 'geojson',
        data: layer.source
      });
      this.map.addLayer({
        'id': layer.id,
        'type': 'fill',
        'source': layer.id,
        'layout': {},
        'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.8
        }
      });
      if (!layer.active) {
        this.map.setLayoutProperty(layer.id, 'visibility', 'none');
      }
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
      this.map.setLayoutProperty(vectorLayer.id, 'visibility', vectorLayer.active ? 'visible' : 'none');
    }

    //Popup

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
