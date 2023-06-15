# dpe-ai-gh-copilot
An DPE AI experiment to evaluate GitHub Copilot. Includes 4 epic applications

## Pre-Requisites
* node: v14 or above
* npm: 6 or above

## Application Setup
* `git clone git@github.paypal.com:msudalaiyandi/dpe-ai-experiments.git`
* `cd dpe-ai-experiments`
* `npm run setup`


## API keys setup
* Application uses below two external API's. One should have api keys for these external api's to run this application successfully.
1. **Open weather api**
  - Create an account at Open weather by visiting - https://home.openweathermap.org/users/sign_up
  - By default an access key would be created as soon as we have the account setup ready. - https://home.openweathermap.org/api_keys
  - Copy the access token and set it to the key `OPEN_WEATHER_API_KEY` in the `.env` file (the one under the root folder)

2. **Google maps api**
  - Create a Google maps platform account.
  - Go to dashboard and create a project. https://console.cloud.google.com/?authuser=2&project=omega-palace-389123
  - It is mandatory that you setup a billing account to use google apis. The api's are free however google requires you to setup billing account (provide CC details and so.)
  - From the left navigation click on Credetials. https://console.cloud.google.com/google/maps-apis/credentials?authuser=2&project=omega-palace-389123
  - Now Create Credentials. If billing account is setup properly, the credential would be created successfully.
  - Copy the `Maps API Key` that is generated. This key will be used to interact with google api's.
  - In the application, go to file `client/.env` and set it to key `REACT_APP_GOOGLE_MAPS_API_KEY`

* Now we are all set to run the application.

## Running application
* In local environment, the application runs as two different server. Backend and front end.
* **Open Terminal 1: (Back end)**
  - you should be already in the root folder (`dpe-ai-experiments`)
  - run the command `npm start`
  - this should start the backend server and you can see the log `Server listening on 3001`
  - To verify if the server is running successfully, go to browser and hit `http://localhost:3001/api`, it should give the below message
  ```
  {
    "success": true,
    "message": "Hello from server"
  }
  ```
* **Open terminal 2: (Front end)**
  - go to the root folder `dpe-ai-experiments`
  - `cd client`
  - `npm start`
  - this would start the front end server and you can see the message `Local: http://localhost:3000`
  - Go to the browser and hit `http://localhost:3000`
* Application is now successfully up and running.

## Api Endpoints

#### **GET** `/api/weather?q=<city id>` 

  Description: Retrieves the weather information for this given location (city).

  Request: `http://localhost:3001/api/weather?q=5341145`

  Response: 

  _Success_
  ```json
  {
    "success": true,
    "data": {
      "city": "Cupertino, CA",
      "lat": 37.323002,
      "lon": -122.032181,
      "time": "08:57 pm ",
      "weather": "Clouds",
      "weatherDesc": "broken clouds",
      "temp": 56,
      "feelsLikeTemp": "55",
      "minTemp": "53",
      "maxTemp": "59",
      "humidity": 79
    }
  }
  ```

  _Error 404_
  ```json
  {
    "success": false,
    "message": "City not found"
  }
  ```
  _Error 500_
  ```json
  {
    "success": false,
    "message": "Unable to fetch the details. Please try again later."
  }
  ```
  _Error 400_
  ```json
  {
    "success": false,
    "message": "Invalid city. Please enter a valid city name"
  }
  ```

#### **GET** `/api/cities?q=<search text>` 

  Description: Retrieves the weather information for this given location (city).

  Request: `http://localhost:3001/api/cities?q=san r`

  Response: 

  _Success_
  ```json
  [
    {
        "id": 5392567,
        "name": "San Rafael",
        "state": "CA",
        "country": "US",
        "coord": {
            "lon": -122.53109,
            "lat": 37.97353
        }
    },
    {
        "id": 5392593,
        "name": "San Ramon",
        "state": "CA",
        "country": "US",
        "coord": {
            "lon": -121.97802,
            "lat": 37.77993
        }
    }
  ]
  ```

  #### **GET** `/api/drivingTime?origin=<origin city id>&destination=<destination city id>` 

  Description: Retrieves the distance, duration and weather conditions (if rainy) between the two cities.

  Request: `http://localhost:3001/api/drivingTime?origin=5392171&destination=5341145`

  Response: 

  _Success_
  ```json
  {
    "success": true,
    "data": {
      "distance": "10.5 mi",
      "duration": "17 mins",
      "origin": "San Jose, CA",
      "destination": "Cupertino, CA",
      "hasRainyCondition": false
    }
  }
  ```

  _Error 400_
  ```json
  {
    "success": false,
    "message": "Invalid city identified. Please select valid origin and destination"
  }
  ```
  _Error 404_
  ```json
  {
    "success": false,
    "message": "No driving directions available between the cities"
  }
  ```
  _Error 500_
  ```json
  {
    "success": false,
    "message": "Unable to process your request. Please try again later."
  }
  ```

### E-Commerce api's

#### **GET** `/api/ecommerce/customers?page=<page_number>&limit=<items per page>`

**Description:** Retrieves the list of customers with pagination. Default `page=1`, `limit=10`.

**Request:** `http://localhost:3001/api/ecommerce/customers?page=1&limit=5`

**Response:**
<details>
<summary>Success</summary>

```json
{
    "success": true,
    "data": {
        "next": {
            "page": 2,
            "limit": 5
        },
        "results": [
            {
                "id": "1",
                "name": "Cathleen Stephenson",
                "email": "cathleenstephenson@concility.com",
                "phone": "+1 (977) 541-2540",
                "address": {
                    "line1": "272 Orient Avenue",
                    "line2": "Apt 19",
                    "city": "Grahamtown",
                    "state": "Michigan",
                    "zipcode": 21148
                }
            },
            {
                "id": "2",
                "name": "Benjamin Pruitt",
                "email": "benjaminpruitt@concility.com",
                "phone": "+1 (973) 527-3267",
                "address": {
                    "line1": "546 Atkins Avenue",
                    "line2": "Apt 12",
                    "city": "Blue",
                    "state": "Florida",
                    "zipcode": 33626
                }
            },
            {
                "id": "3",
                "name": "Evangelina Chambers",
                "email": "evangelinachambers@concility.com",
                "phone": "+1 (943) 550-3643",
                "address": {
                    "line1": "871 Grattan Street",
                    "line2": "Apt 33",
                    "city": "Chilton",
                    "state": "North Dakota",
                    "zipcode": 61160
                }
            },
            {
                "id": "4",
                "name": "Burgess Holloway",
                "email": "burgessholloway@concility.com",
                "phone": "+1 (878) 517-2705",
                "address": {
                    "line1": "478 Centre Street",
                    "line2": "Apt 41",
                    "city": "Osage",
                    "state": "Idaho",
                    "zipcode": 67342
                }
            },
            {
                "id": "5",
                "name": "Cornelia Hoover",
                "email": "corneliahoover@concility.com",
                "phone": "+1 (935) 432-3183",
                "address": {
                    "line1": "904 Dean Street",
                    "line2": "Apt 17",
                    "city": "Sunnyside",
                    "state": "Utah",
                    "zipcode": 41152
                }
            }
        ]
    }
}
```
</details>

<details>
<summary>Error 500</summary>
  
  ```json
  {
    "success": false,
    "message": "Unable to process your request. Please try again later."
  }
  ```
</details>

#### **GET** `/api/ecommerce/customers/<customer_id>`
**Description:** Retrieves the customer details for the given customer id.

**Request:** `http://localhost:3001/api/ecommerce/customers/1`

**Response:**
<details>
<summary>Success</summary>

```json
{
    "success": true,
    "data": {
      "id": "1",
      "name": "Cathleen Stephenson",
      "email": "cathleenstephenson@concility.com",
      "phone": "+1 (977) 541-2540",
      "address": {
          "line1": "272 Orient Avenue",
          "line2": "Apt 19",
          "city": "Grahamtown",
          "state": "Michigan",
          "zipcode": 21148
      }
  }
}
```
</details>

<details>
<summary>Error 404</summary>
  
  ```json
  {
    "success": false,
    "message": "Customer not found"
  }
  ```
</details>

<details>
<summary>Error 500</summary>
  
  ```json
  {
    "success": false,
    "message": "Unable to process your request. Please try again later."
  }
  ```
</details>

#### **POST** `/api/ecommerce/customers`
**Description:** Creates a new customer.

**Request:** `http://localhost:3001/api/ecommerce/customers`

```json
{
  "name": "Benjamin Pruitt",
  "email": "benjaminpruitt@concility.com",
  "phone": "+1 (973) 527-3267",
  "address": {
      "line1": "546 Atkins Avenue",
      "line2": "Apt 12",
      "city": "Blue",
      "state": "Florida",
      "zipcode": 33626
  }
}
```

**Response:**
<details>
<summary>Success</summary>

```json
{
  "success": true,
  "data": {
    "id": "2",
    "name": "Benjamin Pruitt",
    "email": "benjaminpruitt@concility.com",
    "phone": "+1 (973) 527-3267",
    "address": {
        "line1": "546 Atkins Avenue",
        "line2": "Apt 12",
        "city": "Blue",
        "state": "Florida",
        "zipcode": 33626
    }
  }
}
```
</details>

<details>
<summary>Error 400</summary>
  
  ```json
  {
    "success": false,
    "message": "Invalid request"
  }
  ```
</details>

<details>
<summary>Error 500</summary>
  
  ```json
  {
    "success": false,
    "message": "Unable to process your request. Please try again later."
  }
  ```
</details>

#### **PUT** `/api/ecommerce/customers/<customer_id>`

**Description:** Updates the customer details for the given customer id.

**Request:** `http://localhost:3001/api/ecommerce/customers/1`

```json
{
  "name": "Cathleen Stephenson",
  "email": "cathleenstephenson@concility.com",
  "phone": "+1 (977) 541-2540",
  "address": {
      "line1": "272 Orient Avenue",
      "line2": "Apt 19",
      "city": "Grahamtown",
      "state": "Michigan",
      "zipcode": 21148
  }
}
```

**Response:**
<details>
<summary>Success</summary>

```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Cathleen Stephenson",
    "email": "cathleenstephenson@concility.com",
    "phone": "+1 (977) 541-2540",
    "address": {
        "line1": "272 Orient Avenue",
        "line2": "Apt 19",
        "city": "Grahamtown",
        "state": "Michigan",
        "zipcode": 21148
    }
  }
}
```
</details>

<details>
<summary>Error 400</summary>
  
  ```json
  {
    "success": false,
    "message": "Invalid request"
  }
  ```
</details>

<details>
<summary>Error 404</summary>
  
  ```json
  {
    "success": false,
    "message": "Customer not found"
  }
  ```
</details>

<details>
<summary>Error 500</summary>
  
  ```json
  {
    "success": false,
    "message": "Unable to process your request. Please try again later."
  }
  ```
</details>

#### **DELETE** `/api/ecommerce/customers/<customer_id>`
**Description:** Deletes the customer details for the given customer id.

**Request:** `http://localhost:3001/api/ecommerce/customers/1`

**Response:**
<details>
<summary>Success</summary>

```json
{
  "success": true,
  "message": "Customer deleted successfully"
}
```
</details>

<details>
<summary>Error 404</summary>
  
  ```json
  {
    "success": false,
    "message": "Customer not found"
  }
  ```
</details>

<details>
<summary>Error 500</summary>
  
  ```json
  {
    "success": false,
    "message": "Unable to process your request. Please try again later."
  }
  ```
</details>

## Running tests
* Tests for the backend api's and their implementations are captured using `Jest` framework
* Run `npm test` to execute and view the results.

## Sample UI screenshot

### Weather forecast
Weather forecast experiment for DPE AI coding - Weather

![image](https://github.paypal.com/storage/user/10458/files/dcae49b4-d625-48fd-9e27-0725aca4a2c6)

### Driving time
Driving duration, distance and weather (only when rainy).

