function ListOfMovies({ movies }) {
    return (
        <ul className='movies'>
            {
                movies.map(movie => (
                    <li className='movie' key={movie.id}>
                        {/* <h3>{movie.title.length < 9 ? movie.title : movie.title.slice(0, 17) + '...'}</h3> */}
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <img src={movie.image} alt={movie.title} />
                    </li>
                ))
            }
        </ul>
    )
}

function NoMoviesResults() {
    return (
        <p>No se encontraron películas que coincidan con la búsqueda</p>
    )
}

export function Movies({ movies }) {
    const hasMovies = movies?.length > 0
    return (
        hasMovies
            ? <ListOfMovies movies={movies} />
            : <NoMoviesResults />
    )
}