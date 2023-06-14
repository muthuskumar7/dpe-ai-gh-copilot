import React from 'react';
import {
  Container,
  Divider,
  PAYPAL_THEME
} from '@paypalcorp/pp-react'
import {ThemeProvider} from '@emotion/react'

import './App.css';
import WeatherForecast from './pages/WeatherForecast';
import DrivingTime from './pages/DrivingTime';

// Provide a valid Emotion theme (tokens) for your App
export default function App() {
  return (
    <ThemeProvider theme={PAYPAL_THEME}>
      <Container className='App-header'>
        <WeatherForecast />
        <Divider />
        <DrivingTime />
      </Container>
    </ThemeProvider>
  );
}
