console.log('Working!')
const pDevice = document.getElementById('device-info')
const divWeatherInfo = document.getElementById('wather-info')
const imgWeather = document.getElementById('weather-icon')
const mainTag = document.getElementsByTagName('main')[0]

if ('geolocation' in navigator) {
  // it is compatible
  console.log("It's compatible")

  const apiKey = '9cf4f6d4e99e0075395476ce7c2f1aa7'

  // get html elements
  const h1City = document.getElementById('city')
  const pDescription = document.getElementById('weather-description')
  const spans = document.getElementsByTagName('span')

  // asking the position
  navigator.geolocation.getCurrentPosition(getCurrentPosition, callBackError)

  // geolocation functions
  function getCurrentPosition({coords}) {
    console.log('User allowed')
    pDevice.innerHTML = ''

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}`)
      .then(thenJson)
      .then(thenData)
  }
  function callBackError({code, message}) {
    console.log('Error code:', code)
    console.log('Message:', message)
    pDevice.innerHTML = `Error code: ${code} <br/> Message: ${message} </br> Please, turn on the localization and allow this site.`
  }
  
  // primisses functions
  const thenJson = response => response.json()
  const thenData  = data => weather(data)

  // otherfunctions
  function convertKelvinToCelsius(tempK) {
    return (tempK - 273.15).toFixed(2).replace('.', ',')
  }
  function convertDegToCard(deg) {
    let cord = ''
    if (deg >= 0 && deg < 22.5) {
      cord = 'N'
    } else if (deg >= 22.5 && deg < 45) {
      cord = 'NNE'
    } else if (deg >= 45 && deg < 67) {
      cord = 'NE'
    } else if (deg >= 67 && deg < 90) {
      cord = 'ENE'
    } else if (deg >= 90 && deg < 112.5) {
      cord = 'E'
    } else if (deg >= 112.5 && deg < 135) {
      cord = 'ESE'
    } else if (deg >= 135 && deg < 157.5) {
      cord = 'SE'
    } else if (deg >= 157.5 && deg < 180) {
      cord = 'SSE'
    } else if (deg >= 189 && deg < 202.5) {
      cord = 'S'
    } else if (deg >= 202.5 && deg < 225) {
      cord = 'SSO'
    } else if (deg >= 225 && deg < 247.5) {
      cord = 'SO'
    } else if (deg >= 247.5 && deg < 270) {
      cord = 'OSO'
    } else if (deg >= 270 && deg < 292.5) {
      cord = 'O'
    } else if (deg >= 292.5 && deg < 315) {
      cord = 'ONO'
    } else if (deg >= 315 && deg < 337.5) {
      cord = 'NO'
    } else if (deg >= 337.5 && deg <= 360) {
      cord = 'NNO'
    } else {
      cord = 'Error'
    }
  
    return cord
  }
  function convertMeterToKm(meter) { 
    return (meter * 3.6).toFixed(2).replace('.', ',')
  }

  // watherFunction
  function weather(data) {
    // get information
    const {main, description, icon} = data.weather[0]
    const {temp, feels_like, temp_min, temp_max, humidity} = data.main
    const {country} = data.sys
    const {speed, deg} = data.wind

    // "trying react"
    mainTag.style.display = 'block'
    
    // insert information
    h1City.innerHTML = `${data.name}, ${country}`
    pDescription.innerHTML = description

    spans[0].innerHTML = `${main}`
    spans[1].innerHTML = `Temp: ${convertKelvinToCelsius(temp)}°C`
    spans[2].innerHTML = `Feels like: ${convertKelvinToCelsius(feels_like)}°C`
    spans[3].innerHTML = `Temp min: ${convertKelvinToCelsius(temp_min)}°C`
    spans[4].innerHTML = `Temp max: ${convertKelvinToCelsius(temp_max)}°C`
    spans[5].innerHTML = `Humidity: ${humidity}%`
    spans[6].innerHTML = `Wind speed: ${convertMeterToKm(speed)}km/h`
    spans[7].innerHTML = `Direction: ${convertDegToCard(deg)}`
    spans[8].innerHTML = `Longitude: ${data.coord.lon}` 
    spans[9].innerHTML = `Latitude: ${data.coord.lat}`
  }

} else {
  alert("I'm sorry, but your browser does not support this function.")
  pDevice.innerHTML = "I'm sorry, but your browser does not support this function."
}
