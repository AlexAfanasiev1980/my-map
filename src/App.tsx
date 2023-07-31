import React from 'react';
import './App.css';
import Coordinates from "./components/coordinates/Coordinates";
import Map from "./components/map/Map";
import { Col, Row } from "antd";

function App(): JSX.Element {

  return (
      <div>
        <Row>
          <Col span={8}>
            <Coordinates />
          </Col>
          <Col span={16}>
            <Map />
          </Col>
        </Row>
      </div>
  );
}

export default App;
