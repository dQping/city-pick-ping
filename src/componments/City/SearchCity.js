import React from "react";
import { Menu } from "antd-mobile";

export default function SearchCity() {
  const data = [];

  return (
    <Menu
      className="single-foo-menu"
      data={data}
      value={["1"]}
      level={1}
      //onChange={this.onChange}
      height={
        data.length === 0 ? 0 : document.documentElement.clientHeight * 0.6
      }
    />
  );
}
