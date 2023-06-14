const util = require('../server/util');


describe('test getCityById', () => {
  it('should return valid city information for the given valid id', () => {
    const city = util.getCityById('5341145');
    const expectedOutput = {
    "id": 5341145,
    "name": "Cupertino",
    "state": "CA",
    "country": "US",
    "coord": {
      "lon": -122.032181,
      "lat": 37.323002
    }
  };
    expect(city).toStrictEqual(expectedOutput);
  });
   it('should return undefined for invalid valid id', () => {
    const city = util.getCityById('asfsfsdfdf');
    expect(city).toBe(undefined);
  });
})