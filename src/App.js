import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { About } from './components/About';
import { 
  MDBInputGroup, 
  MDBInputGroupElement, 
  MDBBtn, 
  MDBIcon,
  MDBCard, 
  MDBCardBody, 
  MDBCardTitle, 
  MDBCardText,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableBody } from 'mdb-react-ui-kit';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import './App.css';

function App() {
  // useEffect(() => {
  //   axios.get('https://api.openweathermap.org/data/2.5/weather?q=Indore&appid=c3f0a51be707c69778e40244469ebb16')
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // })
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/" element={<Search/>}/>
        </Routes>
      </Router>
    </>
  );
}

function Search() {
  const [formValue, setFormValue] = useState('');
  const [city, setCity] = useState([]);
  const [atm, setAtm] = useState([]);
  const [wind, setWind] = useState([]);
  const [flag, setFlag] = useState(0);
  const [name, setName] = useState('');
  const [sys, setSys] = useState([]);
  const [cor, setCor] = useState([]);

  const search = e => {
    e.preventDefault()
    axios.get('https://api.openweathermap.org/data/2.5/weather?q='+ formValue +'&units=metric&appid=c3f0a51be707c69778e40244469ebb16')
      .then(res => {
        console.log(res)
        console.log(res.data.main)
        setCity(res.data.main)
        setAtm(res.data.weather[0])
        setWind(res.data.wind)
        setName(res.data.name)
        setSys(res.data.sys)
        setCor(res.data.coord)
        setFlag(1);
      })
      .catch(err => {
        console.log(err)
        alert('Enter a valid city name')
      })
      setFormValue('');
    }
  
  return (
    <>
      <div className="d-flex align-items-center justify-content-center font" style={{minHeight: '50vh'}}>
        <MDBCard className='z-depth-5 m-3 font' style={{ maxWidth: '50rem'}}>
          <MDBCardBody>
            {/* <MDBCardTitle>Card title</MDBCardTitle> */}
            {/* <MDBCardText>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </MDBCardText> */}
            <form onSubmit={search}>
              <MDBInputGroup onSubmit={search} className='mb-3' size='lg'>
                <MDBInputGroupElement value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Enter City Name" type='text' />
                <MDBBtn type="submit" disabled={!formValue} style={{backgroundColor: '#2E2E2E'}}><MDBIcon fas icon='search' /></MDBBtn>
              </MDBInputGroup>
            </form>
            {/* <MDBBtn>Button</MDBBtn> */}
          </MDBCardBody>
        </MDBCard>
      </div>
      { flag ? <Details temp = {city.temp} atm = {atm.description} hum = {city.humidity}
        name = {name} wind = {wind.speed} sea = {city.sea_level} sunrise = {sys.sunrise} 
        sunset = {sys.sunset} country = {sys.country} lat = {cor.lat} lon = {cor.lon}></Details> : ""}
      
    </>
  );
}

function Details(props) {
  return (
    <>
      <div className='font' style={{textAlign: 'center'}}>
        <h4>{props.name}, {props.country}</h4>
      </div>
      <div className='font'>
        <MDBContainer>
          <MDBRow>
            <MDBCol size='md' className='col-example'>
              <MDBCard style={{ maxWidth: '22rem' }}>
                <MDBCardBody>
                  {/* <MDBCardTitle>Card title</MDBCardTitle> */}
                    <MDBTable>
                      <MDBTableBody>
                        <tr>
                          <th scope='row'>Temperature</th>
                          <td>{props.temp}°C</td>
                        </tr>
                        <tr>
                          <th scope='row'>Atmosphere</th>
                          <td>{props.atm}</td>
                        </tr>
                        <tr>
                          <th scope='row'>Humidity</th>
                          <td>{props.hum}%</td>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol size='md' className='col-example'>
              <MDBCard style={{ maxWidth: '22rem' }}>
                <MDBCardBody>
                  {/* <MDBCardTitle>Card title</MDBCardTitle> */}
                  <MDBTable>
                      <MDBTableBody>
                        <tr>
                          <th scope='row'>Wind</th>
                          <td>{(props.wind * 3.6).toFixed(2)} kmph</td>
                        </tr>
                        <tr>
                          <th scope='row'>Sea Level</th>
                          <td>{props.sea} hPA</td>
                        </tr>
                        <tr>
                          <th scope='row'>Coordinates</th>
                          <td>{props.lat}°  {props.lon}° </td>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol size='md' className='col-example'>
              <MDBCard style={{ maxWidth: '22rem' }}>
                <MDBCardBody>
                  {/* <MDBCardTitle>Card title</MDBCardTitle> */}
                  <MDBTable>
                    <MDBTableBody>
                      <tr>
                        <th scope='row'>Sunrise</th>
                        <td>{props.sunrise}</td>
                      </tr>
                      <tr>
                        <th scope='row'>Sunset</th>
                        <td>{props.sunset}</td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  )
}


export default App;
