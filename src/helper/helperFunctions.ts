function getCoordinates() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
function getWindDirection(d?: number) {
  let directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  if (d) {
    d += 22.5;

    if (d < 0) d = 360 - (Math.abs(d) % 360);
    else d = d % 360;

    let w = parseInt((d / 45).toString());
    return `${directions[w]}`;
  }
}
export { getCoordinates, getWindDirection };
