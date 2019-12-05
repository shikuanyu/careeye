import React, { Component } from "react";
import { Row, Col, Descriptions } from "antd";
import Pulse from "react-reveal/Pulse";

class IndexBox extends Component {
	constructor(props){
		super(props);
		this.state = {
			heartURL:
				"/resources/heart.svg",
			breathURL: "/resources/lung.png",
			ECGURL: "https://media.giphy.com/media/abTqsmCYAgGzu/giphy.gif",
			heart:0,
			breath:0,
			heartPulse:0,
			breathPulse:0,
		}
	}
	componentWillReceiveProps(nextProps){
		let { heart, breath } = nextProps;
		heart = (heart==-1)?0:heart;
		breath = (breath==-1)?0:breath;
		let heartPulse = 60000 / heart;
		let breathPulse =  60000 / breath;
		this.setState({
			heart,
			breath,
			heartPulse,
			breathPulse
		})
	}

	render() {
		let { lan } = this.props;
		let {heart,breath,heartPulse,breathPulse} = this.state;
		return (
			<div>
				<Row type="flex" align="middle" justify="center">
					<Col span={9}>
						<Row type="flex" align="middle" gutter={[10, 80]}>
							<Col span={6}>
							<Pulse duration={heartPulse} spy={heartPulse} forever>
								<Pulse duration={heartPulse} spy={heartPulse} forever>
									<Pulse duration={heartPulse} spy={heartPulse} forever>
										<img src={this.state.heartURL} alt="heart-img" />
									</Pulse>
								</Pulse>
							</Pulse>
							</Col>
							<Col span={6} offset={2}>
								<h1>{heart + (lan === "en" ? "b/min" : "次/分钟")}</h1>
							</Col>
						</Row>
						<Row type="flex" align="middle" gutter={[10, 80]}>
							<Col span={6}>
								<Pulse duration={breathPulse} spy={breathPulse} forever>
									<Pulse duration={breathPulse} spy={breathPulse} forever>
										<Pulse duration={breathPulse} spy={breathPulse} forever>
											<img src={this.state.breathURL} alt="breath-img" />
										</Pulse>
									</Pulse>
								</Pulse>
							</Col>
							<Col span={6} offset={2}>
								<h1>{breath + (lan === "en" ? "r/min" : "次/分钟")}</h1>
							</Col>
						</Row>
					</Col>
					<Col style={{ textAlign: "center",marginLeft:'2vw' }} span={14}>
						<img src={heart == 0 ? '/resources/plain-line-green.png' : '/resources/ECG-green.png'} alt={"ecg img"} />
					</Col>
				</Row>
			</div>
		);
	}
}

export default IndexBox;
