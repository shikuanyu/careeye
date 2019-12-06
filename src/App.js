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
			lan: "en",
			activeDevice:null,
			deviceNames:[],
			connection:false,
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
	//
	// sendMockData1= ()=>{
	// 	this.setState({
	// 		data: {
	// 			people: [
	// 				{
	// 					breathWarningLevel: "GREEN",
	// 					pose: 'stand',
	// 					poseWarningLevel: "GREEN",
	// 					ROI: "default0",
	// 					heartRate: -1,
	// 					breathRate: -1,
	// 					info: "",
	// 					heartWarningLevel: "GREEN"
	// 				}
	// 			],
	// 			deviceId: "mock01",
	// 			goneWarningLevel: 0,
	// 			deviceLocalIp: "192.168.7.16",
	// 			totalPeopleNumber: 1,
	// 			isGettingSignal: 120,
	// 			peopleGone: [
	// 				{
	// 					ROI2_ID: "blindSpot0",
	// 					goneTime: 1204.707
	// 				}
	// 			],
	// 			_t: 1575260796.561986,
	// 			rotateAngle: 0,
	// 			_strTime: "2019-12-02 12:26:36",
	// 			movementLevel: 5
	// 		},
	// 		deviceNames:['mock01','mock02'],
	// 		connection:true,
	// 	})
	// }
	//
	// sendMockData2= ()=>{
	// 	this.setState({
	// 		data:{
	//         "_t": 1575427374.026184,
	//         "deviceId": "mock02",
	//         "people": [],
	//         "goneWarningLevel": 0,
	//         "_strTime": "2019-12-04 10:42:54",
	//         "totalPeopleNumber": 0,
	//         "peopleGone": [
	//             {
	//                 "ROI2_ID": "blindSpot0",
	//                 "goneTime": 1.563
	//             }
	//         ],
	//         "rotateAngle": 0,
	//         "deviceLocalIp": "192.168.7.16",
	//         "isGettingSignal": 0
	//     },
	// 		deviceNames:[],
	// 		connection:false,
	//
	// 	})
	// }

	componentDidMount() {
		this.infiniteFetch();
	}

	componentWillUnmount() {
		clearInterval(this.ticker);
	}

	checkDataValidity = (data)=>{
		if(data.length==0){
			return false;
		}else return true;
	}

	handleDeviceChange = (activeDevice)=>{
		this.setState({activeDevice});
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
			console.log("start fetching");
			fetch(
				"http://www.utdimensions.com:5005/check_newest_jsonstr?deviceId=all",
				init
			)
				.then(res => {
					return res.json();
				})
				.then(data => {
					if(!this.checkDataValidity(data))return;
					let activeDevice = this.state.activeDevice;
						//pick the first device if not specifically named
					let deviceNames = [];
					let index = 0;
					let connection =false;
					for(let i=0;i<data.length;i++){
						let deviceName=data[i].deviceId;
						deviceNames.push(deviceName);
						if(deviceName==activeDevice){
							index=i;
							connection=true;
						}
					}
					// auto select active device
					// this.setState({data:data[index],deviceNames,activeDevice:deviceNames[index]});
					if(connection){
						this.setState({data:data[index],deviceNames,connection});
					}
					else {this.setState({deviceNames});}
				})
				.catch(e => console.log(e));
		}, 3000);
	};

	render() {
		const tsIcon =
			"https://images.unsplash.com/photo-1436473849883-bb3464c23e93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
		const mock = {
			logoURL: "http://utdimensions.com/LOGO256-1.d88fd1a0.png"
		};
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
		let { activeDevice,deviceNames,connection } = this.state;
		let cameraInfo = {
			movement,
			activeDevice,
			deviceNames,
			people_count,
			connection
		};
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
								<CameraInfo lan={this.state.lan} info={cameraInfo} handleDeviceChange={this.handleDeviceChange}  />
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
