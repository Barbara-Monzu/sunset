

const category = document.getElementById("category").value
const cloudcover = document.getElementById("cloudcover").value

const coordinates = `?latitude=${latitude}&longitude=${longitude}`
const weather ='&hourly=cloudcover&daily=sunrise,sunset&timezone=Europe%2FBerlin'
const axiosApp = axios.create({ baseURL: "https://api.open-meteo.com/v1/forecast" + coordinates + weather })

function formatTime(time){
	let splitted = time.split("T")
	return splitted[1]
}

function getCloudCover(hour){
	let fullTime = hour.substring(0, 2) + hour.substring(3, 5)
	 return Math.round(Number(fullTime) / 100)
}

function getSunTime() {
	axiosApp.get()
		.then(response => {
			let sunset = formatTime(response.data.daily.sunset[0])
			let sunrise = formatTime(response.data.daily.sunrise[0])
			category === "sunrise" ? document.getElementById("sunrise").innerHTML = sunrise
				: document.getElementById("sunset").innerHTML = sunset
			
			
			let cloudCoverIndex
			category === "sunrise" ? cloudCoverIndex = getCloudCover(sunrise)
				: cloudCoverIndex = getCloudCover(sunset)

			let currentCloud = response.data.hourly.cloudcover[cloudCoverIndex]
			console.log(currentCloud);

		})
}

getSunTime()


