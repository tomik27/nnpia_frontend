import { useEffect, useState } from "react";
import Film from "../../components/Film";
import { base64ToArrayBuffer, byteArrayToBase64 } from '../../features/HelpfulFunction/byteToImage';

interface FilmProps {
    id: number;
    name: string;
    path_to_image: string | null;
    genre: string;
    releaseYear: number;
    image: string | null;
    ratingByUsers: UserHasFilm[];
}

interface UserHasFilm {
    userId: number;
    rating: number;
    comment: string;
}

// This is the new interface that includes averageRating
interface FilmWithRating extends FilmProps {
    averageRating: number;
}

const Films: React.FC = () => {
    const [films, setFilms] = useState<FilmWithRating[]>([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/film`)
            .then(response => response.json())
            .then((data: FilmProps[]) => {
                const filmsWithRatings = data.map(film => {
                    let buffer = base64ToArrayBuffer(film.image!);
                    let bytes = new Uint8Array(buffer);
                    let base64Image = byteArrayToBase64(bytes);
                    film.image = `data:image/jpeg;base64,${base64Image}`;

                    let averageRating = 0;
                    if (film.ratingByUsers && film.ratingByUsers.length > 0) {
                        const totalRating = film.ratingByUsers.reduce((total, userHasFilm) => total + userHasFilm.rating, 0);
                        averageRating = totalRating / film.ratingByUsers.length;
                    }

                    // Return a new object that includes averageRating
                    return {
                        ...film,
                        averageRating,
                    } as FilmWithRating;
                });

                filmsWithRatings.sort((filmA, filmB) => filmB.averageRating - filmA.averageRating);

                setFilms(filmsWithRatings);
            });
    }, []);

    return (
        //automaticky poskytována jako druhý argument do callback funkce metody .map(). Tato funkce je používána k iteraci přes pole (v tomto případě films). Index reprezentuje pořadí aktuálního prvku v poli, počínaje nulou
        <div className="films-container">
            {films.map((film, index) => (
                <Film key={film.id} index={index + 1} {...film} />
            ))}
        </div>
    );
};

export default Films;
