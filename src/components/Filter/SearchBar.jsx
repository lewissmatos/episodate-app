import {
	Autocomplete,
	AutocompleteOption,
	Box,
	Button,
	IconButton,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { deleteHistoryElement } from "../../services/history.service";

function SearchBar({
	onChange,
	disabled,
	onSearch,
	onFocus,
	historyList,
	queries,
}) {
	//Input value state in order to handle its value
	const [inputValue, setInputValue] = useState("");

	//Handle the input value to make a search request with its value
	const onInputChange = (e) => {
		//Fucntion to make the search request
		onChange(e);
		setInputValue(e?.target?.value);
	};

	//Handle the history value clicked to make an inmediatelly request with the clicked item
	const onParamChange = (e, newValue) => {
		setInputValue(newValue);
		//Fucntion to make the search request
		onChange({ target: { name: "q", value: newValue } }, newValue);
	};

	//Delete an item from the history
	const onDeleteHistoryItem = (e, item) => {
		//Handle the onClick funciton propagation so it won't select a history item when clicking on detele item button
		e.stopPropagation();
		//Call the delete history list item function
		deleteHistoryElement(item);
		//Call onFocus function on the input in order to update the search history and not to see the deleted item
		onFocus();
	};

	//Call the search function with the keyboard "Enter" or "Return" key
	const onEnterKeyUp = (e) => {
		if (e.keyCode === 13) {
			onSearch();
		}
	};

	useEffect(() => {
		//If queries has a nullish value, set the value of the search input as an empty string
		if (!queries) {
			setInputValue("");
		}

		//Validate it everytime queries changes its value
	}, [queries]);
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				mb: 4,
			}}
		>
			<Autocomplete
				sx={{ width: "600px" }}
				name="q"
				onFocus={onFocus}
				onInputChange={onInputChange}
				size="lg"
				inputValue={inputValue || ""}
				onChange={onParamChange}
				renderOption={(props, option) => (
					<AutocompleteOption
						{...props}
						sx={{ display: "flex", justifyContent: "space-between" }}
					>
						{option}
						<IconButton
							onClick={(e) => onDeleteHistoryItem(e, option)}
							size="sm"
							variant="plain"
							color="danger"
						>
							<i className="fi fi-rr-circle-xmark"></i>
						</IconButton>
					</AutocompleteOption>
				)}
				options={historyList.map((option) => option.value)}
				placeholder="Search anything"
				type="search"
				freeSolo
				endDecorator={
					<Button disabled={disabled} onClick={onSearch} onKeyUp={onEnterKeyUp}>
						Search
					</Button>
				}
			/>
		</Box>
	);
}

export default SearchBar;
