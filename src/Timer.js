import React,{Component} from 'react';
import {Button} from 'antd';


class Timer extends Component{
  constructor(props){
    super(props);
    this.state={
      timerOn:false,
      timerStart:0,
      timerTime:0,
    }
    this.startTimer=this.startTimer.bind(this);
  }

  componentWillReceiveProps(){
    let {opt} =this.props;
    if(opt=='start'){
      this.resetTimer();
      this.startTimer();
    }else if(opt=='reset'){
      this.resetTimer();
    }else if(opt=='stop'){
      this.stopTimer();
    }
  }
  startTimer=()=>{
    this.setState({
      timerOn:true,
      timerStart:Date.now()-this.state.timerTime,
    });
    this.timer = setInterval(()=>{
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    },10)
  }

  stopTimer = () => {
  this.setState({ timerOn: false });
  clearInterval(this.timer);
};

  resetTimer = () => {
  this.setState({
    timerStart: 0,
    timerTime: 0
  });
};

  render(){
    const {timerTime} = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return(
      <div className="stopWatch">
      {hours}:{minutes}:{seconds}:{centiseconds}
      </div>
    )
  }
}

export default Timer;
