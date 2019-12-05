import React, { Component } from "react";
import { Layout, Row, Col, Divider } from "antd";
import CameraInfo from "./CameraInfo";
import { Button } from "antd";
import SubjectInfo from "./SubjectInfo.js";
import IndexBox from "./IndexBox.js";


const { Header, Footer, Content } = Layout;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				people: [
					{
						breathWarningLevel: "GREEN",
						pose: null,
						poseWarningLevel: "GREEN",
						ROI: "default0",
						heartRate: -1,
						breathRate: -1,
						info: "",
						heartWarningLevel: "GREEN"
					}
				],
				deviceId: "--",
				goneWarningLevel: 0,
				deviceLocalIp: "192.168.7.16",
				totalPeopleNumber: 0,
				isGettingSignal: 0,
				peopleGone: [
					{
						ROI2_ID: "blindSpot0",
						goneTime: 1204.707
					}
				],
				_t: 1575260796.561986,
				rotateAngle: 0,
				_strTime: "2019-12-02 12:26:36",
				movementLevel: null
			},
			lan: "en"
		};
		this.changeLanguage = this.changeLanguage.bind(this);
	}

	changeLanguage() {
		if (this.state.lan == "en") {
			this.setState({ lan: "zh" });
		} else {
			this.setState({ lan: "en" });
		}
	}

	sendMockData1= ()=>{
		this.setState({
			data: {
				people: [
					{
						breathWarningLevel: "GREEN",
						pose: 'stand',
						poseWarningLevel: "GREEN",
						ROI: "default0",
						heartRate: -1,
						breathRate: -1,
						info: "",
						heartWarningLevel: "GREEN"
					}
				],
				deviceId: "mock",
				goneWarningLevel: 0,
				deviceLocalIp: "192.168.7.16",
				totalPeopleNumber: 1,
				isGettingSignal: 120,
				peopleGone: [
					{
						ROI2_ID: "blindSpot0",
						goneTime: 1204.707
					}
				],
				_t: 1575260796.561986,
				rotateAngle: 0,
				_strTime: "2019-12-02 12:26:36",
				movementLevel: 5
			}
		})
	}

	sendMockData2= ()=>{
		this.setState({
			data:{
	        "_t": 1575427374.026184,
	        "deviceId": "mock",
	        "people": [],
	        "goneWarningLevel": 0,
	        "_strTime": "2019-12-04 10:42:54",
	        "totalPeopleNumber": 0,
	        "peopleGone": [
	            {
	                "ROI2_ID": "blindSpot0",
	                "goneTime": 1.563
	            }
	        ],
	        "rotateAngle": 0,
	        "deviceLocalIp": "192.168.7.16",
	        "isGettingSignal": 0
	    }
		})
	}

	componentDidMount() {
		this.infiniteFetch();
	}

	componentWillUnmount() {
		clearInterval(this.ticker);
	}

	infiniteFetch = () => {
		this.ticker = setInterval(() => {
			let initHeaders = new Headers();
			initHeaders.append("Accept", "application/json, text/html, */*");
			initHeaders.append("Content-Type", "text/plain;charset=UTF-8");
			const init = {
				// method:'GET',
				headers: initHeaders
				// cache:'default',
			};
			// console.log("start fetching");
			fetch(
				"http://www.utdimensions.com:5005/check_newest_jsonstr?deviceId=TEST6",
				init
			)
				.then(res => {
					return res.json();
				})
				.then(data => {
					this.setState({ data: data[0] });
				})
				.catch(e => console.log("error:", e));
		}, 3000);
	};

	render() {
		const tsIcon =
			"https://images.unsplash.com/photo-1436473849883-bb3464c23e93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
		const mock = {
			logoURL: "http://utdimensions.com/LOGO256-1.d88fd1a0.png"
		};
		// console.log(this.state.data);
		let { deviceId } = this.state.data;
		let movement =
				this.state.data.movementLevel==null
				?"--"
				:this.state.data.movementLevel < 5
				? "static"
				: this.state.data.movementLevel < 5
				? "fretting"
				: "moving";
		let progress = this.state.data.isGettingSignal / 4;
		let people_count = this.state.data.totalPeopleNumber;
		let cameraInfo = {
			movement,
			device_name: deviceId,
			people_count
		};
		// let pose = 'none';
		// let heartRate = -1;
		// let breathRate = -1;
		if(people_count>0){
			var { pose, heartRate, breathRate } = this.state.data.people[0];
		}else {
			var pose = null;
			var heartRate = -1;
			var breathRate = -1;
		}
		progress = (heartRate!=-1?100:
			(
				breathRate!=-1?100:progress
			));
		// console.log(`heart:${heartRate}, breath:${breathRate}, progress:${progress}`);
		console.log(this.state.data);
		let lan = this.state.lan;

		return (
			<div>
				<Layout>
					<Header className="spaceDown">
						<Row type="flex" align="middle">
							<Col span={1} offset={1}>
								<img src={mock.logoURL} alt="logo" />
							</Col>
							<Col span={2} offset={20}>
							<Button type="primary" onClick={this.changeLanguage}>
								{this.state.lan == "en" ? "中文" : "English"}
							</Button>

							</Col>
						</Row>
					</Header>
					<Content>
						<Row>
							<Col span={20} offset={2}>
								<CameraInfo lan={this.state.lan} info={cameraInfo} />
								<Divider />
								<SubjectInfo
									lan={this.state.lan}
									pose={pose}
									progress={progress}
								/>
								<Divider>
									{this.state.lan == "en" ? "Real Time Monitoring" : "实时监测"}
								</Divider>
								<Row>
									<Col span={22}>
										<IndexBox
											lan={this.state.lan}
											heart={heartRate}
											breath={breathRate}
										/>
									</Col>
								</Row>
							</Col>
						</Row>
					</Content>
					<Divider />
					<Footer>
						<Row type="flex" justify="center" style={{ marginTop: "-2vh" }}>
							<Col style={{ textAlign: "center" }} span={22}>
								<h3>
									{this.state.lan == "en"
										? "United Dimensions Technologies Co., Ltd."
										: "联合维度（广州）科技有限公司"}
								</h3>
							</Col>
						</Row>
					</Footer>
				</Layout>
			</div>
		);
	}
}

export default App;
