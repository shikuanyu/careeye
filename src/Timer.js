import React, { Component } from "react";
import { Row,Col,Button, Badge } from "antd";

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timerOn: false,
			timerStart: 0,
			timerTime: 0,
		};
		this.startTimer = this.startTimer.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		let { opt, threshold } = nextProps;
		if (opt == "start") {
			this.startTimer();
		} else if (opt == "reset") {
			this.resetTimer();
		} else if (opt == "stop") {
			this.stopTimer();
			this.resetTimer();
		}
	}
	startTimer = () => {
		this.setState({
			timerOn: true,
			timerStart: Date.now() - this.state.timerTime
		});
		this.timer = setInterval(() => {
			this.setState({
				timerTime: Date.now() - this.state.timerStart
			});
		}, 10);
	};

	stopTimer = () => {
		this.setState({ timerOn: false });
		clearInterval(this.timer);
	};

	resetTimer = () => {
		this.setState({
			timerStart: Date.now(),
			timerTime: 0
		});
	};
	render() {
		const { timerTime } = this.state;
		let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
		let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
		let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
		let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
		let allSeconds= (Math.floor(timerTime / 1000));
		return (
			(this.props.threshold==null||allSeconds<this.props.threshold)?
			<div className="stopWatch">
				{hours}:{minutes}:{seconds}
			</div>
			:
			<Row type='flex' align='middle'>
			  <Col span={2}>
				<Badge
				count={'!'}
				/>
				</Col>
				<Col span={22}>
				  {`${minutes}:${minutes}:${seconds}`}
				</Col>
			</Row>
		);
	}
}

export default Timer;
