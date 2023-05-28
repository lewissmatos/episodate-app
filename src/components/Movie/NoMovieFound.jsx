import { Box, Button, Typography } from "@mui/joy";

const NoMovieFound = ({ goToHome }) => {
	return (
		<Box>
			<Typography level="body2" sx={{ textAlign: "center", fontSize: 50 }}>
				{"Sorry, we couldn't find any matches for your search."}
			</Typography>
			<img
				src="/search.png"
				style={{ width: 300, marginTop: 20 }}
				alt="not movie found"
			/>
			<Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
				<Button size="lg" onClick={goToHome}>
					Go to Homepage
				</Button>
			</Box>
		</Box>
	);
};

export default NoMovieFound;
