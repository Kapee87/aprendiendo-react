import './App.css'
import { Suspense, lazy } from 'react'


import { Router } from './Router'
import { Route } from './Route.jsx'

const About = lazy(() => import('./pages/About.jsx'))
const HomePage = lazy(() => import('./pages/Home.jsx'))
const Page404 = lazy(() => import('./pages/404'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))

const appRoutes = [
  {
    path: '/:lang/about',
    Component: About
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App() {

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={HomePage} />
          <Route path='/about' Component={About} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
