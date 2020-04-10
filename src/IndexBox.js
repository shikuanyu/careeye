import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Pulse from 'react-reveal/Pulse';

class IndexBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heartURL: '/resources/heart.svg',
            breathURL: '/resources/lung.png',
            heart: 0,
            breath: 0,
            heartPulse: 0,
            breathPulse: 0,
        };
    }
    componentWillReceiveProps(nextProps) {
        let { heart, breath } = nextProps;
        heart = heart === -1 ? 0 : heart;
        breath = breath === -1 ? 0 : breath;
        let heartPulse = 60000 / heart;
        let breathPulse = 60000 / breath;
        this.setState({
            heart,
            breath,
            heartPulse,
            breathPulse,
        });
    }

    render() {
        let { lan } = this.props;
        let { heart, breath, heartPulse, breathPulse } = this.state;
        return (
            <div>
                <Row type="flex" align="middle" justify="space-between">
                    <Col xs={24} sm={20} md={9}>
                        <Row type="flex" align="middle" gutter={[0, 80]}>
                            <Col span={7}>
                                <Pulse duration={heartPulse} spy={heartPulse} forever>
                                    <Pulse duration={heartPulse} spy={heartPulse} forever>
                                        <Pulse duration={heartPulse} spy={heartPulse} forever>
                                            <img src={this.state.heartURL} alt="heart-img" />
                                        </Pulse>
                                    </Pulse>
                                </Pulse>
                            </Col>
                            <Col span={15} offset={2}>
                                <h1>{heart + (lan === 'en' ? 'b/min' : '次/分钟')}</h1>
                            </Col>
                        </Row>
                        <Row type="flex" align="middle" gutter={[0, 40]}>
                            <Col span={7}>
                                <Pulse duration={breathPulse} spy={breathPulse} forever>
                                    <Pulse duration={breathPulse} spy={breathPulse} forever>
                                        <Pulse duration={breathPulse} spy={breathPulse} forever>
                                            <img src={this.state.breathURL} alt="breath-img" />
                                        </Pulse>
                                    </Pulse>
                                </Pulse>
                            </Col>
                            <Col span={15} offset={2}>
                                <h1>{breath + (lan === 'en' ? 'r/min' : '次/分钟')}</h1>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} md={15} className="text-right">
                        <img
                            src={
                                heart === 0
                                    ? '/resources/plain-line-green.png'
                                    : '/resources/ECG-green.png'
                            }
                            alt={'ecg img'}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default IndexBox;
