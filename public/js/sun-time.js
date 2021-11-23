

const category = document.getElementById("category").value 

const coordinates = `?lat=${latitude}&lng=${longitude}`

const axiosApp = axios.create({baseURL: "https://api.sunrise-sunset.org/json" + coordinates})


function getSunTime(){
	axiosApp.get()
		.then(response => {
			const sunrise = response.data.results.sunrise
			const sunset = response.data.results.sunset
            category === "sunrise" ? document.getElementById("sunrise").innerHTML = sunrise 
            : document.getElementById("sunset").innerHTML = sunset
		})
}

getSunTime()
