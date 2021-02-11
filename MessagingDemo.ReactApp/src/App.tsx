import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

import ColumnnSpan from './constants/ColumnSpan';
import Header from './components/Header';
import MainCard from './components/MainCard';
import { Layout, Row, Col } from 'antd';
import Column from 'antd/lib/table/Column';
import ColumnSpan from './constants/ColumnSpan';

function App() {
  return (
    <Layout className="layout">
      <Header/>
      <Layout.Content className="main">
        <Row>
          <Col {...ColumnSpan.Secondary}></Col>
          <Col {...ColumnSpan.Primary}>
            <MainCard></MainCard>
          </Col>
          <Col {...ColumnSpan.Secondary}></Col>
        </Row>

      </Layout.Content>
    </Layout>
  );
}

export default App;
