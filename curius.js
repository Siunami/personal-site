const axios = require("axios");

function callAPI(url, method, data, headers) {
	return axios({
		method: method,
		url: url,
		data: data,
		headers: headers,
	});
}

let url = "https://curius.app/api/users/524/links";

callAPI(url, "GET", null, {})
	.then((response) => {
		// Handle the response data here
		console.log(response.data);
	})
	.catch((error) => {
		// Handle any errors that occurred during the request
		console.error(error);
	});
