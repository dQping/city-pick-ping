import React, { Component } from "react";
import { getLocalPos } from "../../services/locationServices";
import {
  LASTEST_CITY,
  getAllCities,
  saveLocalStorageCity,
  getLocalStorageCity
} from "../../services/cityService";
import { SearchBar, Button, WhiteSpace, Toast, List } from "antd-mobile";
import { SearchCity, PosCity } from "../../componments/City/";
import { throttle, parseSearchToState, parseStateToSearch } from "../../utils";
import "./index.less";

const Item = List.Item;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city1: "",
      city2: "",
      value: "三明",
      hotCities: [],
      allCities: {},
      letters: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState(() => {
      Toast.loading("Loading...");
      return { loading: true };
    });
    Promise.all([
      getLocalPos(),
      getAllCities(),
      getLocalStorageCity(LASTEST_CITY)
    ]).then(([position, cityObj, lastestCity]) => {
      Toast.hide();
      this.setState({
        localPosition: position ? position : "",
        letters: cityObj.afterFilterAllCity.validateLetter,
        hotCities: cityObj.hotCity,
        allCities: cityObj.afterFilterAllCity.allCity,
        lastestCity: lastestCity,
        loading: false
      });
    });
  }

  onChange = value => {
    this.setState({ value });
  };
  clear = () => {
    this.setState({ value: "" });
  };

  onSelectCity = city => {
    const { history, location } = this.props;
    const search = location.search;
    const { cityCode, ...rest } = parseSearchToState(search);
    const backCity = typeof city === "string" ? city : city.city;

    rest[`city${cityCode}`] = encodeURI(backCity);
    saveLocalStorageCity(LASTEST_CITY, backCity);
    history.push({
      pathname: "/",
      search: parseStateToSearch({ ...rest })
    });
  };

  renderAllCitiesList = () => {
    let cities = this.state.allCities;
    return Object.keys(cities).map(key => {
      let cityList = cities[key];
      return (
        <List key={key} renderHeader={() => key}>
          {cityList.map(item => (
            <Item key={item.id} onClick={() => this.onSelectCity(item)}>
              {item.city}
            </Item>
          ))}
        </List>
      );
    });
  };

  render() {
    const { hotCities, lastestCity } = this.state;
    console.log(lastestCity);
    return (
      <div className="city">
        <div className="top-serach">
          <SearchBar placeholder="Search" maxLength={8} />
          <WhiteSpace />
          <SearchCity />
        </div>
        <PosCity
          title={"定位/最近访问"}
          city={lastestCity}
          onSelectCity={this.onSelectCity}
        />
        <PosCity
          title={"热门城市"}
          city={hotCities}
          onSelectCity={this.onSelectCity}
        />
        <div className="cityList">{this.renderAllCitiesList()}</div>
      </div>
    );
  }
}
