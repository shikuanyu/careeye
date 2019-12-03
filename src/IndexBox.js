import React, {Component} from 'react';
import {Row, Col, Descriptions } from 'antd';
import Pulse from 'react-reveal/Pulse';
const plain_line= require('./plain-line.png');

class IndexBox extends Component{

  render(){
    const mock = {
      heartURL:"https://upload.wikimedia.org/wikipedia/commons/8/86/A_perfect_SVG_heart.svg",
      breathURL:'https://i.ya-webdesign.com/images/disease-drawing-lung-3.png',
      ECGURL:'https://media.giphy.com/media/abTqsmCYAgGzu/giphy.gif',
    };
    let {lan,heart,breath} = this.props;

    let heartPulse=(heart==null||heart==-1)?0:60000/heart;
    let breathPulse=(breath==null||breath==-1)?0:60000/breath;
    return(
      <div>
        <Row type="flex" align="middle" justify="center">
        <Col span={9}>
          <Row type="flex" align="middle" gutter={[10,80]} >
            <Col span={6}>
              <Pulse duration={heartPulse} forever>
              <Pulse duration={heartPulse} forever>
              <Pulse duration={heartPulse} forever>
                <img src={mock.heartURL} alt="heart-img"/>
              </Pulse>
              </Pulse>
              </Pulse>
            </Col>
            <Col span={6} offset={2}>
              <h1>{heart+(lan==='en'?'b/min':'次/分钟')}</h1>
            </Col>
          </Row>
          <Row type="flex" align="middle" gutter={[10,80]}>
            <Col span={6}>
              <Pulse duration={breathPulse} forever>
              <Pulse duration={breathPulse} forever>
              <Pulse duration={breathPulse} forever>
                <img src={mock.breathURL} alt="breath-img"/>
                </Pulse>
              </Pulse>
              </Pulse>
            </Col>
            <Col span={6} offset={2}>
              <h1>{breath+(lan==='en'?'r/min':'次/分钟')}</h1>
            </Col>
          </Row>
        </Col>
        <Col style={{textAlign:'center'}} span={14}>
            <img src={heart==0?plain_line:mock.ECGURL} alt={"ecg img"}/>
        </Col>
        </Row>
      </div>
    )
  }
}

export default IndexBox;
