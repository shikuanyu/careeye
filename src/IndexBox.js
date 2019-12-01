import React, {Component} from 'react';
import {Row, Col, Descriptions } from 'antd';
import Pulse from 'react-reveal/Pulse';

class IndexBox extends Component{

  render(){
    const mock = {
      heart:65,
      breath:13,
      heartURL:"https://upload.wikimedia.org/wikipedia/commons/8/86/A_perfect_SVG_heart.svg",
      breathURL:'https://i.ya-webdesign.com/images/disease-drawing-lung-3.png',
      ECGURL:'https://media.giphy.com/media/abTqsmCYAgGzu/giphy.gif',
    };
    return(
      <div>
        <Row type="flex" align="middle">
        <Col span={10}>
          <Row type="flex" align="middle" gutter={[10,80]} >
            <Col span={6}>
              <Pulse duration={500} forever>
              <Pulse duration={1000} forever>
              <Pulse duration={1500} forever>
                <img src={mock.heartURL} alt="heart-img"/>
              </Pulse>
              </Pulse>
              </Pulse>
            </Col>
            <Col span={2}>
              <h1>{`${mock.heart}b/min`}</h1>
            </Col>
          </Row>
          <Row type="flex" align="middle" gutter={[10,80]}>
            <Col span={6}>
              <Pulse duration={5000} forever>
              <Pulse duration={5000} forever>
              <Pulse duration={5000} forever>
                <img src={mock.breathURL} alt="breath-img"/>
                </Pulse>
              </Pulse>
              </Pulse>
            </Col>
            <Col span={2}>
              <h1>{`${mock.heart}b/min`}</h1>
            </Col>
          </Row>
        </Col>
        <Col span={14}>
            <img src={mock.ECGURL} alt={"ecg img"}/>
        </Col>
        </Row>
      </div>
    )
  }
}

export default IndexBox;
