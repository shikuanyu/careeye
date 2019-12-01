import React from 'react';
import logo from './logo.svg';
import { Layout, Row, Col, Divider } from 'antd';
import CameraInfo from './CameraInfo';
import {Button} from 'antd';
import SubjectInfo from './SubjectInfo.js';
import IndexBox from './IndexBox.js';


const { Header, Footer, Content } = Layout;

function App() {
  const tsIcon = "https://images.unsplash.com/photo-1436473849883-bb3464c23e93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
  const mock ={
    logoURL:'http://utdimensions.com/LOGO256-1.d88fd1a0.png',
  }
  return (
    // <div className="App">
      // <header className="App-header">
      //   <img src={logo} className="App-logo" alt="logo" />
      //   <p>
      //     Edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <a
      //     className="App-link"
      //     href="https://reactjs.org"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Learn React
      //   </a>
      // </header
    // </div>
    <div style={{background: `url(${tsIcon}) no-repeat center center fixed`, backgroundSize:"cover",  height:"100vh", width:"100vw"}}>
      <Layout>
        <Header>
          <Row type="flex" align="middle">
            <Col span={1} offset={1}>
              <img src={mock.logoURL} alt="logo"/>
            </Col>
            <Col span={2} offset={20}>
              <Button type="primary">English</Button>
            </Col>
          </Row>
        </Header>
        <Content>
          <Row>
            <Col span={20} offset={2}>
              <CameraInfo />
              <Divider/>
              <SubjectInfo/>
              <Divider>Real Time Monitoring</Divider>
              <Row>
              <Col span={20} offset={0}>
              <IndexBox/>
              </Col>
              </Row>
            </Col>
          </Row>
        </Content>

        <Footer></Footer>
      </Layout>


    </div>

  );
}

export default App;
