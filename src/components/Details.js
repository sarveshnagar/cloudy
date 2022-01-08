import React, {useState} from 'react'
import { Forecast } from './Forecast';
import { 
    MDBBtn, 
    MDBIcon,
    MDBCard, 
    MDBCardBody, 
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBTable,
    MDBCollapse,
    MDBTableBody } from 'mdb-react-ui-kit';

export const Details = (props) => {
    const [showShow, setShowShow] = useState(false)
    const [text, setText] = useState('show weather forecast')

    const toggleShow = () => {
      setShowShow(!showShow)
      text === 'show weather forecast' ? setText('hide weather forecast') : setText('show weather forecast')

    };
    
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
      <div style={{textAlign: 'center'}} className='my-4'>
        <MDBBtn className='font' color='dark' rounded onClick = {toggleShow} >{text}</MDBBtn>
        <MDBCollapse show={showShow}>
          <Forecast lat = {props.lat} lon = {props.lon} day1max = {props.day1max} day1min = {props.day1min}
          day2max = {props.day2max} day2min = {props.day2min} day3max = {props.day3max} day3min = {props.day3min} day4max = {props.day4max} day4min = {props.day4min}
          day5max = {props.day5max} day5min = {props.day5min} date1 = {props.date1} date2 = {props.date2} date3 = {props.date3} date4 = {props.date4} 
          date5 = {props.date5} desc1 = {props.desc1} desc2 = {props.desc2} desc3 = {props.desc3} desc4 = {props.desc4} desc5 = {props.desc5}
          id1 = {props.id1} id2 = {props.id2} id3 = {props.id3} id4 = {props.id4} id5 = {props.id5}></Forecast>
        </MDBCollapse>
      </div>
      <div className='font'>
        <MDBContainer className='mb-3'>
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
    </>
  )
}
