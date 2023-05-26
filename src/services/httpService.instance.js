import axios from "axios";

//Instancing Axios base url and config in order not to repeat myself
const instance = axios.create({
	baseURL: `https://www.episodate.com/api/`,
	headers: {
		"Content-Type": "application/json",
	},
});

//Exporting the service with the usable methods, in this case, only http get method
export const serviceHttp = () => {
	const get = (url) => instance.get(url).then((response) => response?.data);
	return {
		get,
	};
};
