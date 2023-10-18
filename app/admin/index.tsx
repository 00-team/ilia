import { user } from '!/stores'
import { createEffect } from 'solid-js'

import './style/index.scss'

export default () => {
    createEffect(() => {
        if (user.user_id && !user.perms) {
            location.replace('/')
            return
        }
    })

    return (
        <main class='admin-container'>
            <aside class='sidebar'>
                <div class='avatar'>
                    <img
                        src={
                            !user.picture
                                ? '/static/image/cyprus/thief.png'
                                : '/records/users/' + user.picture
                        }
                        class='profile-avatar'
                        alt=''
                    />
                    <h2 class='name-avatar title_small'>
                        <span>{user.name}</span>
                    </h2>
                </div>
            </aside>
            <aside class='wrapper'></aside>
        </main>
    )
}

// ;<div class='img-wrapper'>
//     <div
//         class='img'
//         style={{
//             'background-image':
//                 'url(' +
//                 (!user.picture
//                     ? '/static/image/cyprus/thief.png'
//                     : '/records/users/' + user.picture) +
//                 ')',
//         }}
//     />
// </div>
