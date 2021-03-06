import { Row, Col, Descriptions, Select } from 'antd';
import React, { Component } from 'react';

const { Option } = Select;

class CameraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            time: new Date(),
        });
    }

    render() {
        const { movement, people_count, deviceNames, connection } = this.props.info;
        const lan = this.props.lan;
        const options = [];
        if (Array.isArray(deviceNames)) {
            deviceNames.map((x, i) =>
                options.push(
                    <Option key={i} index={i} value={x}>
                        {x}
                    </Option>,
                ),
            );
        }

        return (
            <div>
                <Row type="flex" justify="space-between" align="middle">
                    <Col xs={24} sm={10} md={10} lg={8} xl={7}>
                        <Descriptions size={'small'} column={1}>
                            <Descriptions.Item
                                label={lan === 'en' ? 'Movement Detection' : '运动检测'}
                            >
                                {movement === 'static'
                                    ? lan === 'en'
                                        ? 'static'
                                        : '静止'
                                    : movement === 'fretting'
                                    ? lan === 'en'
                                        ? 'fretting'
                                        : '微动'
                                    : movement === 'moving'
                                    ? lan === 'en'
                                        ? 'moving'
                                        : '移动'
                                    : '--'}
                            </Descriptions.Item>
                            <Descriptions.Item label={lan === 'en' ? 'Number of People' : '人数'}>
                                {people_count}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col md={4} lg={10} xl={12} />
                    <Col xs={24} sm={12} md={10} lg={6} xl={5}>
                        <Descriptions size={'small'} column={1}>
                            <Descriptions.Item label={lan === 'en' ? 'Device Name' : '设备名'}>
                                <Select
                                    dropdownMatchSelectWidth={false}
                                    defaultValue={'--'}
                                    size={'small'}
                                    onChange={this.props.handleDeviceChange}
                                    loading={!connection}
                                >
                                    {options}
                                </Select>
                            </Descriptions.Item>
                            <Descriptions.Item label={lan === 'en' ? 'Time' : '时间'}>
                                {this.state.time.toLocaleString(lan === 'en' ? 'en-US' : 'zh-CN')}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CameraInfo;
