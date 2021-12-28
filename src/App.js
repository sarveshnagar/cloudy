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
import 'weather-icons/css/weather-icons.css'
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
  const [air, setAQI] = useState([]);
  const [astro, setAstro] = useState([]);
  const icon = "";

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
        setFlag(1)
      })
      .catch(err => {
        console.log(err)
        alert('Enter a valid city name')
      })
      axios.get('https://api.waqi.info/feed/'+formValue+'/?token=676d71a2549061169344056b2be4b2876067a49b ')
      .then(res => {
        setAQI(res.data.data);
      })
      axios.get('https://api.ipgeolocation.io/astronomy?apiKey=3fc21c6edaaa46fe8d283ed475bd3c09&location=' + formValue)
      .then(res => {
        setAstro(res.data);
      })
      .catch(err => {
        console.log(err)
        // alert('Enter a valid city name')
      })
      setFormValue('');
    }
  
  return (
    <>
      <div className="d-flex align-items-center justify-content-center font" style={{minHeight: '30vh'}}>
        <MDBCard className='z-depth-5 m-3 font' style={{ maxWidth: '50rem'}}>
          <MDBCardBody>
            {/* <MDBCardTitle>Card title</MDBCardTitle> */}
            {/* <MDBCardText>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </MDBCardText> */}
            <form onSubmit={search}>
              <MDBInputGroup onSubmit={search} className='mb-3' size='lg'>
                <MDBInputGroupElement value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Enter City or State" type='text' />
                <MDBBtn type="submit" disabled={!formValue} style={{backgroundColor: '#2E2E2E'}}><MDBIcon fas icon='search' /></MDBBtn>
              </MDBInputGroup>
            </form>
            {/* <MDBBtn>Button</MDBBtn> */}
          </MDBCardBody>
        </MDBCard>
      </div>
      { flag ? <Details temp = {city.temp} atm = {atm.description} hum = {city.humidity}
        name = {name} wind = {wind.speed} sunrise = {sys.sunrise} 
        sunset = {sys.sunset} country = {sys.country} aqi = {air.aqi}
        range = {atm.id} moonrise = {astro.moonrise} moonset = {astro.moonset} 
        sunrise = {astro.sunrise} sunset = {astro.sunset}></Details> : ""}
      
    </>
  );
}

function Details(props) {
  var icon = ''
  if(props.range >=200 && props.range <=232)
    icon = 'wi-thunderstorm'
  else if(props.range >=300 && props.range <=321)
    icon = 'wi-sleet'
  else if(props.range >=500 && props.range <=531)
    icon = 'wi-storm-showers'
  else if(props.range >=600 && props.range <=622)
    icon = 'wi-snow'
  else if(props.range >=701 && props.range <=781)
    icon = 'wi-fog'
  else if(props.range === 800)
    icon = 'wi-day-sunny'
  else if(props.range >=801 && props.range <=804)
    icon = 'wi-cloudy'
  else
    icon = ''

  var level = ''
  var legend = ''
  if(props.aqi <= 50 && props.aqi > 0)
  {
    legend = 'good'
    level = 'Good'
  } else if(props.aqi <= 100 && props.aqi > 50) {
    legend = 'moderate'
    level = 'Moderate'
  } else if(props.aqi <= 150 && props.aqi > 100) {
    legend = 'unhealthy1'
    level = 'Unhealthy for Sensitive Groups'
  } else if(props.aqi <= 200 && props.aqi > 150) {
    legend = 'unhealthy2'
    level = 'Unhealthy'
  } else if(props.aqi <= 300 && props.aqi > 200) {
    legend = 'unhealthy3'
    level = 'Very Unhealthy'
  } else if(props.aqi > 300) {
    legend = 'hazardous'
    level = 'Hazardous'
  } else 
    level = '--'
  

  return (
    <>
      <div className='font' style={{textAlign: 'center'}}>
        <h4>{props.name}, {props.country}</h4>
      </div>
      <div className='font my-3' style={{textAlign: 'center'}}>
        <i className={`wi ${icon} display-5 my-3`}></i>
        <h4>{props.temp}°C</h4>
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
                          <th scope='row'>Atmosphere <MDBIcon fas icon="water" /></th>
                          <td>{props.atm}</td>
                        </tr>
                        <tr>
                          <th scope='row'>Humidity <MDBIcon fas icon="tint" /></th>
                          <td>{props.hum}%</td>
                        </tr>
                        <tr>
                          <th scope='row'>Wind <MDBIcon fas icon="wind" /></th>
                          {props.wind == 0 ? <td>--</td> : <td>{(props.wind * 3.6).toFixed(2)} kmph</td>}
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
                          <th scope='row'>Sunrise <i className='wi wi-sunrise'></i></th>
                          <td>{props.sunrise}</td>
                        </tr>
                        <tr>
                          <th scope='row'>Sunset <i className='wi wi-sunset'></i></th>
                          <td>{props.sunset}</td>
                        </tr>
                        <tr>
                        <th scope='row'>Moonrise <i className='wi wi-moonrise'></i></th>
                        <td>{props.moonrise}</td>
                      </tr>
                      <tr>
                        <th scope='row'>Moonset <i className='wi wi-moonset'></i></th>
                        <td>{props.moonset}</td>
                      </tr>
                      </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol size='md' className='col-example'>
              <MDBCard style={{ maxWidth: '22rem' }}>
                <MDBCardBody>
                  {/* <MDBCardTitle></MDBCardTitle> */}
                  <MDBTable>
                    <MDBTableBody>
                      <tr>
                        <th scope='row'>AQI</th>
                        <td>
                          <div className={`${legend} legendStyle rounded p-1 shadow-4`}>
                            {props.aqi}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'>Level</th>
                        <td style={{textAlign: 'center'}} >{level}</td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <div className='font my-3'>
        <MDBContainer>
          <MDBRow>
            <MDBCol size='md' className='col-example'>
            <MDBCard style={{ maxWidth: '30rem' }}>
                <MDBCardBody>
                  {/* <MDBCardTitle>Card title</MDBCardTitle> */}
                  <MDBTable>
                    <MDBTableBody>
                      
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol size='md' className='col-example'>
            <MDBCard style={{ maxWidth: '30rem' }}>
                <MDBCardBody>
                  {/* <MDBCardTitle>Card title</MDBCardTitle> */}
                  <MDBTable>
                    <MDBTableBody>
                      
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
