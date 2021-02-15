import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Row, Col } from 'antd';

import ColumnnSpan from './constants/ColumnSpan';
import Header from './components/Header';
import MainCard from './components/MainCard';
import ErrorModal from './components/ErrorModal';
import ColumnSpan from './constants/ColumnSpan';

import { ErrorModalContext, IErrorModalContextType } from './context/ErrorModalContext';

const App = () => {

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  let initValue: IErrorModalContextType = {
    showError: showErrorModal,
    setShowError: setShowErrorModal
  };

  return (
    <Layout className="layout">
      <Header />
      <ErrorModalContext.Provider value={initValue}>
        <Layout.Content className="main">
          <Row>
            <Col {...ColumnSpan.Secondary}></Col>
            <Col {...ColumnSpan.Primary}>
              <MainCard/>
            </Col>
            <Col {...ColumnSpan.Secondary}></Col>
          </Row>
          <ErrorModal />
        </Layout.Content>
        <Layout.Footer>
          &#169; 2021 - Lorena Šarkezi - MessagingDemo
        </Layout.Footer>
      </ErrorModalContext.Provider>

    </Layout>
  );
}

export default App;
