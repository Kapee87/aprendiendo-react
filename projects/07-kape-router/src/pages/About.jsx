import { Link } from "../Link";

export default function About() {

    return (
        <>
            <div>
                <h1>About</h1>
                <p>¡Hola! Me llamo Nahuel Andrés Montaner y estoy creando un clon de React Router</p>
                <img src="https://avatars.githubusercontent.com/u/89433307?v=4" alt="Foto de Kapeeh" />
            </div>
            <Link to={'/'}>Ir a Home</Link>
        </>
    )
}