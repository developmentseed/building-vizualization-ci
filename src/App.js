import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';

import Header from './components/Header'
import Map from './components/Map';
import RasterLayers from './components/RasterLayers';
import VectorLayers from './components/VectorLayers'
import './App.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      feature: null
    };
  }
  render() {
    return (
      <Grid fluid>
        <Row>
          <Header></Header>
        </Row>
        <Row>
          <Col xs={12} md={2}>
            <ListSubheader>Vector Layers</ListSubheader>
            <Divider />
            <VectorLayers></VectorLayers>
            <ListSubheader>Raster Layers</ListSubheader>
            <Divider />
            <RasterLayers></RasterLayers>
          </Col>
          <Col xs={12} md={10}>
            <div className='mapContent'>
              <Map></Map>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
