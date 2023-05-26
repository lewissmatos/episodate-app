import { useEffect, useState } from "react";
import { getMovies } from "../../services/episodate.service";
import MovieCard from "../Movie/MovieCard";
import SearchBar from "../Movie/SearchBar";

import "./homescreen.css";
import {
	getSearchHistory,
	setSearchHistoryItem,
} from "../../services/history.service";
import { CircularProgress, Grid } from "@mui/joy";
import MovieDetails from "../Movie/MovieDetails";
import NoMovieFound from "../Movie/NoMovieFound";
const Homescreen = () => {
	//Stative variables used for controlling the request and behaivor
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
		permalink: null,
		start_date: null,
		end_date: null,
		country: null,
		network: null,
		status: null,
		image_thumbnail_path: null,
	});

	//Function to
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

	const onQueryParamChange = (e, directValue) => {
		if (!e?.target?.value) {
			onResetSearch();
		} else
			setRequestQueries((prevVal) => ({
				...prevVal,
				[e?.target?.name]: e?.target?.value,
			}));
		if (directValue) {
			onGetMovies({
				url: "search",
				params: { ...requestQueries, [e?.target?.name]: e?.target?.value },
			});
			onGetSearchHistory();
		}
	};

	const onResetSearch = () => {
		setRequestQueries();
		onGetMovies({ url: "most-popular" });
	};

	const onGetDetails = async ({ url, params }) => {
		setIsLoadingDetails({ isLoading: true, id: params?.q });
		const res = await getMovies({ url, params });
		setMovieDetails(res?.tvShow);
		setIsLoadingDetails({ isLoading: false, id: null });
		setOpenMovieDetails(true);
	};

	const onCloseMovieDetails = () => {
		setOpenMovieDetails(false);
	};

	const onAddSearchHistoryParam = (item) => {
		setSearchHistoryItem(item);
	};

	const onGetSearchHistory = () => {
		let history = getSearchHistory();
		setSearchHistory(history);
	};

	useEffect(() => {
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
				<SearchBar
					onChange={onQueryParamChange}
					disabled={!requestQueries}
					onFocus={onGetSearchHistory}
					historyList={searchHistory || []}
					onReset={onResetSearch}
					queries={requestQueries}
					onSearch={() => {
						onGetMovies({ url: "search", params: requestQueries });
						onGetSearchHistory();
					}}
				/>
				{isLoading ? (
					<CircularProgress
						sx={{ width: 400, height: 500 }}
						variant="plain"
						size="lg"
					/>
				) : moviesData?.total > 0 ? (
					<Grid container sx={{ rowGap: 4 }}>
						{moviesData?.tv_shows?.map((movie) => {
							let mdSize = 3;

							mdSize = moviesData?.tv_shows?.length < 3 ? 6 : 3;
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
