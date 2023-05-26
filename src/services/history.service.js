export const getSearchHistory = () => {
	return JSON.parse(localStorage.getItem("history"));
};

export const setSearchHistoryItem = (item) => {
	let history = JSON.parse(localStorage.getItem("history")) || [];

	const foundItem = history?.find((record) => record?.value === item);

	if (foundItem)
		history = history.filter((record) => record?.id !== foundItem?.id);

	let id = 1;
	const getRandomId = (max) => {
		id = Math.floor(Math.random() * max);
		if (history?.some((record) => record?.id === id)) {
			id = getRandomId(10);
		}
	};
	getRandomId(10);

	history.unshift({
		id,
		value: item,
	});

	if (history.length > 10) history.splice(10);

	localStorage.setItem("history", JSON.stringify(history));
	return history;
};

export const deleteHistoryElement = (item) => {
	let history = getSearchHistory();

	let newHistory = history?.filter((record) => record?.value !== item);

	localStorage.setItem("history", JSON.stringify(newHistory));
};
