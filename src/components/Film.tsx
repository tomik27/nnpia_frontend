import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface FilmProps {
    id: number;
    name: string;
    path_to_image: string | null;
    genre: string;
    releaseYear: number;
    image: string;
    averageRating: number;
    index: number;
}

const StyledCard = styled(Card)({
    display: "flex",
    margin: "20px auto",
    maxWidth: 1000,
    width: "100%",
    height: 120,
});

const StyledImg = styled("img")({
    width: "20%",
    aspectRatio: "4 / 3",
    objectFit: "cover",
    objectPosition: "center",
});

const StyledCardContent = styled(CardContent)({
    flex: "1",
});

const Order = styled("div")({
    marginRight: "10px",
    fontWeight: "bold",
    fontSize: "1.2rem",
});

const Film: React.FC<FilmProps> = ({
                                       index,
                                       name,
                                       image,
                                       genre,
                                       releaseYear,
                                       averageRating,
                                   }) => {
    return (
        <StyledCard>
            <Order>#{index}</Order>
            <StyledImg src={image} alt={name} />
            <StyledCardContent>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {genre} | {releaseYear}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Average rating: {averageRating.toFixed(2)}
                </Typography>
            </StyledCardContent>
        </StyledCard>
    );
};

export default Film;
