import React, {Component} from 'react';
import { Row, Col, Descriptions } from 'antd';
import ProgressBox from './ProgressBox.js';

class SubjectInfo extends Component{


  render(){
    const mock = {
      area:"Guest room 1",
      posture: "Standing",
      duration: 60.0,
      status:"Warning",
      detail:"Standing for too long",
      color:'red',
      standURL:"https://www.freeiconspng.com/uploads/business-man-with-clock-to-control-time-of-work-3.png",
      sitURL:"https://image.flaticon.com/icons/svg/274/274552.svg",
      sleepURL:"https://image.flaticon.com/icons/svg/55/55181.svg",
      lieURL:"https://image.flaticon.com/icons/svg/162/162999.svg",
      groundURL:"https://i.dlpng.com/static/png/6852377_preview.png"
    }
    return (
      <div>
        <Row type="flex" align="middle" gutter={30}>
          <Col span={3}>
            <img src={mock.standURL} alt="posture-img"/>
          </Col>
          <Col span={6}>
            <Descriptions title="Subject Info" column={1} size="small">
              <Descriptions.Items label="Detection Area">{mock.area}</Descriptions.Items>
              <Descriptions.Items label="Posture">{mock.posture}</Descriptions.Items>
              <Descriptions.Items label="Duration">{`${mock.duration}s`}</Descriptions.Items>
              <Descriptions.Items label="Status">
                <p><span style={{color:mock.color}}>{mock.status}</span>{`--${mock.detail}`}</p>
              </Descriptions.Items>
            </Descriptions>
          </Col>
          <Col span={15}>
            <ProgressBox />
          </Col>
        </Row>
      </div>
    )
  }
}

export default SubjectInfo
