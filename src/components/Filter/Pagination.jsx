import { Box, IconButton } from "@mui/joy";

const Pagination = ({ moviesData, page, setRequestQueries, onChangePage }) => {
	//Send the number 1 to the onChangePage function to make a request with the param "page" by sending  the value 1
	const firstPage = () => {
		setRequestQueries((prevVal) => ({ ...prevVal, page: 1 }));
		onChangePage(1);
	};
	//Send the page - 1 to the onChangePage function to make a request with the param "page" by sending  the previous value
	const previousPage = () => {
		setRequestQueries((prevVal) => ({ ...prevVal, page: page - 1 }));
		onChangePage(page - 1);
	};
	//Send the page + 1 to the onChangePage function to make a request with the param "page" by sending  the next value
	const nextPage = () => {
		setRequestQueries((prevVal) => ({ ...prevVal, page: page + 1 }));
		onChangePage(page + 1);
	};
	/*Send the property pages of the moviesData object to the onChangePage function 
	to make a request with the param "page" by sending the pages quantity value */
	const lastPage = () => {
		setRequestQueries((prevVal) => ({ ...prevVal, page: moviesData?.pages }));
		onChangePage(moviesData?.pages);
	};

	/* Map the buttons in an object so the Button Component can be instanced 
	just once with the object params, by having the props: 
	label, which is the text to be shown as button's function indicator;
	onClick, which is the function expected to be called when clicking;
	disabled, which is a boolean value set to disable the button when true.
	 */
	const paginationOptions = [
		{
			label: "First",
			onClick: firstPage,
			disabled: page === 1,
		},
		{
			label: "Prev",
			onClick: previousPage,
			disabled: moviesData?.pages === 1,
		},
		{
			label: "Next",
			onClick: nextPage,
			disabled: moviesData?.pages === 1 || moviesData?.pages === page,
		},
		{
			label: "Last",
			onClick: lastPage,
			disabled: page === moviesData?.pages,
		},
	];

	return (
		<Box
			sx={{
				backgroundColor: "white",
				display: "flex",
				flexDirection: "row",
				padding: 0.5,
				borderRadius: 8,
				height: 40,
				columnGap: 0.5,
				alignContent: "center",
				alignItems: "center",
				justifyContent: "center",
				maxWidth: 180,
			}}
		>
			{paginationOptions?.map((option) => (
				<IconButton
					key={option?.label}
					sx={{ fontSize: 14 }}
					onClick={option?.onClick}
					disabled={option?.disabled}
				>
					{option?.label}
				</IconButton>
			))}
		</Box>
	);
};

export default Pagination;
