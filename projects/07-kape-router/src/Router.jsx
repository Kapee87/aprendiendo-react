import { Children, useEffect, useState } from 'react'
import { EVENTS } from './const'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './utils.js'

export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {

    const [currentPath, setCurrentPath] = useState(getCurrentPath())

    useEffect(() => {

        const onLocationChange = () => {
            setCurrentPath(getCurrentPath())
        }

        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.addEventListener(EVENTS.POPSTATE, onLocationChange)

        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
        }
    }, [])

    let routeParams = {}

    const routesFromChildren = Children.map(children, ({ props, type }) => {
        const { name } = type
        const isRoute = name === 'Route'
        return isRoute ? props : null
    })

    const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

    const Page = routesToUse.find(({ path }) => {
        if (path === currentPath) return true

        //usamos path-to-regexp para detectar rutas dinámicas como por ejemplo:
        ///search/:query <- :query es la ruta din+amica
        const matcherUrl = match(path, { decode: decodeURIComponent })
        const matched = matcherUrl(currentPath)
        if (!matched) return false

        //guardamos los parámetros de la url que son dinámicos y extrajimos con 
        //path-to-regexp
        //Por ej si la ruta es /search/:query y la url es /search/javascript
        //matched.params.query === 'javascript
        routeParams = matched.params
        return true
    })?.Component

    return Page
        ? <Page routeParams={routeParams} />
        : <DefaultComponent routeParams={routeParams} />
}