import { Row, Col, Descriptions } from "antd";
import React, { Component } from "react";

class CameraInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: new Date()
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
			time: new Date()
		});
	}

	render() {
		// const mock = {
		//   tester:'Paul',
		//   movement:'passive',
		//   people_count:1,
		//   device_name:'UTDMachine-001'
		// };
		const { movement, people_count, device_name } = this.props.info;
		const lan = this.props.lan;
		return (
			<div>
				<Row type="flex" justify="center" align="middle">
					<Col span={10}>
						<Descriptions size={"small"} column={1}>
							<Descriptions.Items
								label={lan == "en" ? "Movement Detection" : "运动检测"}
							>
								{movement == "static"
									? (lan == "en"
										? "static"
										: "静止")
									: (movement == "fretting"
									? (lan == "en"
										? "fretting"
										: "微动")
									: (movement =='moving'
									? (lan == "en"
									? "moving"
									: "移动")
								  :'--'))}
							</Descriptions.Items>
							<Descriptions.Items
								label={lan == "en" ? "Number of People" : "人数"}
							>
								{people_count}
							</Descriptions.Items>
						</Descriptions>
					</Col>
					<Col span={5} offset={9}>
						<Descriptions style={{ textAlign: "right" }} column={1}>
							<Descriptions.Items
								label={lan == "en" ? "Device Name" : "设备名"}
							>
								{device_name}
							</Descriptions.Items>
							<Descriptions.Items label={lan == "en" ? "Time" : "时间"}>
								{this.state.time.toLocaleString(
									lan == "en" ? "en-US" : "zh-CN"
								)}
							</Descriptions.Items>
						</Descriptions>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CameraInfo;
