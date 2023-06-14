import React from 'react';
import _isEmpty from 'lodash.isempty';
import {
  Container,
  Row,
  Col,
  Alert,
  Card,
  ContextualAlert,
  Combobox,
  HeadingText,
  Divider,
  Button,
  LoadingSpinner
} from '@paypalcorp/pp-react';

export default function DrivingTime() {
  const [ originCities, setOriginCities] = React.useState([ { name: 'Cupertino', state: 'CA', id: 5341145 }]);
  const [ destCities, setDestCities ] = React.useState([ { name: 'San Jose', state: 'CA', id: 5392171 }]);
  const [ selectedOrigin, setSelectedOrigin ] = React.useState('');
  const [ selectedDest, setSelectedDest ] = React.useState('');
  const [ direction, setDirection ] = React.useState({});
  const [ error, setError ] = React.useState(null);
  const [ loading, setLoading ] = React.useState(false);

  const updateOrigin = (e)=> setSelectedOrigin(e.target.value);
  const updateDestination = (e)=> setSelectedDest(e.target.value);

  const getDirections = () => {
    // Set loader
    setLoading(true);
    setDirection({});
    fetch(`/api/drivingTime?origin=${selectedOrigin}&destination=${selectedDest}`)
      .then(res => res.json())
      .then(resData => {
        // Reset loader
        setLoading(false);
        // console.log('resData', JSON.stringify(resData));
        if (resData.success) {
          setDirection(resData.data);
          setError(null);
        } else {
          setError(resData.message);
          setDirection({});
        }
      });
  }
  
  const getCities = (type, e) => {
    const searchQuery = e.target.value;
    if (searchQuery && searchQuery.length >=2) {
      fetch(`/api/cities?q=${searchQuery}`)
        .then(res => res.json())
        .then(cities => {
          if (type === 'origin') {
            setOriginCities(cities);  
          } else {
            setDestCities(cities);
          }
        });
    }
  }

  const getCityOptions = cities => cities.map(c => ({ label: `${c.name}, ${c.state}`, value: `${c.id}` }));
  // console.log(JSON.stringify({ loading, direction }));
 return (
    <Container style={{marginTop: '30px'}}>
      {/* Title */}
      <Row style={{ paddingBottom: '40px' }}>
        <Col>
          <HeadingText size="lg" style={{ color: '#003087'}} >Driving Time</HeadingText>
        </Col>
      </Row>
      {/* Input and Action */}
      <Row style={{ paddingTop: '40px' }}>
        <Col>
          <Combobox
            name="originCity"
            label="Origin City"
            mobileTitle="Origin City"
            placeholder="Type to find origin city"
            options={getCityOptions(originCities)}
            value={selectedOrigin}
            onTextChange={getCities.bind(this, 'origin')}
            onChange={updateOrigin}
          />
        </Col>
        <Col>
          <Combobox
            name="destinationCity"
            label="Destination City"
            mobileTitle="Destination City"
            placeholder="Type to find destination city"
            options={getCityOptions(destCities)}
            value={selectedDest}
            onTextChange={getCities.bind(this, 'destination')}
            onChange={updateDestination}
          />
        </Col>
      </Row>
      <Row style={{marginTop: '20px'}}>
        <Col>
          <Button onClick={getDirections}>Get directions</Button>
        </Col>
      </Row>

      {/* Result/Output */}
      { error && 
        <Row style={{ padding: '30px 0px' }}>
          <Col>
            <Alert type='error'>{error}</Alert>
          </Col>
        </Row>
      }
      <Row style={{ padding: '30px 0px', maxWidth:'600px' }}>
        <Col>
          { loading && <LoadingSpinner screenReaderText="Loading directions" size="xl" />}
          { !_isEmpty(direction) && <Direction {...direction} /> }
          
        </Col>
     </Row>
     <Divider/>
    </Container>
  )
}

function Direction (props) {
  const { distance, duration, origin, destination, hasRainyCondition } = props;
  return (
    <Card>
      <Card.Header>{origin} to {destination} </Card.Header>
      <Card.Content>
        <Row>
        <Col>
          <HeadingText>{duration}</HeadingText>
        </Col>
        <Col align='right'>
          <HeadingText>{distance}</HeadingText>
        </Col>
        </Row>
        { hasRainyCondition && 
           <Row>
            <Col>
              <ContextualAlert type='warning'>Severe weather observed. Drive with caution.</ContextualAlert>
            </Col>
          </Row>
        }
      </Card.Content>
    </Card>
  );
}

