import { Link } from "../Link";

const i18n = {
    es: {
        title: 'Sobre nosotros',
        description: '¡Hola! Me llamo Nahuel Andrés Montaner y estoy creando un clon de React Router',
        button: 'Ir a Home'
    },
    en: {
        title: 'About us',
        description: 'Hi! My name is Nahuel Andrés Montaner and I am creating a clone or React Router',
        button: 'Go to Home'
    }
}

const useI18n = (lang) => {
    return i18n[lang] || i18n.en
}
export default function About({ routeParams }) {
    const i18n = useI18n(routeParams.lang ?? 'es')
    return (
        <>
            <div>
                <h1>{i18n.title}</h1>
                <p>{i18n.description}</p>
                <img src="https://avatars.githubusercontent.com/u/89433307?v=4" alt="Foto de Kapeeh" />
            </div>
            <Link to={'/'}>{i18n.button}</Link>
        </>
    )
}