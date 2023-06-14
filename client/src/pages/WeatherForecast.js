import React from 'react';
import _isEmpty from 'lodash.isempty';

import Map from '../components/Map';
import Weather from '../components/Weather';
import '../App.css';

import {
  Container,
  Row,
  Col,
  Alert,
  Combobox,
  HeadingText,
  Divider,
  Button
} from '@paypalcorp/pp-react';

export default function WeatherForecast() {
  const [ cities, setCities ] = React.useState([ { name: 'Cupertino', state: 'CA', id: 5341145 }]);
  const [ selectedItem, setSelectedItem ] = React.useState('');
  const [ weather, setWeather ] = React.useState({});
  const [ error, setError ] = React.useState(null);

  const updateSelection = e=> setSelectedItem(e.target.value);

  const getWeather = () => {
    fetch(`/api/weather?q=${selectedItem}`)
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setWeather(resData.data);
          setError(null);
        } else {
          setError(resData.message);
        }
      });
  }
  
  const getCities = (e) => {
    const searchQuery = e.target.value;
    if (searchQuery && searchQuery.length >=2) {
      fetch(`/api/cities?q=${searchQuery}`)
        .then(res => res.json())
        .then(cities => setCities(cities));
    }
  }

 const cityOptions = cities.map(c => ({ label: `${c.name}, ${c.state}`, value: `${c.id}` }));

 return (
    <Container style={{marginBottom: '20px'}}>
      {/* Title */}
      <Row style={{ paddingBottom: '40px' }}>
        <Col>
          <HeadingText size="lg" style={{ color: '#003087'}} >Weather forecast</HeadingText>
        </Col>
      </Row>
      {/* Input and Action */}
      <Row style={{ paddingTop: '40px' }}>
        <Col>
          <Combobox
            name="city"
            label="City"
            mobileTitle="City"
            placeholder="Type to find city"
            options={cityOptions}
            value={selectedItem}
            onTextChange={getCities}
            // emptyMessage={false}
            onChange={updateSelection}
          />
        </Col>
        <Col>
          <Button onClick={getWeather}>Get weather</Button>
        </Col>
      </Row>
      {/* Result/Output */}
      <Row style={{ padding: '30px 0px', maxWidth:'500px' }}>
        <Col>
          { error && <Alert type='error'>{error}</Alert> }
          { !_isEmpty(weather) && <Weather {...weather} /> }
        </Col>
     </Row>
     <Row>
      <Divider/>
      { !_isEmpty(weather) && <Map lat={weather.lat} lng={weather.lon} /> }
     </Row>
    </Container>
  )
}
