import { AspectRatio, Box, Button, Card, Typography } from "@mui/joy";
import "./movie-card.css";

const MovieCard = ({
	movie: { name, network, status, image_thumbnail_path: imgUrl, id },
	onShowDetails,
	loading,
}) => {
	return (
		<Card variant="outlined" sx={{ mx: 1 }}>
			<Typography
				level="h2"
				fontSize="md"
				sx={{
					mb: 0.5,
					textAlign: "left",
					textOverflow: "ellipsis",
					overflow: "hidden",
					whiteSpace: "nowrap",
				}}
			>
				{name}
			</Typography>
			<Typography level="body2" sx={{ textAlign: "left" }}>
				{network}
			</Typography>
			<AspectRatio ratio="1" sx={{ my: 2 }}>
				<img
					className="movie-card-zoom"
					src={imgUrl}
					loading="lazy"
					alt={name}
				/>
			</AspectRatio>
			<Box sx={{ display: "flex" }}>
				<div>
					<Typography level="body3" sx={{ textAlign: "left" }}>
						Status:
					</Typography>
					<Typography
						fontSize="lg"
						fontWeight="lg"
						sx={{
							//Validate the movie state to change de label color
							color: status?.toLowerCase()?.includes("ended")
								? "#D3232F"
								: "#2CA24D",
						}}
					>
						{status}
					</Typography>
				</div>
				<Button
					variant="solid"
					size="md"
					color="primary"
					loading={loading?.isLoading && loading?.id === id}
					aria-label="Explore Bahamas Islands"
					sx={{ ml: "auto", fontWeight: 600 }}
					onClick={onShowDetails}
				>
					More details
				</Button>
			</Box>
		</Card>
	);
};

export default MovieCard;
