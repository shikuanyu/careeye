import React, {Component} from 'react';
import { Row, Col, Progress } from 'antd';


class ProgressBox extends Component{

  render(){
    const mock = {
      progress: 50,
    }
    let {lan,progress} = this.props;
    return(
      <div>
        <Row type="flex" justify="center">
          <Col span={8}>
            {progress==100?(<h2>{lan=='en'?'Detection complete!':'采集完成！'}</h2>):
              (progress==0?<h2>{lan=='en'?'No available subject':'未发现采集对象'}</h2>:
            (<h2>{lan=='en'?'Detecting health indexes...':'采集信号中...'}</h2>))}

          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={18}>
          <Progress percent={progress==0?100:progress}
          status={
            progress==0?"normal":(
              progress==100?"success":"active"
            )}
            strokeColor={progress==0?'#dbd9d9':''}
            showInfo={progress==0?false:true}
            strokeWidth={20}/>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={8}>
          {progress==100?(<h3>{lan=='en'?'See result below':'以下为检测结果'}</h3>):
          (progress==0?(<h3>{""}</h3>):
          (<h3>{lan=='en'?'Please stay still':'请保持不动'}</h3>))}
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProgressBox
