

const deleteFav = document.querySelectorAll('#removeFavorite').forEach(elem => elem.addEventListener('click', e => {
	console.log(e)
	const category = elem.childNodes[3].value;
	const id = elem.childNodes[1].value;
	deleteFavorite(id, category)
}
))


function addFavorite(sunId) {
	const axiosApp = axios.create({ baseURL: `http://localhost:3000/suns/${category}/list/${sunId}/add-favorite` })

	axiosApp.post()
		.then(response => {
			console.log("added favorite")
		})
}

function deleteFavorite(sunId, category) {
	const axiosApp = axios.create({ baseURL: `http://localhost:3000/suns/${category}/list/${sunId}/delete-favorite` })

	axiosApp.post()
		.then(response => {
			console.log("deleted favorite")
		})
}


