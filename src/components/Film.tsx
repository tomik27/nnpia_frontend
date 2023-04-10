import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FilmProps } from "./types";

const useStyles = makeStyles({
    root: {
        display: "flex",
        margin: "20px auto",
        maxWidth: 1000,
        width: "100%",
        height: 120,
    },
    media: {
        width: "20%",
        aspectRatio: "4 / 3",
        objectFit: "cover",
        objectPosition: "center",
    },
    content: {
        flex: "1",
    },
    order: {
        marginRight: "10px",
        fontWeight: "bold",
        fontSize: "1.2rem",
    },
});

export const Film: React.FC<FilmProps> = ({
                                              id,
                                              name,
                                              path_to_image,
                                              genre,
                                              releaseYear,
                                          }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <div className={classes.order}>#{id}</div>
            <CardMedia
                className={classes.media}
                component="img"
                image={path_to_image}
                alt={name}
            />
            <div className={classes.content}>
                <CardContent>
                    <Typography variant="h5">{name}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {genre} | {releaseYear}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
};