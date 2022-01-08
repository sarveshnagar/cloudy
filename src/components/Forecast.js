import React, { useEffect, useState } from 'react'
import {
	MDBCard,
	MDBCardBody,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBTable,
	MDBTableBody,
	MDBCarousel,
	MDBCarouselInner,
	MDBCarouselItem,
	MDBCardText,
	MDBIcon,
} from 'mdb-react-ui-kit';

export const Forecast = (props) => {

	const convertDate = (e) => {
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
		];
		var date = new Date(e * 1000);
		return monthNames[date.getMonth()] + ' ' + date.getDate() + ',' + date.getFullYear();
	}

	var icon = ''
	function myIcon(range) {
		if (range >= 200 && range <= 232)
			icon = 'wi-thunderstorm'
		else if (range >= 300 && range <= 321)
			icon = 'wi-sleet'
		else if (range >= 500 && range <= 531)
			icon = 'wi-storm-showers'
		else if (range >= 600 && range <= 622)
			icon = 'wi-snow'
		else if (range >= 701 && range <= 781)
			icon = 'wi-fog'
		else if (range === 800)
			icon = 'wi-day-sunny'
		else if (range >= 801 && range <= 804)
			icon = 'wi-cloudy'
		else
			icon = ''
		return icon
	}
	

	return (
		<div className='font my-5 text-white'>
			<MDBContainer>
				<MDBCard style={{ maxWidth: '80rem', textAlign: 'center', backgroundColor: '#212121' }}>
					<MDBCardBody>
						<MDBCarousel showIndicators showControls>
							<MDBCarouselInner>
								<MDBCarouselItem className='active'>
									<div className='mb-5'>
										{convertDate(props.date1)}
									</div>
									<MDBRow className='mb-3'>
										<MDBCol className='col-md-4'>
											<MDBTable className='table-dark shadow-5'>
												<MDBTableBody>
													<tr>
														<th scope='row'>Max </th>
														<td>{props.day1max}°C</td>
													</tr>
													<tr>
														<th scope='row'>Min </th>
														<td>{props.day1min}°C</td>
													</tr>
												</MDBTableBody>
											</MDBTable>
										</MDBCol>
										<MDBCol className='col-md-4'>
											<i className={`wi ${myIcon(props.id1)} display-2 text-center`}></i>
										</MDBCol>
										<MDBCol className='col-md-4'>
											<MDBTable className='table-dark shadow-5'>
												<MDBTableBody>
													<tr>
														<th scope='row'>Atmosphere <MDBIcon fas icon="water" /></th>
														<td>{props.desc1}</td>
													</tr>
												</MDBTableBody>
											</MDBTable>
										</MDBCol>
									</MDBRow>
								</MDBCarouselItem>

								<MDBCarouselItem>
									<div className='mb-5'>
										{convertDate(props.date2)}
									</div>
									<MDBRow className='mb-3'>
										<MDBCol className='col-md-5'>
											<MDBTable className='table-dark shadow-5 rounded'>
												<MDBTableBody>
													<tr>
														<th scope='row'>Max </th>
														<td>{props.day2max}°C</td>
													</tr>
													<tr>
														<th scope='row'>Min </th>
														<td>{props.day2min}°C</td>
													</tr>
												</MDBTableBody>
											</MDBTable>
										</MDBCol>
										<MDBCol className='col-md-3'>
											<i className={`wi ${myIcon(props.id2)} display-2 text-center`}></i>
										</MDBCol>
										<MDBCol className='col-md-4'>
											<MDBTable className='table-dark shadow-5'>
												<MDBTableBody>
													<tr>
														<th scope='row'>Atmosphere <MDBIcon fas icon="water" /></th>
														<td>{props.desc2}</td>
													</tr>
												</MDBTableBody>
											</MDBTable>
										</MDBCol>
									</MDBRow>
								</MDBCarouselItem>

								<MDBCarouselItem>
									<div className='mb-5'>
										{convertDate(props.date3)}
									</div>
									<MDBRow className='mb-3'>
										<MDBCol className='col-md-5'>
											<MDBTable className='table-dark shadow-5'>
												<MDBTableBody>
													<tr>
														<th scope='row'>Max </th>
														<td>{props.day3max}°C</td>
													</tr>
													<tr>
														<th scope='row'>Min </th>
														<td>{props.day3min}°C</td>
													</tr>
												</MDBTableBody>
											</MDBTable>
										</MDBCol>
										<MDBCol className='col-md-3'>
											<i className={`wi ${myIcon(props.id3)} display-2 text-center`}></i>
										</MDBCol>
										<MDBCol className='col-md-4'>
											<MDBTable className='table-dark shadow-5'>
												<MDBTableBody>
													<tr>
														<th scope='row'>Atmosphere <MDBIcon fas icon="water" /></th>
														<td>{props.desc3}</td>
													</tr>
												</MDBTableBody>
											</MDBTable>
										</MDBCol>
									</MDBRow>
								</MDBCarouselItem>

								<MDBCarouselItem>
									<div className='mb-5'>
										{convertDate(props.date4)}
									</div>
									<MDBRow className='mb-3'>
										<MDBCol className='col-md-5'>
											<MDBTable className='table-dark shadow-5'>
												<MDBTableBody>
													<tr>
														<th scope='row'>Max </th>
														<td>{props.day4max}°C</td>
													</tr>
													<tr>
														<th scope='row'>Min </th>
														<td>{props.day4min}°C</td>
													</tr>
												</MDBTableBody>
											</MDBTable>
										</MDBCol>
										<MDBCol className='col-md-3'>
											<i className={`wi ${myIcon(props.id4)} display-2 text-center`}></i>
										</MDBCol>
										<MDBCol className='col-md-4'>
											<MDBTable className='table-dark shadow-5'>
												<MDBTableBody>
													<tr>
														<th scope='row'>Atmosphere <MDBIcon fas icon="water" /></th>
														<td>{props.desc4}</td>
													</tr>
												</MDBTableBody>
											</MDBTable>
										</MDBCol>
									</MDBRow>
								</MDBCarouselItem>

								<MDBCarouselItem>
									<div className='mb-5'>
										{convertDate(props.date5)}
									</div>
									<MDBRow className='mb-3'>
										<MDBCol className='col-md-5'>
											<MDBTable className='table-dark shadow-5'>
												<MDBTableBody>
													<tr>
														<th scope='row'>Max </th>
														<td>{props.day5max}°C</td>
													</tr>
													<tr>
														<th scope='row'>Min </th>
														<td>{props.day5min}°C</td>
													</tr>
												</MDBTableBody>
											</MDBTable>
										</MDBCol>
										<MDBCol className='col-md-3'>
											<i className={`wi ${myIcon(props.id5)} display-2 text-center`}></i>
										</MDBCol>
										<MDBCol className='col-md-4'>
											<MDBTable className='table-dark shadow-5'>
												<MDBTableBody>
													<tr>
														<th scope='row'>Atmosphere <MDBIcon fas icon="water" /></th>
														<td>{props.desc5}</td>
													</tr>
												</MDBTableBody>
											</MDBTable>
										</MDBCol>
									</MDBRow>
								</MDBCarouselItem>
							</MDBCarouselInner>
						</MDBCarousel>
					</MDBCardBody>
				</MDBCard>
			</MDBContainer>

		</div>
	)
}
