import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { vectorLayers } from './../config';
import { selectVectorLayer } from '../actions/index';


class ConnectedMenuVectorLayers extends Component {
  constructor(props: Props) {
    super(props);
    this.state = vectorLayers;
  }

  layerSelectedActive = vectorLayer => {
    vectorLayer.active = true;
    // this.updateMenuLayers(vectorLayer)
    const layersToUpdate = {};
    layersToUpdate[vectorLayer.id] = vectorLayer;
    this.setState(Object.assign(this.state, layersToUpdate));
    this.props.selectVectorLayer(vectorLayer);
  };

  layerSelectedDeactivate = vectorLayer => {
    vectorLayer.active = false;
    // this.updateMenuLayers(vectorLayer)
    const layersToUpdate = {};
    layersToUpdate[vectorLayer.id] = vectorLayer;
    this.setState(Object.assign(this.state, layersToUpdate));
    this.props.selectVectorLayer(vectorLayer);
  };

  renderLayerMenu = () => {
    const menuList = () =>
      vectorLayers.map(
        vectorLayer =>
          vectorLayer.active ? (
            <a href="#" key={vectorLayer.id} className="active" onClick={() => this.layerSelectedDeactivate(vectorLayer)}>
              {' '}
              {vectorLayer.name}
            </a>
          ) : (
              <a href="#" key={vectorLayer.id} onClick={() => this.layerSelectedActive(vectorLayer)}>
                {' '}
                {vectorLayer.name}
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
    selectVectorLayer: vectorLayerSelected => dispatch(selectVectorLayer(vectorLayerSelected))
  };
};


const MenuVectorLayers = connect(
  null,
  mapDispatchToProps
)(ConnectedMenuVectorLayers);
export default MenuVectorLayers;
