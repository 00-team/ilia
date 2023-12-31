import { CloseIcon } from '!/icons/actions'
import { DbCheckIcon, ImageIcon } from '!/icons/dashboard'
import {
    ProjectDescription,
    ProjectLocation,
    ProjectNameIcon,
    ProjectStar,
    ProjectStartPrice,
} from '!/icons/project'
import { ProjectModel, RecordDataModel } from '!/types'
import { useNavigate, useParams } from '@solidjs/router'
import { Component, Match, onMount, Show, Switch } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

import './style/project.scss'

export default () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [state, setState] = createStore<ProjectModel>({} as ProjectModel)

    async function fetch_project() {
        try {
            const result = await fetch(`/api/admin/projects/${id}/`)

            if (result.status == 200) {
                setState(await result.json())
                return
            }
        } catch (error) {
            console.log(error)
        }

        navigate('/admin/projects/')
    }

    const update_project = async () => {
        try {
            await fetch('/api/admin/projects/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state),
            })
        } catch (err) {
            console.log(err)
        }
    }
    const save_project = async () => {
        try {
            await fetch('/api/admin/projects/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state),
            })

            navigate('/admin/projects/')
        } catch (err) {
            console.log(err)
        }
    }

    onMount(() => {
        if (isNaN(parseInt(id))) {
            navigate('/admin/projects/')
            return
        }

        fetch_project()
    })

    return (
        <Show when={Object.keys(state).length}>
            <section class='project-container'>
                <div class='inputs-wrapper'>
                    <div class='input-wrapper'>
                        <div class='holder title'>
                            <ProjectNameIcon size={30} />
                            <span>اسم پروژه</span>
                        </div>
                        <input
                            type='text'
                            name='projectName'
                            class='title_small'
                            value={state.title}
                            autofocus
                            onchange={e => setState({ title: e.target.value })}
                        />
                    </div>

                    <div class='input-wrapper'>
                        <div class='holder title'>
                            <ProjectLocation size={30} />
                            <span>محله پروژه</span>
                        </div>
                        <input
                            type='text'
                            name='projectLoc'
                            class='title_small'
                            value={state.sector}
                            autofocus
                            onchange={e => setState({ sector: e.target.value })}
                        />
                    </div>

                    <div class='input-wrapper'>
                        <div class='holder title'>
                            <ProjectDescription size={30} />
                            <span>توضیحات</span>
                        </div>
                        <textarea
                            name='projectDesc'
                            class='title_smaller'
                            id=''
                            cols='35'
                            rows='10'
                            value={state.description}
                            onchange={e =>
                                setState({ description: e.target.value })
                            }
                        ></textarea>
                    </div>

                    <div class='input-wrapper'>
                        <div class='holder title'>
                            <ImageIcon size={30} />
                            <span>عکس توضیحات</span>
                        </div>
                        <ImageInput
                            record={state.images.desc}
                            clear={() => {
                                setState(
                                    produce(s => {
                                        s.images.desc.id = 0
                                        s.images.desc.url = ''
                                    })
                                )
                                update_project()
                            }}
                            update={data => {
                                setState(
                                    produce(s => {
                                        s.images.desc = data
                                    })
                                )
                                update_project()
                            }}
                        />
                    </div>

                    <div class='input-wrapper'>
                        <div class='holder title'>
                            <DbCheckIcon size={24} />
                            <span>ویژگی ها</span>
                        </div>
                        <div class='options-container'>
                            <Show
                                fallback={
                                    <p class='title_small empty-option'>
                                        ویژگی ای وجود ندارد!
                                    </p>
                                }
                                when={state.features.length}
                            >
                                <div class='options-wrapper'>
                                    {state.features.map((option, i) => (
                                        <div class='option'>
                                            <div class='holder'>
                                                <ProjectStar size={30} />
                                            </div>
                                            <input
                                                type='text'
                                                class='option-inp title_smaller'
                                                value={option}
                                                onchange={e => {
                                                    setState(
                                                        produce(s => {
                                                            s.features[i] =
                                                                e.target.value
                                                        })
                                                    )
                                                }}
                                            />
                                            <div
                                                class='remove-option'
                                                onclick={() => {
                                                    setState(
                                                        produce(s => {
                                                            s.features.splice(
                                                                i,
                                                                1
                                                            )
                                                        })
                                                    )
                                                }}
                                            >
                                                <CloseIcon size={20} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Show>
                            <button
                                onclick={() =>
                                    setState({
                                        features: [
                                            ...state.features,
                                            'ویژگی جدید',
                                        ],
                                    })
                                }
                                class='add-option title_smaller'
                            >
                                اضافه کردن
                            </button>
                        </div>
                    </div>

                    <div class='input-wrapper'>
                        <div class='holder title'>
                            <ImageIcon size={30} />
                            <span>عکس ویژگی ها</span>
                        </div>

                        <ImageInput
                            record={state.images.feat}
                            clear={() => {
                                setState(
                                    produce(s => {
                                        s.images.feat.id = 0
                                        s.images.feat.url = ''
                                    })
                                )

                                update_project()
                            }}
                            update={data => {
                                setState(
                                    produce(s => {
                                        s.images.feat = data
                                    })
                                )
                                update_project()
                            }}
                        />
                    </div>

                    <div class='input-wrapper'>
                        <div class='holder title'>
                            <ProjectDescription size={30} />
                            <span>شرایط پرداخت</span>
                        </div>
                        <textarea
                            name='projectDesc'
                            class='title_smaller'
                            id=''
                            cols='35'
                            rows='10'
                            value={state.payment_terms}
                            onchange={e =>
                                setState({ payment_terms: e.target.value })
                            }
                        ></textarea>
                    </div>

                    <div class='input-wrapper'>
                        <div class='holder title'>
                            <ImageIcon size={30} />
                            <span>عکس شرایط پرداخت</span>
                        </div>
                        <ImageInput
                            record={state.images.term}
                            clear={() => {
                                setState(
                                    produce(s => {
                                        s.images.term.id = 0
                                        s.images.term.url = ''
                                    })
                                )

                                update_project()
                            }}
                            update={data => {
                                setState(
                                    produce(s => {
                                        s.images.term = data
                                    })
                                )
                                update_project()
                            }}
                        />
                    </div>

                    <div class='input-wrapper'>
                        <div class='holder title'>
                            <ProjectStartPrice size={30} />
                            <span>قیمت</span>
                        </div>
                        <div class='prices-wrapper'>
                            <table class='prices'>
                                <thead class='title_smaller'>
                                    <tr>
                                        <th class='id'>واحد</th>
                                        <th class='name'>متراژ</th>
                                        <th class='lname'>قیمت</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.prices &&
                                    state.prices.length >= 1 ? (
                                        <>
                                            {state.prices.map(
                                                (price, idx01) => (
                                                    <tr>
                                                        <td contentEditable>
                                                            {price.layout}
                                                        </td>
                                                        <td contentEditable>
                                                            {price.area}
                                                        </td>
                                                        <td contentEditable>
                                                            <span class='price-number'>
                                                                {price.price}
                                                            </span>
                                                        </td>
                                                        <td
                                                            class='remove-price'
                                                            onclick={() => {
                                                                setState(
                                                                    produce(
                                                                        s => {
                                                                            s.prices =
                                                                                [
                                                                                    ...s.prices.filter(
                                                                                        (
                                                                                            _,
                                                                                            idx02
                                                                                        ) =>
                                                                                            idx01 !==
                                                                                            idx02
                                                                                    ),
                                                                                ]
                                                                        }
                                                                    )
                                                                )
                                                            }}
                                                        >
                                                            <CloseIcon />
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <p class='title'>قیمتی وجود ندارد!</p>
                                    )}
                                </tbody>
                            </table>
                            <button
                                class='add-price title_smaller'
                                onclick={() =>
                                    setState(
                                        produce(s => {
                                            s.prices = [
                                                ...s.prices,
                                                {
                                                    layout: 'اتاق',
                                                    area: 0,
                                                    price: 0,
                                                },
                                            ]
                                        })
                                    )
                                }
                            >
                                اضافه کردن
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    type='submit'
                    class='title submit-project'
                    onclick={() => save_project()}
                >
                    ذخیره
                </button>
            </section>
        </Show>
    )
}

type ImageInputProps = {
    record: RecordDataModel
    clear: () => void
    update: (new_record: RecordDataModel) => void
}

const ImageInput: Component<ImageInputProps> = props => {
    return (
        <Switch>
            <Match when={props.record.id}>
                <div
                    class='img-loader'
                    onclick={() => {
                        try {
                            const result = fetch(
                                `/api/admin/records/${props.record.id}/`,
                                {
                                    method: 'DELETE',
                                }
                            )

                            props.clear()

                            console.log(result)
                        } catch (error) {
                            console.log(error)
                        }
                    }}
                >
                    <img src={props.record.url} />
                    <div class='remove-img'>
                        <CloseIcon size={30} />
                    </div>
                </div>
            </Match>
            <Match when={!props.record.id}>
                <label
                    for='img-uploader'
                    class='img-upload'
                    ondrop={async e => {
                        e.preventDefault()
                        e.stopPropagation()

                        let dt = e.dataTransfer
                        let files = dt.files

                        if (!files) return
                        const file = files[0]
                        if (!file) return

                        const IMAGE_MIMETYPE = [
                            'image/png',
                            'image/jpeg',
                            'image/jpg',
                            'image/gif',
                        ]

                        if (!IMAGE_MIMETYPE.includes(file.type)) {
                            return alert('فورمت فایل عکس نیست!')
                        }

                        let fd = new FormData()
                        fd.set('file', file)

                        try {
                            const response = await fetch(
                                '/api/admin/records/',
                                {
                                    method: 'POST',
                                    body: fd,
                                }
                            )

                            if (!response.ok) {
                                alert('خطا درهنگام اپلود فایل')
                                return
                            }

                            let result = await response.json()

                            props.update({
                                id: result.record_id,
                                url: result.url,
                            })

                            console.log(result)
                        } catch (err) {
                            console.log(err)
                        }
                    }}
                    ondrag={e => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    ondragenter={e => {
                        e.target.className += ' anim'
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    ondragleave={e => {
                        e.target.className = e.target.className.replace(
                            'anim',
                            ''
                        )

                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    ondragover={e => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                >
                    <div class='upload'>
                        <input
                            type='file'
                            name=''
                            id='img-uploader'
                            onChange={async e => {
                                if (!e.currentTarget.files) return
                                const file = e.currentTarget.files[0]
                                if (!file) return

                                const IMAGE_MIMETYPE = [
                                    'image/png',
                                    'image/jpeg',
                                    'image/jpg',
                                    'image/gif',
                                ]

                                if (!IMAGE_MIMETYPE.includes(file.type)) {
                                    return alert('فورمت فایل عکس نیست!')
                                }

                                let fd = new FormData()
                                fd.set('file', file)

                                try {
                                    const response = await fetch(
                                        '/api/admin/records/',
                                        {
                                            method: 'POST',
                                            body: fd,
                                        }
                                    )

                                    if (!response.ok) {
                                        alert('خطا درهنگام اپلود فایل')
                                        return
                                    }

                                    let result = await response.json()

                                    props.update({
                                        id: result.record_id,
                                        url: result.url,
                                    })

                                    console.log(result)
                                } catch (err) {
                                    console.log(err)
                                }
                            }}
                            multiple={false}
                            accept='.jpg, .jpeg, .png, image/jpg, image/jpeg, image/png'
                        />
                        <img
                            src='/static/image/dashboard/projectImg.png'
                            alt=''
                        />
                        <p class='title_small'>عکس رو اینجا بنداز ! </p>
                        <p class='title_smaller support'>
                            فایل های عکس: jpg, png, jpeg
                        </p>
                    </div>
                </label>
            </Match>
        </Switch>
    )
}
