import { useState } from "react";

export function TwitterFollowCard({ userName = 'unknown', name }) {

    const [isFollowing, setIsFollowing] = useState(false)
    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button';

    const handleclick = () => {
        setIsFollowing(!isFollowing)
    }

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img
                    className='tw-followCard-avatar'
                    src={`https://unavatar.io/${userName}`}
                    alt="El avatar de persona" />
                <div className='tw-followCard-info'>
                    <strong>{name}</strong>
                    <span className='tw-followCard-infoUserName'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleclick}>
                    <span className="tw-followcard-text">{text}</span>
                    <span className="tw-followcard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article> 
    )
}