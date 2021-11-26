const latitude = document.getElementById("latitude")
const longitude = document.getElementById("longitude")
const locationBtn = document.getElementById("getCurrentLocation")
const checkNavigator = document.getElementById("check-navigator")
const addressGroup = document.getElementById("address-group")

function getNavigatorPosition() {
	console.log("en navigator")
	addressGroup.remove()

	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(
			(position) => {


				latitude.value = position.coords.latitude,
					longitude.value = position.coords.longitude
				checkNavigator.value = "true"
			},

			() => {
				console.log('Error in the geolocation service.');
			});

	} else {

		console.log('Browser does not support geolocation.');
	}
}

locationBtn.addEventListener('click', getNavigatorPosition)
