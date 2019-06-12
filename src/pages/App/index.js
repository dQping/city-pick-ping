import React, { Component } from "react";

import { List } from "antd-mobile";
import { parseStateToSearch, parseSearchToState } from "../../utils";
import "./index.less";

const Item = List.Item;

class App extends Component {
  state = {
    city1: "",
    city2: "",
    city3: ""
  };
  componentDidMount = () => {
    const { location } = this.props;
    const search = location && location.search;
    const searchState = parseSearchToState(search);
    searchState && this.setState(searchState);
  };
  goPickCity = cityCode => {
    const { history } = this.props;
    history.push({
      pathname: "/city",
      search: parseStateToSearch({ cityCode, ...this.state })
    });
  };
  render() {
    const { city1, city2, city3 } = this.state;
    return (
      <div className="App">
        <List renderHeader={() => "选择城市 demo"} className="my-list">
          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => this.goPickCity("1")}
            extra={city1}
          >
            请选择城市1
          </Item>
          <Item
            arrow="horizontal"
            multipleLine
            extra={city2}
            onClick={() => {
              this.goPickCity("2");
            }}
          >
            请选择城市2
          </Item>
          <Item
            arrow="horizontal"
            multipleLine
            extra={city3}
            onClick={() => {
              this.goPickCity("1");
            }}
          >
            请选择城市3
          </Item>
        </List>
      </div>
    );
  }
}

export default App;
