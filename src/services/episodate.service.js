import { serviceHttp } from "./httpService.instance";

//Creating getAll movies, followin the most-updated standard references
export const getMovies = ({ url, params = {} }) => {
	if (!url) return console.error("Missing request url");
	//Mapping the object params in order to get them as a Sting value
	let queryParams = "";
	//Validating if the params are coming or aren't
	if (params) {
		queryParams = Object.keys(params)
			?.map((key, index) => {
				//Creating the value in the query, gotten from the position of the key
				let value = Object.values(params)[index];
				return `${key}=${value}`;
			})
			.join("");
	}
	return serviceHttp()
		.get(`${url}?${queryParams}`)
		.then((res) => res);
};
