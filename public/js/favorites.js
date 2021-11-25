const sunId = document.getElementById('sun-id').value
const favoriteBtn = document.getElementById('add-favorite-btn')
const favoriteDeleteBtn = document.getElementById('delete-favorite-btn')
const advice = document.getElementById('advice')
const favoriteButton = document.querySelector(".favorite-button")


function addFavorite() {
	const axiosApp = axios.create({ baseURL: `http://localhost:3000/suns/${category}/list/${sunId}/add-favorite` })

	axiosApp.post()
		.then(response => {
			console.log("added favorite")
		})
		.catch(error => { console.log(error) })
}

function deleteFavorite() {
	const axiosApp = axios.create({ baseURL: `http://localhost:3000/suns/${category}/list/${sunId}/delete-favorite` })

	axiosApp.post()
		.then(response => {
			console.log("deleted favorite")
		})
}

function checkFavorites() {
	const axiosApp = axios.create({ baseURL: `http://localhost:3000/api/get-favorites` })

	axiosApp.get()
		.then(response => {
			response.data.includes(sunId) ? advice.textContent = 'Ya lo has añadido a favoritos' : null
			response.data.includes(sunId) ? favoriteButton.classList.add("is-favorite")  : console.log("no esta en favoritos")
		})

	console.log("Estes es el id de checkfavorites", sunId)

}

favoriteButton.addEventListener("click", (event) => {
	const button = event.currentTarget;
	if (button.classList.contains("is-favorite")) {
		deleteFavorite()
	}
	else {
		addFavorite()
	}
	button.classList.toggle("is-favorite");
});


checkFavorites(sunId);
