import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FilmProps } from "./types";

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
                                              id,
                                              name,
                                              path_to_image,
                                              genre,
                                              releaseYear,
                                          }) => {
    return (
        <StyledCard>
            <Order>#{id}</Order>
            <StyledImg src={path_to_image} alt={name} />
            <StyledCardContent>
                <CardContent>
                    <Typography variant="h5">{name}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {genre} | {releaseYear}
                    </Typography>
                </CardContent>
            </StyledCardContent>
        </StyledCard>
    );
};

export default Film;