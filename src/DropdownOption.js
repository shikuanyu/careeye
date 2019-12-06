import {Menu, Dropdown, Icon } from 'antd';
import React, {Component}from 'react';

class DropdownOption extends Component{
  render(){
    const list = [];
    const names = [];
    const { activeDevice, deviceNames } = this.props;
    if(Array.isArray(deviceNames)){
			for(let name of deviceNames){
				// let name = deviceNames[index];
				names.push(name);
				list.push(<Menu.Item key={name}>{name}</Menu.Item>);
			}
		}

		const menu = (
			<Menu>
				{list}
			</Menu>
		)
    return (
      <Dropdown overlay={menu} onClick={this.props.handleDeviceChange}>
      {activeDevice} </Dropdown>

    )
  }
}

export default DropdownOption;
