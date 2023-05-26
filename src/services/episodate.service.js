import { serviceHttp } from "./httpService.instance";

//Create get all movies function
export const getMovies = ({ url, params = {} }) => {
	if (!url) return console.error("Missing request url");
	//Map the object params in order to get them as a string-typed value
	let queryParams = "";
	//Validate if the params are coming or aren't
	if (params) {
		queryParams = Object.keys(params)
			?.map((key, index) => {
				//Create the value in the query,it's gotten from the position of the key
				let value = Object.values(params)[index];
				return `${key}=${value}`;
			})
			.join("");
	}
	return serviceHttp()
		.get(`${url}?${queryParams}`)
		.then((res) => res);
};
