import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export default function App() {

    const users = [
        {
            userName: 'foofighters.com',
            name: 'Foo fighters',
            isFollowing: true
        },
        {
            userName: 'acdc.com',
            name: 'Ac Dc',
            isFollowing: true
        },
        {
            userName: 'ledzeppelin.com',
            name: 'Led Zeppelin',
            isFollowing: false
        },
        {
            userName: 'thewho.com',
            name: 'The Who',
            isFollowing: true
        },
        {
            userName: 'queen.com',
            name: 'Queen',
            isFollowing: false
        }

    ]
    return (
        <section className='App'>
            {
                users.map(({ userName, name, isFollowing }) => (
                    <TwitterFollowCard
                        key={userName}
                        userName={userName}
                        name={name}
                        isFollowing={isFollowing}
                    />
                )
                )
            }
        </section>
    )
}