const sunId = document.getElementById('sun-id').value
const favoriteBtn = document.getElementById('add-favorite-btn')
const favoriteDeleteBtn = document.getElementById('delete-favorite-btn')


function addFavorite(){
	const axiosApp = axios.create({ baseURL: `http://localhost:3000/suns/${category}/list/${sunId}/add-favorite`})

	axiosApp.post()
		.then(response => {
			console.log("added favorite")
		})
}

function deleteFavorite(){
	const axiosApp = axios.create({ baseURL: `http://localhost:3000/suns/${category}/list/${sunId}/delete-favorite` })

	axiosApp.post()
		.then(response => {
			console.log("deleted favorite")
		})
}

favoriteBtn.addEventListener('click', addFavorite)
favoriteDeleteBtn.addEventListener('click', deleteFavorite)
