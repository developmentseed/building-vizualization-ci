import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { rasterLayers } from './../config';
import { selectRasterLayer } from '../actions/index';


class ConnectedMenuRasterLayers extends Component {
  constructor(props: Props) {
    super(props);
    this.state = rasterLayers;
  }

  layerSelectedActive = rasterLayer => {
    rasterLayer.active = true;
    // this.updateMenuLayers(rasterLayer)
    const layersToUpdate = {};
    layersToUpdate[rasterLayer.id] = rasterLayer;
    this.setState(Object.assign(this.state, layersToUpdate));
    this.props.selectRasterLayer(rasterLayer);
  };

  layerSelectedDeactivate = rasterLayer => {
    rasterLayer.active = false;
    // this.updateMenuLayers(rasterLayer)
    const layersToUpdate = {};
    layersToUpdate[rasterLayer.id] = rasterLayer;
    this.setState(Object.assign(this.state, layersToUpdate));
    this.props.selectRasterLayer(rasterLayer);
  };

  renderLayerMenu = () => {
    const menuList = () =>
      rasterLayers.map(
        rasterLayer =>
          rasterLayer.active ? (
            <a href="#" key={rasterLayer.id} className="active" onClick={() => this.layerSelectedDeactivate(rasterLayer)}>
              {' '}
              {rasterLayer.name}
            </a>
          ) : (
              <a href="#" key={rasterLayer.id} onClick={() => this.layerSelectedActive(rasterLayer)}>
                {' '}
                {rasterLayer.name}
              </a>
            )
      );
    return <div>{menuList()}</div>;
  };

  render() {
    return <nav id="menu">{this.renderLayerMenu()}</nav>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectRasterLayer: rasterLayerSelected => dispatch(selectRasterLayer(rasterLayerSelected))
  };
};


const MenuRasterLayers = connect(
  null,
  mapDispatchToProps
)(ConnectedMenuRasterLayers);
export default MenuRasterLayers;
