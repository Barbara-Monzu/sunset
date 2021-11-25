

const category = document.getElementById("category").innerHTML
const temperature = document.getElementById("temperature")
const cloudcover = document.getElementById("cloudcover")

const coordinates = `?latitude=${latitude}&longitude=${longitude}`
const weather ='&hourly=cloudcover,temperature_2m&daily=sunrise,sunset&timezone=Europe%2FBerlin'


function formatTime(time){
	let splitted = time.split("T")
	return splitted[1]
}

function getHourIndex(hour){
	let fullTime = hour.substring(0, 2) + hour.substring(3, 5)
	 return Math.round(Number(fullTime) / 100)
}

function cloudCoverMessage(currentCloud){
	if (currentCloud <= 25){
		return `It's a perfect day to go see this beautiful ${category}`
	}
	else if (currentCloud > 25 && currentCloud <= 50){
		return `It's a bit cloudy today but you should go check this ${category}`
	}
	else if (currentCloud > 50 && currentCloud <= 75){
		return `It's cloudy today, you might miss this ${category}`
	}
	else if (currentCloud > 75 && currentCloud <= 125){
		return `It's very cloudy, today is not a good day for watching this ${category}`
	}
}

function temperatureMessage(currentTemp){
	return `Temperature at ${category} time: ${currentTemp}°C`

}

function getSunTime() {
	
	const axiosApp = axios.create({ baseURL: "https://api.open-meteo.com/v1/forecast" + coordinates + weather })

	axiosApp.get()
		.then(response => {
			let sunset = formatTime(response.data.daily.sunset[0])
			let sunrise = formatTime(response.data.daily.sunrise[0])
			category === "sunrise" ? document.getElementById("sunrise").innerHTML = sunrise
				: document.getElementById("sunset").innerHTML = sunset
			
			
			let cloudCoverIndex
			category === "sunrise" ? cloudCoverIndex = getHourIndex(sunrise)
				: cloudCoverIndex = getHourIndex(sunset)

			let currentCloud = response.data.hourly.cloudcover[cloudCoverIndex]
			let currentTemp = response.data.hourly.temperature_2m[cloudCoverIndex]
			cloudcover.innerHTML = cloudCoverMessage(currentCloud);
			temperature.innerHTML = temperatureMessage(currentTemp);


		})
}

getSunTime()


