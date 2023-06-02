import { useEffect, useState } from "react"

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage({ fact }) {
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        if (!fact) return
        const firstWord = fact.split(' ', 3).join(' ') //otra opción (buscar 3)
        //const firstWord = fact.split(' ')[0]

        fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(data => {
                const { url } = data
                setImageUrl(url)
                console.log(imageUrl);
            })
    }, [fact])
    return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
}