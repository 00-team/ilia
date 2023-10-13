import { user } from '!/stores'
import { createEffect, createSignal } from 'solid-js'

import './style/index.scss'
import { CloseIcon, MenuIcon } from '!/icon'
import { Outlet, A } from '@solidjs/router'

export default () => {
    const [sidebar, setSidebar] = createSignal(true)

    createEffect(() => {
        if (user.user_id && !user.perms) {
            location.replace('/')
            return
        }
    })

    return (
        <div class='admin-container'>
            <div class='navbar'>
                <div>logo maybe ?</div>
                <div>admin pannel or a search bar perhaps</div>
                <div class='action'>
                    <div class='user'>
                        <div class='img-wrapper'>
                            <div
                                class='img'
                                style={{
                                    'background-image':
                                        'url(' +
                                        (!user.picture
                                            ? '/static/image/cyprus/thief.png'
                                            : '/records/users/' +
                                              user.picture) +
                                        ')',
                                }}
                            />
                        </div>

                        <span>{user.name}</span>
                    </div>
                    <button class='sidebar' onclick={() => setSidebar(s => !s)}>
                        {sidebar() ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>
            <div class='bottom'>
                <div class='content'>
                    <Outlet />
                </div>
                <div class='sidebar' classList={{ open: sidebar() }}>
                    <A href='/admin/'>General</A>
                    <A href='/admin/users/'>Users</A>
                </div>
            </div>
        </div>
    )
}
