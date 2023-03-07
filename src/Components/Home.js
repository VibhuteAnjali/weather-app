import React, { useState } from 'react'
import axios from "axios"

export default  function Home() {
    const state={
		 date : new Date().toLocaleDateString()
		}
	
	const [data, setData] = useState({})
	const [location, setLocation] = useState('')
	const icon = `${data.weather ? data.weather[0].icon:null}`;
	const imgURL =`https://openweathermap.org/img/wn/${icon}@2x.png`;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=537c9830c4c314a5b8789b8976a93aff&units=imperial`;
	const searchLocation = (event) => {
		if (event.key === 'Enter') {
			axios.get(url).then((response) => {
				setData(response.data)
				console.log(response.data);
				console.log(imgURL);
			})
			setLocation('')
		}
	}
	return (
		<>
		<div className="info">
			<div className="date">
	     {state.date}
			</div>
			
		</div>
			<div className="search">
				<input type="text" name="City" id="City"
					value={location}
					placeholder="City"
					onKeyDown={searchLocation}
					onChange={(event) => { setLocation(event.target.value) }} />
			</div>
			<div className='container'>
				<div className="top">
					<h4>{data.name}</h4>
					<div className="temp">
						{data.main ? <h1>{data.main.temp}°F</h1> : null}

					</div>
					<div className="description">
						<div>
							{data.weather ? <img alt="icon" className ="icon" src={imgURL}/>:null }
						
						</div>
						
						<h4>{data.weather ? <p>{data.weather[0].main}
						</p> : null}</h4>
					</div>
				</div>

				{data.name !== undefined &&

					<div className="bottom">
						<div className="feels">
							{data.main ? <p className='bold'>{data.main.feels_like}°F</p> : null}
							<h4 className='desc'>Hows the feel</h4>
						</div>
						<div className="humidity">
							{data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
							<h4 className='desc'>Humidity</h4>
						</div>
						<div className="winds">
							{data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
							<h4 className='desc'>Winds</h4>
						</div>
					</div>
				}
			</div>
		</>
	)
}
