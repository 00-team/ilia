import { user } from '!/shared'
import { createSignal } from 'solid-js'

import './style.scss'

export default () => {
    const [sidebar, setSidebar] = createSignal(true)

    return (
        <div class='admin-container'>
            <div class='navbar'>
                <div></div>
                <div>admin pannel or a search bar perhaps</div>
                <div class='user'>
                    <div class='img-wrapper'>
                        <div
                            class='img'
                            style={{
                                'background-image':
                                    'url(' +
                                    (!user.picture
                                        ? '/static/image/cyprus/thief.png'
                                        : '/records/users/' + user.picture) +
                                    ')',
                            }}
                        />
                    </div>

                    <span>{user.name}</span>
                </div>
            </div>
            <div class='bottom'>
                <div class='content'></div>
                <div class='sidebar' classList={{ open: sidebar() }}></div>
            </div>
        </div>
    )
}
