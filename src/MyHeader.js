import React, {Component} from 'react';
import {Row,Col} from 'antd';

class MyHeader extends Component {

  render(){
    const mock = {
      logoURL:'http://utdimensions.com/LOGO256-1.d88fd1a0.png',
    }
    return(
      <div className="header">
        <Row type="flex" align="middle" gutter={[10,50]}>
          <Col span={1} offset={1}>
            <img src={mock.logoURL} alt="logo"/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MyHeader;
