async function getLocalPos(result) {
  return new Promise(resolve => {
    let myCity = new window.BMap.LocalCity();
    myCity.get(result => {
      let cityName = result.name;
      resolve(cityName);
      console.log("当前定位城市:" + cityName);
    });
  });
}
export { getLocalPos };
