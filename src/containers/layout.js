import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";

export default class layout extends Component {
  render() {
    return (
      <div className="layout">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log("onLeftClick")}
          rightContent={[<Icon key="1" type="ellipsis" />]}
        >
          选择城市
        </NavBar>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
