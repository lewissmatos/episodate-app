import axios from "axios";

//Instance Axios base url and config in order not to repeat myself
const instance = axios.create({

	//Use the api url as base
	baseURL: `https://www.episodate.com/api/`,
	headers: {
		"Content-Type": "application/json",
	},
});

//Export the service with the usable methods, in this case, only http get method
export const serviceHttp = () => {

	//Create the get method to make the requests
	const get = (url) => instance.get(url).then((response) => response?.data);
	return {
		get,
	};
};
