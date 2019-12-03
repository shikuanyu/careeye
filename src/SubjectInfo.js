import React, {Component} from 'react';
import { Row, Col, Descriptions } from 'antd';
import ProgressBox from './ProgressBox.js';
import Timer from './Timer.js';

class SubjectInfo extends Component{
  constructor(props){
    super(props);
    this.state={
      pose:null,
      timerOpt:null,
    }
  }
  componentWillReceiveProps(){
    let newPose = this.props.pose;
    if(newPose==null){
      this.setState({timerOpt:'stop'})
    }
    else if(newPose==this.state.pose){
      //do nothing
    }
    else{
      this.setState({timerOpt:'start'});
    }
  }

  render(){
    const mock = {
      standURL:"https://www.freeiconspng.com/uploads/business-man-with-clock-to-control-time-of-work-3.png",
      sitURL:"https://image.flaticon.com/icons/svg/274/274552.svg",
      sleepURL:"https://image.flaticon.com/icons/svg/55/55181.svg",
      lieURL:"https://image.flaticon.com/icons/svg/162/162999.svg",
      groundURL:"https://i.dlpng.com/static/png/6852377_preview.png",
      loadingURL:'https://media1.tenor.com/images/1c5800d6abb603cb52e8ab3bbd710af1/tenor.gif?itemid=14907829',
    }
    let {lan,progress,pose} = this.props;
    return (
      <div>
        <Row type="flex" align="middle" gutter={0}>
          <Col span={3}>
            <img src={pose==='stand'?mock.standURL:
              (pose==='sit'?mock.sitURL:
                (pose==='lie'?mock.lieURL:mock.loadingURL))
          } alt="posture-img"/>
          </Col>
          <Col span={5}>
            <Descriptions title={lan=='en'?"Subject Info":'被测人信息'} column={1} size="small">
              <Descriptions.Items label={lan=='en'?"Posture":'动作'}>{pose}</Descriptions.Items>
              <Descriptions.Items label={lan=='en'?"Duration":'时长'}>
                <Timer opt={this.state.timerOpt} />
              </Descriptions.Items>

            </Descriptions>
          </Col>
          <Col style={{textAlign:'center'}} span={15}>
            <ProgressBox lan={lan} progress={progress} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default SubjectInfo
