import { useEffect, useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/joy";
import { getMovies } from "../../services/episodate.service";
import MovieCard from "../Movie/MovieCard";
import SearchBar from "../Filter/SearchBar";
import MovieDetails from "../Movie/MovieDetails";
import NoMovieFound from "../Movie/NoMovieFound";
import "./homescreen.css";
import {
	getSearchHistory,
	setSearchHistoryItem,
} from "../../services/history.service";
import Pagination from "../Filter/Pagination";

const Homescreen = () => {
	//Stative variables used for controlling the request and behavior
	const [moviesData, setMoviesData] = useState();
	const [requestQueries, setRequestQueries] = useState();
	const [searchHistory, setSearchHistory] = useState([]);
	const [openMovieDetails, setOpenMovieDetails] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingDetails, setIsLoadingDetails] = useState({
		isLoading: false,
		id: null,
	});

	//Movie Details State with all the params initialized with null value
	const [movieDetails, setMovieDetails] = useState({
		id: null,
		name: null,
		start_date: null,
		country: null,
		network: null,
		status: null,
		image_thumbnail_path: null,
	});

	/* Get all movies, using an url and optional params. 
	This function is used for any type of rquest using the API */
	const onGetMovies = async ({ url, params }) => {
		setIsLoading(true);
		if (params) {
			onAddSearchHistoryParam(params?.q);
		}
		onGetSearchHistory();
		const res = await getMovies({ url, params });
		setMoviesData(res);
		setIsLoading(false);
	};

	/* Change Query param to search a movie. Ex: ?q=*query*.
	Also, it's used to select a value directly from the search history */
	const onQueryParamChange = (e, directValue) => {
		if (!e?.target?.value) {
			onResetSearch();
		} else
			setRequestQueries((prevVal) => ({
				...prevVal,
				[e?.target?.name]: e?.target?.value,
			}));

		//"directValue" indicates that the function has to call the movies inmediatelly
		if (directValue) {
			onGetMovies({
				url: "search",
				params: { ...requestQueries, [e?.target?.name]: e?.target?.value },
			});
			onGetSearchHistory();
		}
	};

	//Reset the request and the query to their initial values
	const onResetSearch = () => {
		setRequestQueries();
		onGetMovies({ url: "most-popular" });
	};

	//Get movie's details by the url and params
	const onGetDetails = async ({ url, params }) => {
		setIsLoadingDetails({ isLoading: true, id: params?.q });
		//The params have movie's id so it can get its details
		const res = await getMovies({ url, params });

		//Set the movie's details to a state
		setMovieDetails(res?.tvShow);
		setIsLoadingDetails({ isLoading: false, id: null });
		setOpenMovieDetails(true);
	};

	const onCloseMovieDetails = () => {
		setOpenMovieDetails(false);
	};

	//Add item to thesearch history
	const onAddSearchHistoryParam = (item) => {
		setSearchHistoryItem(item);
	};

	//Get item to the search history
	const onGetSearchHistory = () => {
		let history = getSearchHistory();
		setSearchHistory(history);
	};

	//Search movies by query params
	const onSearch = () => {
		onGetMovies({ url: "search", params: requestQueries });
		onGetSearchHistory();
	};

	//Handle the pagination by changing the curren page
	const onChangePage = (page) => {
		onGetMovies({ url: "search", params: { ...requestQueries, page: page } });
		onGetSearchHistory();
	};

	useEffect(() => {
		//Call the fist default request
		onGetMovies({ url: "most-popular" });
		return () => {
			setMoviesData([]);
		};
		//eslint-disable-next-line
	}, []);

	return (
		<>
			{openMovieDetails ? (
				<MovieDetails
					open={openMovieDetails}
					movie={movieDetails}
					onClose={onCloseMovieDetails}
				/>
			) : null}
			<div className="app-container">
				<Box
					sx={{
						display: "flex",
						flexDirection: { md: "row", xs: "column" },
						justifyContent: "center",
						columnGap: { md: 2, xs: 0 },
						mb: 2,
					}}
				>
					<SearchBar
						onChange={onQueryParamChange}
						disabled={!requestQueries}
						onFocus={onGetSearchHistory}
						historyList={searchHistory || []}
						onReset={onResetSearch}
						queries={requestQueries}
						onSearch={onSearch}
					/>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Pagination
							page={moviesData?.page}
							setRequestQueries={setRequestQueries}
							onChangePage={onChangePage}
							moviesData={moviesData}
						/>
					</Box>
				</Box>
				{isLoading ? (
					<CircularProgress
						sx={{ width: 400, height: 500 }}
						variant="plain"
						size="lg"
					/>
				) : moviesData?.total > 0 ? (
					<Grid container sx={{ rowGap: 4 }}>
						{moviesData?.tv_shows?.map((movie) => {
							let mdSize = moviesData?.tv_shows?.length < 3 ? 6 : 3;
							return (
								<Grid
									key={movie.id}
									item
									xs={12}
									md={mdSize}
									sx={{ p: 0, m: 0 }}
								>
									<MovieCard
										movie={movie}
										onShowDetails={() =>
											//Call the function in order to set the movie details to show
											onGetDetails({
												url: "show-details",
												params: { q: movie.id },
											})
										}
										loading={isLoadingDetails}
									/>
								</Grid>
							);
						})}
					</Grid>
				) : (
					<NoMovieFound goToHome={onResetSearch} />
				)}
			</div>
		</>
	);
};

export default Homescreen;
