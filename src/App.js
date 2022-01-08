import React, { useState } from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { About } from './components/About';
import { Details } from './components/Details';
import { 
  MDBInputGroup, 
  MDBInputGroupElement, 
  MDBBtn, 
  MDBIcon,
  MDBCard, 
  MDBCardBody} from 'mdb-react-ui-kit';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import 'weather-icons/css/weather-icons.css'
import './App.css';

function App() {
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
  const [coord, setCoord] = useState([]);
  const [forecast, setForecast] = useState(false);

  const [day1, setDay1] = useState([])
  const [day2, setDay2] = useState([])
  const [day3, setDay3] = useState([])
  const [day4, setDay4] = useState([])
  const [day5, setDay5] = useState([])
  const [date1, setDate1] = useState([])
  const [date2, setDate2] = useState([])
  const [date3, setDate3] = useState([])
  const [date4, setDate4] = useState([])
  const [date5, setDate5] = useState([])
  const [desc1, setDesc1] = useState([])
  const [desc2, setDesc2] = useState([])
  const [desc3, setDesc3] = useState([])
  const [desc4, setDesc4] = useState([])
  const [desc5, setDesc5] = useState([])

  const search = e => {
    e.preventDefault()
    axios.get('https://api.openweathermap.org/data/2.5/weather?q='+ formValue +'&units=metric&appid=c3f0a51be707c69778e40244469ebb16')
      .then(res => {
        axios.get('https://api.openweathermap.org/data/2.5/onecall?lat='+ res.data.coord.lat +'&lon='+ res.data.coord.lon +'&units=metric&exclude=hourly,minutely&appid=156804b88c63148250bd1edc40474ce8')
        .then(resp => {
          console.log(resp)
          setDay1(resp.data.daily[1].temp)
          setDay2(resp.data.daily[2].temp)
          setDay3(resp.data.daily[3].temp)
          setDay4(resp.data.daily[4].temp)
          setDay5(resp.data.daily[5].temp)
          setDate1(resp.data.daily[1])
          setDate2(resp.data.daily[2])
          setDate3(resp.data.daily[3])
          setDate4(resp.data.daily[4])
          setDate5(resp.data.daily[5])
          setDesc1(resp.data.daily[1].weather[0])
          setDesc2(resp.data.daily[2].weather[0])
          setDesc3(resp.data.daily[3].weather[0])
          setDesc4(resp.data.daily[4].weather[0])
          setDesc5(resp.data.daily[5].weather[0])
          
        })
        .catch(err => {
          console.log(err)
        })
        console.log(res)
        console.log(res.data.main)
        setCity(res.data.main)
        setAtm(res.data.weather[0])
        setWind(res.data.wind)
        setName(res.data.name)
        setCoord(res.data.coord)
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
      })
      setFormValue('');
    }

  const toggleFlag = () => {
    setForecast(!forecast)
  };

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
                <MDBInputGroupElement value={formValue} onChange={(e) => {setFormValue(e.target.value);}} placeholder="Enter City or State" type='text' />
                <MDBBtn type="submit" disabled={!formValue} onClick={toggleFlag} style={{backgroundColor: '#2E2E2E'}}><MDBIcon fas icon='search' /></MDBBtn>
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
        sunrise = {astro.sunrise} sunset = {astro.sunset} lat = {coord.lat} lon = {coord.lon} forecastFlag = {forecast}
        day1max = {day1.max} day1min = {day1.min}
        day2max = {day2.max} day2min = {day2.min} day3max = {day3.max} day3min = {day3.min} day4max = {day4.max} day4min = {day4.min}
        day5max = {day5.max} day5min = {day5.min} date1 = {date1.dt} date2 = {date2.dt} date3 = {date3.dt} date4 = {date4.dt} 
        date5 = {date5.dt} desc1 = {desc1.description} desc2 = {desc2.description} desc3 = {desc3.description} desc4 = {desc4.description} desc5 = {desc5.description}
        id1 = {desc1.id} id2 = {desc2.id} id3 = {desc3.id} id4 = {desc4.id} id5 = {desc5.id}
        
        
        ></Details> : ""}
      
    </>
  );
}

export default App;
