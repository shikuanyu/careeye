import React, {Component} from 'react';
import { Row, Col, Progress } from 'antd';


class ProgressBox extends Component{

  render(){
    const mock = {
      progress: 50,
    }
    return(
      <div>
        <Row type="flex" justify="center">
          <Col span={8}>
            <h2>Detecting health indexes...</h2>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={18}>
            <Progress percent={mock.progress} status="active" strokeWidth={20}/>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={8}>
            <h3>Please stay still while detecting</h3>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProgressBox
