import React, { Component } from "react";
import { Row, Col, Descriptions, Slider,Divider } from "antd";
import ProgressBox from "./ProgressBox.js";
import Timer from "./Timer.js";

class SubjectInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pose: null,
			timerOpt: null,
			threshold:null,
		};
	}
	componentWillReceiveProps(nextProps) {
		let pose = this.state.pose;
		let newPose = nextProps.pose;
		// console.log(`newPose:${newPose}, pose:${pose}`);
		if (newPose == null) {
			this.setState({ timerOpt: "stop",pose:newPose });
		} else if (pose==null) {
			this.setState({ timerOpt: "start",pose:newPose});
		}else if(pose==newPose){
			this.setState({ timerOpt: "keep" });
		}else{
			this.setState({ timerOpt: "reset",pose:newPose });
		}
	}

	handleThresholdChange=(value)=>{
		let threshold;
		switch(value){
			case 0:threshold=60;break;
			case 33:threshold=120;break;
			case 67:threshold=180;break;
			case 100:threshold=null;break;
			default: threshold=null;
		}
		this.setState({threshold});
	}

	render() {
		const mock = {
			standURL:
				"/resources/stand.png",
			sitURL: "/resources/sit.svg",
			sleepURL: "https://image.flaticon.com/icons/svg/55/55181.svg",
			lieURL: "/resources/lie.svg",
			groundURL: "https://i.dlpng.com/static/png/6852377_preview.png",
			loadingURL:
				"https://media1.tenor.com/images/1c5800d6abb603cb52e8ab3bbd710af1/tenor.gif?itemid=14907829"
		};
		let { lan, progress, pose } = this.props;
		const marks={
			0:'1',
			33:'2',
			67:'3',
			100:lan==='en'?'N/A':'不报警'
		}
		return (
			<div>
				<Row type="flex" align="middle" gutter={0}>
					<Col xs={10} sm={7} md={3}>
						<img
							src={
								pose === "stand"
									? mock.standURL
									: pose === "sit"
									? mock.sitURL
									: pose === "lie"
									? mock.lieURL
									: mock.loadingURL
							}
							alt="posture-img"
						/>
					</Col>
					<Col xs={14} sm={17} md={5}>
						<Descriptions
							title={lan == "en" ? "Subject Info" : "被测人信息"}
							column={1}
							size="small"
						>
							<Descriptions.Items label={lan == "en" ? "Posture" : "动作"}>
								{pose==null?'--':(lan=='en'?pose:
								(
									pose=='stand'?'站':
									pose=='sit'?'坐或蹲':'坐地上或躺'
								))}
							</Descriptions.Items>
							<Descriptions.Items label={lan == "en" ? "Duration" : "时长"}>
								<Timer opt={this.state.timerOpt} threshold={this.state.threshold} />
							</Descriptions.Items>
						</Descriptions>
						<Row>
						  <Col xs={15} sm={10} md={22} lg={20} xl={18}>
								<Slider
								step={null}
								marks={marks}
								defaultValue={100}
								onChange={this.handleThresholdChange}
								tooltipVisible={false}
								/>
							</Col>
						</Row>
					</Col>
					<Col xs={24} md={15} lg={16}>
						<ProgressBox lan={lan} progress={progress} />
					</Col>
				</Row>
			</div>
		);
	}
}

export default SubjectInfo;
