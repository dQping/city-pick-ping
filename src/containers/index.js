import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./layout";
import App from "../pages/App";
import City from "../pages/City/";

export default class index extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/city" component={City} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}
