

const deleteFav = document.querySelectorAll('#removeFavorite').forEach(elem => elem.addEventListener('click', e => {
	console.log(e)
	const category = elem.childNodes[3].value;
	const id = elem.childNodes[1].value;
	deleteFavorite(id, category)
	const firstParent = e.currentTarget.parentNode
	firstParent.parentNode.remove()
}
))


function deleteFavorite(sunId, category) {
	const axiosApp = axios.create({ baseURL: `https://sunsents-sunrises.herokuapp.com/suns/${category}/list/${sunId}/delete-favorite` })

	axiosApp.post()
		.then(response => {
			console.log("deleted favorite")
		})
}


