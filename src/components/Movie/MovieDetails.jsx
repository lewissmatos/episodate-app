import {
	Box,
	Divider,
	Modal,
	ModalClose,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";

const MovieDetails = ({
	movie: {
		name,
		description,
		start_date,
		country,
		status,
		network,
		image_thumbnail_path,
		rating,
		genres,
		pictures,
		episodes,
	},
	open,
	onClose,
}) => {
	//Seasons state
	const [seasons, setSeasons] = useState();

	//Divide an array of episodes in seasons by the season property
	const divideEpisodesBySeasons = (episodes) => {
		const seasons = [];

		//Map the episodes
		episodes?.forEach((episode) => {
			const seasonNumber = episode.season - 1;

			// If the season doesn't exist in the seasons array, create a new array for that season
			if (!seasons[seasonNumber]) {
				seasons[seasonNumber] = { number: seasonNumber + 1, episodes: [] };
			}

			// Add the episode to the respective season array
			seasons[seasonNumber]?.episodes?.push(episode);
		});

		setSeasons(seasons);
	};

	useEffect(() => {
		//Call the function to divide and set the seasons
		divideEpisodesBySeasons(episodes);

		return () => {
			setSeasons();
		};
		//eslint-disable-next-line
	}, [episodes]);

	return (
		<Modal
			open={open}
			onClose={onClose}
			sx={{
				"&:focus": {
					outline: "none !important",
				},
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				border: "none !important",
				zIndex: 2,
			}}
		>
			<Box
				sx={{
					width: { xs: 550, md: 1200 },
					height: { xs: 1000, md: 800 },
					bgcolor: "white",
					padding: 4,
					borderRadius: 8,
					overflowY: "auto",
					overflowX: "hidden",
				}}
			>
				<ModalClose />
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignContent: "center",
						alignItems: "center",
					}}
				>
					<Box>
						<Typography component="h2" sx={{ fontWeight: 700, fontSize: 30 }}>
							{name}
						</Typography>
						<Typography sx={{ color: "grey", fontSize: 18 }}>
							{network}
						</Typography>
					</Box>
					<Typography
						component="h2"
						sx={{
							color: status?.toLowerCase()?.includes("ended")
								? "#D3232F"
								: "#2CA24D",
						}}
					>
						{status}
					</Typography>
				</Box>
				<Divider sx={{ mt: 1, mb: 2 }} />

				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						columnGap: 3,
					}}
				>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<img
							style={{
								borderRadius: 8,
								minWidth: 400,
								maxWidth: 400,
								height: "100%",
							}}
							src={image_thumbnail_path}
							loading="lazy"
							alt={name}
						/>
					</Box>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
						<Typography sx={{ fontWeight: 700, fontSize: 20 }}>
							Description:{" "}
						</Typography>
						<Typography>{description}</Typography>
						<Typography>
							<Typography sx={{ fontWeight: 600 }}>Rating: </Typography>{" "}
							{rating}
						</Typography>
						<Typography>
							<Typography sx={{ fontWeight: 600 }}>Start Date: </Typography>{" "}
							{start_date}
						</Typography>
						<Typography>
							<Typography sx={{ fontWeight: 600 }}>Genrers: </Typography>{" "}
							{/* Join the genrers array to show them as a text */}
							{genres?.join(", ")}
						</Typography>
						<Typography>
							<Typography sx={{ fontWeight: 600 }}>Country: </Typography>{" "}
							{country}
						</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								maxWidth: 700,
								height: 150,
								columnGap: 2,
								mt: 3,
								overflowX: "auto",
							}}
						>
							{/* Show a list of pictures */}
							{pictures?.map((picture) => (
								<img
									key={picture}
									style={{ borderRadius: 8, maxWidth: 150, height: "100%" }}
									src={picture}
									loading="lazy"
									alt={name}
								/>
							))}
						</Box>
					</Box>
				</Box>
				<Box sx={{ mt: 2, overflowX: "auto" }}>
					<Tabs aria-label="Basic tabs" defaultValue={0} sx={{ width: "auto" }}>
						<TabList sx={{ width: { md: "auto", xs: 900 } }}>
							{seasons?.map((season) => (
								<Tab key={season?.number}>Season {season?.number}</Tab>
							))}
						</TabList>

						{/* Map the seasons to show them in tabs */}
						{seasons?.map((season) => (
							<TabPanel
								value={season?.number - 1}
								sx={{ p: 2 }}
								key={season?.number}
							>
								{/* Map the episodes to show them in a list */}
								{season?.episodes?.map(({ episode, name, air_date }) => {
									return (
										<Box
											key={episode}
											sx={{
												borderRadius: 8,
												bgcolor: "#F5F5F5",
												mt: 1,
												p: 1,
												display: "flex",
												justifyContent: "space-between",
												width: { md: "auto", xs: 800 },
											}}
										>
											<Typography sx={{ fontWeight: 600 }}>
												{episode}. {name}
											</Typography>{" "}
											<Typography>Air date: {air_date}</Typography>
										</Box>
									);
								})}
							</TabPanel>
						))}
					</Tabs>
				</Box>
			</Box>
		</Modal>
	);
};

export default MovieDetails;
