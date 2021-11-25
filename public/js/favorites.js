const sunId = document.getElementById('sun-id').value
const favoriteBtn = document.getElementById('add-favorite-btn')
const favoriteDeleteBtn = document.getElementById('delete-favorite-btn')
const advice = document.getElementById('advice')



function addFavorite() {
	const axiosApp = axios.create({ baseURL: `http://localhost:3000/suns/${category}/list/${sunId}/add-favorite` })

	axiosApp.post()
		.then(response => {
			checkFavorites(sunId)
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

function checkFavorites(id) {
	const axiosApp = axios.create({ baseURL: `http://localhost:3000/api/get-favorites` })

	axiosApp.get()
		.then(response => {
			response.data.includes(id) ? advice.textContent = 'Ya lo has añadido a favoritos' : null
		})

	console.log("Estes es el id de checkfavorites", id)

}


favoriteBtn.addEventListener('click', addFavorite)
favoriteDeleteBtn.addEventListener('click', deleteFavorite)
