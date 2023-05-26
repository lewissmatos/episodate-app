//Get the whole search history function
export const getSearchHistory = () => {
	//Get the history from local storage
	//Use JSON functions to parse the local storage string value into an array
	return JSON.parse(localStorage.getItem("history"));
};

//Add a new item to the search history
export const setSearchHistoryItem = (item) => {
	//Use JSON functions to parse the local storage string value into an array
	let history = JSON.parse(localStorage.getItem("history")) || [];

	//Validate if the item already exists
	const foundItem = history?.find((record) => record?.value === item);

	//If the item exists detele it from the history
	if (foundItem)
		history = history.filter((record) => record?.id !== foundItem?.id);

	//Declare the item id
	let id = 1;

	//Function to assign an id to the item
	const getRandomId = (max) => {
		//Use Math library to generate a random number from 1 - 10
		id = Math.floor(Math.random() * max);

		//Validate if the id aready exists
		if (history?.some((record) => record?.id === id)) {
			//If the id already exists in the list, use recursion to re-call the function and assign a new id
			id = getRandomId(10);
		}
	};

	//Call the id assigner function
	getRandomId(10);

	const newItem = {
		id,
		value: item,
	};

	//Add the new item to the search history list
	history.unshift(newItem);

	//Limit the quantity of history limits to 10
	if (history.length > 10) history.splice(10);

	//Save the new history to local storage
	localStorage.setItem("history", JSON.stringify(history));

	//Return the history
	return history;
};

//Function to delete an item from the search history
export const deleteHistoryElement = (item) => {
	//Get the search history list
	let history = getSearchHistory();

	//Filter the list in order to exclude the item
	let newHistory = history?.filter((record) => record?.value !== item);

	//Save the new history to local storage
	localStorage.setItem("history", JSON.stringify(newHistory));
};
