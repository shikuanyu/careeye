import { Row, Col, Descriptions } from 'antd';
import React, { Component } from 'react';


class CameraInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: new Date()
    }
  }

  componentDidMount(){
    this.timerID = setInterval(()=>this.tick(),1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
      time: new Date()
    })
  }

  render(){
    const mock = {
      tester:'Paul',
      movement:'passive',
      people_count:1,
      device_name:'UTDMachine-001'
    };
    return(
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col span={10} >
            <Descriptions size={"small"} column={1}>
              <Descriptions.Items label="Current Tester" >{mock.tester}</Descriptions.Items>
              <Descriptions.Items label="Movement Detection">{mock.movement}</Descriptions.Items>
              <Descriptions.Items label="Number of People">{mock.people_count}</Descriptions.Items>
            </Descriptions>
          </Col>
          <Col span={5} offset={9} >
            <Descriptions style={{textAlign:'right'}} column={1}>
            <Descriptions.Items label="Device Name">{mock.device_name}</Descriptions.Items>
            <Descriptions.Items label="Time">{this.state.time.toLocaleTimeString()}</Descriptions.Items>
            </Descriptions>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CameraInfo;
