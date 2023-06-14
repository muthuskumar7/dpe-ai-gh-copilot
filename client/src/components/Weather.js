import React from 'react';
import { Card, HeadingText, Row, Col, CaptionText, BodyText } from '@paypalcorp/pp-react'; 

export default function Weather (props) {
  const { weather, weatherDesc, temp, minTemp, maxTemp, feelsLikeTemp, time, city } = props;
  return (
    <Card>
      <Card.Header>{city} as of {time} </Card.Header>
      <Card.Content>
        <Row>
        <Col>
          <HeadingText>{temp}&deg;F</HeadingText>
          <CaptionText>feels like {feelsLikeTemp}&deg;F</CaptionText>
          <BodyText>Min: {minTemp}&deg;F | Max: {maxTemp}&deg;F</BodyText>
        </Col>
        <Col align='right'>
          <HeadingText>{weather}</HeadingText>
          <BodyText>{weatherDesc}</BodyText>
        </Col>
        </Row>
      </Card.Content>
    </Card>
  );
}
