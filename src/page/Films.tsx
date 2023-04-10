import { useEffect, useState } from "react";
import {Film,FilmProps} from "../components/Film";

const Films: React.FC = () => {
    const [films, setFilms] = useState<FilmProps[]>([]);

    useEffect(() => {
        setFilms([
            {
                id: 1,
                name: "The Godfather",
                path_to_image: "https://picsum.photos/id/1/200/300",
                genre: "Crime, Drama",
                releaseYear: 1972
            },
            {
                id: 2,
                name: "The Shawshank Redemption",
                path_to_image: "https://picsum.photos/id/2/200/300",
                genre: "Drama",
                releaseYear: 1994
            },
            {
                id: 3,
                name: "The Dark Knight",
                path_to_image: "https://picsum.photos/id/3/200/300",
                genre: "Action, Crime, Drama",
                releaseYear: 2008
            },
            {
                id: 4,
                name: "Pulp Fiction",
                path_to_image: "https://picsum.photos/id/4/200/300",
                genre: "Crime, Drama",
                releaseYear: 1994
            },
            {
                id: 5,
                name: "The Lord of the Rings: The Fellowship of the Ring",
                path_to_image: "https://picsum.photos/id/5/200/300",
                genre: "Action, Adventure, Drama",
                releaseYear: 2001
            }
        ]);
    }, []);

    return (
        <div className="films-container">
        {films.map((film, index) => (
                <Film key={film.id} index={index + 1} {...film} />
            ))}
        </div>
    );
};

export default Films;
