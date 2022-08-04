import React from 'react';
import './App.css';
import sunrise from './icons/sunrise.png';
import sunset from './icons/sunset.png';

// (this.state.data.dt) < Math.floor(Date.now() / 1000)
const night = {
  backgroundColor: '#131862',

}
const day = {
  backgroundColor: '#add8e6',
}


const SunriseSunset = (props) => {
  let date = new Date(props.data * 1000);
  return (
    <div className="timeSun">
      {
        date.getHours() < 10 ?
          '0' + date.getHours()
        :
          date.getHours()
      }
      :
      {
        date.getMinutes() < 10 ?
          '0' + date.getMinutes()
        :
          date.getMinutes()
      }
      :
      {
        date.getSeconds() < 10 ?
          '0' + date.getSeconds()
        :
          date.getSeconds()
      }
    </div>
  );
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '7e67df6d0d80c4e0aa3fcaf56a8e689f',
      data: {},
      lat: 0,
      lon: 0,
    }
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      let api_key = this.state.key;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
      console.log(url)
      async function getOpenWeatherData() {
        const response = await fetch(url);
        const responseJSON = await response.json();
        return responseJSON;
      }
      getOpenWeatherData().then(
        (response) => {
          // console.log(response)
          this.setState({
            data: response
          })
        },
        (error) => {
          console.log(error)
        },
      );
    })



  }


  render() {
    console.log(
      (this.state.data.dt), Math.floor(Date.now() / 1000)
    );
    if (Object.keys(this.state.data).length > 0) {
      return (
        <div id="content">
          <div id="divInfoTemp">
            <div id="mainTempInfo">
              <span id="actual">Actual</span>
              <div>
                <img src={'https://openweathermap.org/img/wn/' + this.state.data.weather[0].icon + '@4x.png'} alt='icon' />
                <span>
                {this.state.data.main.temp} °C
                </span>
              </div>
            </div>

            <div id="contentTempConfort">
              <div id="tempsInfo">
                <div>
                  <span className='temp'>
                    {this.state.data.main.temp_min} °C
                  </span>
                  <span>Min</span>
                </div>

                <div>
                  <span className='temp'>
                    {this.state.data.main.temp_max} °C
                  </span>
                  <span>Max</span>
                </div>
              </div>

              <div id="confortInfo">
                <div id='cloud'>
                  <img src={'https://openweathermap.org/img/wn/04d@2x.png'} alt="nubes" />
                  <span>{this.state.data.clouds.all} %</span>
                </div>
                <div id='humidity'>
                  <span>
                    Humidity
                  </span>
                  <span className="percentage">
                    {this.state.data.main.humidity} %
                  </span>
                </div>
              </div>
            </div>

          </div>

          <div id="countryInfo">
            <span>
              {this.state.data.name}
            </span>
            <span>
              {this.state.data.sys.country}
            </span>
          </div>

          <div id="sunInfo">
            <div>
              <img src={sunrise} alt='sunrise'/>
              <SunriseSunset data={this.state.data.sys.sunrise} />
            </div>

            <div>
              <img src={sunset} alt='sunset' />
              <SunriseSunset data={this.state.data.sys.sunset} />
            </div>

          </div>

        </div>
      );
    }
  }
};


export default App;
