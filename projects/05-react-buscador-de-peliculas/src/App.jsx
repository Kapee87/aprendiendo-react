import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies';
import { useSearch } from './hooks/useSearch';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'just-debounce-it';

const defaultSearchs = ['star wars', 'avengers', 'harry potter', 'the lord of the rings', 'neverending story', 'stranger things']

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 400)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {

    const newSearch = event.target.value
    updateSearch(event.target.value)
    debouncedGetMovies(newSearch)
    if (newSearch === ' ') {
      setEmptySearch(true)
    }
  }

  const handleSort = () => {
    setSort(!sort)
  }

  useEffect(() => {
    const defaultSearch = defaultSearchs[Math.round(Math.random() * 5)]
    debouncedGetMovies(defaultSearch)
  }, [])

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={error ? { borderColor: 'red' } : { borderColor: 'transparent' }}
            onChange={handleChange}
            value={search}
            name='query'
            type="text"
            placeholder='Avengers, Star Wars' />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
