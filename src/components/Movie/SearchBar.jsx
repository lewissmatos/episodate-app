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
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		if (!queries) {
			setInputValue("");
		}
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
				onInputChange={(e) => {
					onChange(e);
					setInputValue(e?.target?.value);
				}}
				size="lg"
				inputValue={inputValue || ""}
				onChange={(e, newValue) => {
					setInputValue(newValue);
					onChange({ target: { name: "q", value: newValue } }, newValue);
				}}
				renderOption={(props, option) => (
					<AutocompleteOption
						{...props}
						sx={{ display: "flex", justifyContent: "space-between" }}
					>
						{option}
						<IconButton
							onClick={(e) => {
								e.stopPropagation();
								deleteHistoryElement(option);
								onFocus();
							}}
							size="sm"
							variant="plain"
							color="danger"
						>
							<i className="fi fi-rr-circle-xmark"></i>{" "}
						</IconButton>
					</AutocompleteOption>
				)}
				options={historyList.map((option) => option.value)}
				placeholder="Search anything"
				type="search"
				freeSolo
				render
				endDecorator={
					<Button
						disabled={disabled}
						onClick={onSearch}
						onKeyUp={(e) => {
							if (e.keyCode === 13) {
								onSearch();
							}
						}}
					>
						Search
					</Button>
				}
			/>
		</Box>
	);
}

export default SearchBar;
