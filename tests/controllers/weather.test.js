const weather = require('../../server/controllers/weather');
const rp = require('request-promise');
const _omit = require('lodash.omit');

/* Test for getCities() */
// describe('test getCities()', () => {
//   it('should return filtered cities list based on the query from req', () => {
//     const expectedOutput = [
//       {
//         id: 5341145,
//         name: 'Cupertino',
//         state: 'CA',
//         country: 'US',
//         coord: { lon: -122.032181, lat: 37.323002 }
//       }
//     ];

//     const mockReq = {
//       query: {
//         q: 'cup'
//       }
//     };
//     const mockRes = {
//       json: function (data) {
//         expect(data).toStrictEqual(expectedOutput); 
//       }
//     };
//     weather.getCities(mockReq, mockRes);
//   });
//   it('should treat search query to be case insensitive', () => {
//     const expectedOutput = [
//       {
//         id: 5341145,
//         name: 'Cupertino',
//         state: 'CA',
//         country: 'US',
//         coord: { lon: -122.032181, lat: 37.323002 }
//       }
//     ];

//     const mockReq = {
//       query: {
//         q: 'CUP'
//       }
//     };
//     const mockRes = {
//       json: function (data) {
//         expect(data).toStrictEqual(expectedOutput); 
//       }
//     };
//     weather.getCities(mockReq, mockRes);
//   });
//   it('should return empty array for invalid search query', () => {
//     const mockReq = {
//       query: {
//         q: 'QQQ'
//       }
//     };
//     const mockRes = {
//       json: function (data) {
//         expect(data).toStrictEqual([]); 
//       }
//     };
//     weather.getCities(mockReq, mockRes);
//   });
// });

/* Test for getWeather() */
// describe('test getWeather()', () => {
//   let rpMock;
//   beforeAll(() => {
//     rpMock = jest.spyOn(rp, 'get');
//   })
//   afterAll(() => {
//     // Restore jest mock
//     rpMock && rpMock.mockRestore();
//   });

//   const mockResponse = {
//     "coord": {
//       "lon": -122.0449,
//       "lat": 37.318
//     },
//     "weather": [
//       {
//         "id": 804,
//         "main": "Clouds",
//         "description": "overcast clouds",
//         "icon": "04n"
//       }
//     ],
//     "base": "stations",
//     "main": {
//       "temp": 58.14,
//       "feels_like": 57.13,
//       "temp_min": 53.33,
//       "temp_max": 61.56,
//       "pressure": 1011,
//       "humidity": 74
//     },
//     "visibility": 10000,
//     "wind": {
//       "speed": 9.22,
//       "deg": 200
//     },
//     "clouds": {
//       "all": 100
//     },
//     "dt": 1686125054,
//     "sys": {
//       "type": 2,
//       "id": 2001717,
//       "country": "US",
//       "sunrise": 1686142067,
//       "sunset": 1686194793
//     },
//     "timezone": -25200,
//     "id": 5341145,
//     "name": "Cupertino",
//     "cod": 200
//   };

//   it('should return weather details for request city', () => {
//     const expectedOutput = {
//       success: true,
//       data: {
//         city: 'Cupertino, CA',
//         lat: 37.323002,
//         lon: -122.032181,
//         // time: '05:02 am ',
//         weather: 'Clouds',
//         weatherDesc: 'overcast clouds',
//         temp: 58,
//         feelsLikeTemp: '57',
//         minTemp: '53',
//         maxTemp: '62',
//         humidity: 74
//       }
//     };
//     const mockReq = {
//       query: {
//         q: '5341145'
//       }
//     };
//     const mockRes = {
//       json: function (data) {
//         // omit time as it will be changing.
//         const dataWithoutTime = { ..._omit(data, 'data'), data: _omit(data.data, 'time') };
//         expect(dataWithoutTime).toStrictEqual(expectedOutput);
//       }
//     };
//     rp.get.mockResolvedValue(mockResponse);
//     weather.getWeatherByCity(mockReq, mockRes);
//   });
//   it('should return from cached value for the second call', () => {
//     const expectedOutput = {
//       success: true,
//       data: {
//         city: 'Cupertino, CA',
//         lat: 37.323002,
//         lon: -122.032181,
//         // time: '05:02 am ',
//         weather: 'Clouds',
//         weatherDesc: 'overcast clouds',
//         temp: 58,
//         feelsLikeTemp: '57',
//         minTemp: '53',
//         maxTemp: '62',
//         humidity: 74
//       }
//     };
//     const mockReq = {
//       query: {
//         q: '5341145'
//       }
//     };
//     const mockRes = {
//       json: function (data) {
//         // omit time as it will be changing.
//         const dataWithoutTime = { ..._omit(data, 'data'), data: _omit(data.data, 'time') };
//         expect(dataWithoutTime).toStrictEqual(expectedOutput);
//         expect(rpMock).toHaveBeenCalledTimes(1);
//       }
//     };
//     rp.get.mockResolvedValue(mockResponse);
//     weather.getWeatherByCity(mockReq, mockRes);
//     weather.getWeatherByCity(mockReq, mockRes);
//   });
//   it('should return failure response for invalid city', () => {
//     const expectedOutput = {
//       success: false,
//       message: 'City not found'
//     };
//     const mockReq = {
//       query: {
//         q: 'qewrerw'
//       }
//     };
//     const mockRes = {
//       status: function (statusCode) {
//         expect(statusCode).toBe(404);
//         return {
//           json: function (data) {
//             expect(data).toStrictEqual(expectedOutput);
//           }
//         }
//       }
//     };
//     weather.getWeatherByCity(mockReq, mockRes);
//   });
// });

// /* Test for getDrivingTime() */
describe('test getDrivingTime()', () => {
  const mapMockResponse = {
    "routes": [
      {
        "legs": [
          {
            "distance": {
              "text": "10.5 mi",
              "value": 16849
            },
            "duration": {
              "text": "16 mins",
              "value": 980
            },
            "end_address": "San Jose, CA, USA",
            "end_location": {
              "lat": 37.3387078,
              "lng": -121.8852616
            },
            "start_address": "Cupertino, CA, USA",
            "start_location": {
              "lat": 37.3229847,
              "lng": -122.0321663
            }
          }
        ],
      }
    ],
    "status": "OK"
  };
  const originCityMockResponse = {
    "coord": {
      "lon": -122.0449,
      "lat": 37.318
    },
    "weather": [
      {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04n"
      }
    ],
    "main": {
      "temp": 58.14,
      "feels_like": 57.13,
      "temp_min": 53.33,
      "temp_max": 61.56,
      "pressure": 1011,
      "humidity": 74
    },
    "id": 5341145,
    "name": "Cupertino",
    "cod": 200
  };
  const destCityMockResponse = {
    "coord": {
      "lon": -121.895,
      "lat": 37.3394
    },
    "weather": [
      {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04d"
      }
    ],
    "main": {
      "temp": 69.42,
      "feels_like": 68.74,
      "temp_min": 59.02,
      "temp_max": 74.37,
      "pressure": 1014,
      "humidity": 57
    },
    "id": 5392171,
    "name": "San Jose",
    "cod": 200
  };
  const destCityMockResponseWithRain = {
    "coord": {
      "lon": -79.056709,
      "lat": 43.094501
    },
    "weather": [
      {
        "id": 803,
        "main": "Rain",
        "description": "showering rain",
        "icon": "04d"
      }
    ],
    "main": {
      "temp": 69.42,
      "feels_like": 68.74,
      "temp_min": 59.02,
      "temp_max": 74.37,
      "pressure": 1014,
      "humidity": 57
    },
    "id": 5128723,
    "name": "Niagara Falls",
    "cod": 200
  };
  let rpMock;
  beforeAll(() => {
    rpMock = jest.spyOn(rp, 'get');
    rp.get.mockImplementation(url => {
      if (url.includes('maps')) { // Maps api
        return mapMockResponse;
      } else if(url.includes('-122')) { // Cupertino
        return originCityMockResponse;
      } else if (url.includes('-121')) { // San Jose
        return destCityMockResponse;
      } else if (url.includes('-79')) { // Niagara falls
        return destCityMockResponseWithRain;
      }
    });
  });

  afterAll(() => {
    rpMock && rpMock.mockRestore();
  })

  // it('should return driving details for request origin and destination cities', () => {
  //   const expectedOutput = {
  //     success: true,
  //     data: {
  //       "destination": "San Jose, CA",
  //       "distance": "10.5 mi",
  //       "duration": "16 mins",
  //       "hasRainyCondition": false,
  //       "origin": "Cupertino, CA",
  //     }
  //   };
  //   const mockReq = {
  //     query: {
  //       origin: '5341145',
  //       destination: '5392171'
  //     }
  //   };
  //   const mockRes = {
  //     json: function (data) {
  //       expect(data).toStrictEqual(expectedOutput);
  //     }
  //   };
  //   weather.getDrivingTime(mockReq, mockRes);
  // });
  // it('should return driving details with rain conditions when one of the cities weather has Rain', () => {
  //   const expectedOutput = {
  //     success: true,
  //     data: {
  //       "destination": "Niagara Falls, NY",
  //       "distance": "10.5 mi",
  //       "duration": "32 mins",
  //       "hasRainyCondition": true,
  //       "origin": "Cupertino, CA",
  //     }
  //   };
  //   const mockReq = {
  //     query: {
  //       origin: '5341145',
  //       destination: '5128723'
  //     }
  //   };
  //   const mockRes = {
  //     json: function (data) {
  //       expect(data).toStrictEqual(expectedOutput);
  //     }
  //   };
  //   weather.getDrivingTime(mockReq, mockRes);
  // });
  it('should return failure response for invalid city', () => {
    const expectedOutput = {
      success: false,
      message: 'Invalid city identified. Please select valid origin and destination'
    };
    const mockReq = {
      query: {
        origin: '5341145',
        destination: 'adsfsfdf'
      }
    };
    const mockRes = {
      status: function (code) {
        return {
          json: function (data) {
            expect(data).toStrictEqual(expectedOutput);
          }
        };
      }
    };
    weather.getDrivingTime(mockReq, mockRes);
  });
});
