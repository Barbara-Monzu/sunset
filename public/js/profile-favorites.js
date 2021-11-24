
function addFavorite(sunId) {
	const axiosApp = axios.create({ baseURL: `http://localhost:3000/suns/${category}/list/${sunId}/add-favorite` })

	axiosApp.post()
		.then(response => {
			console.log("added favorite")
		})
}

function deleteFavorite(sunId) {
	const axiosApp = axios.create({ baseURL: `http://localhost:3000/suns/${category}/list/${sunId}/delete-favorite` })

	axiosApp.post()
		.then(response => {
			console.log("deleted favorite")
		})
}

