import { CloseIcon } from '!/icons/actions'
import { DbCheckIcon, ImageIcon } from '!/icons/dashboard'
import {
    ProjectDescription,
    ProjectLocation,
    ProjectNameIcon,
    ProjectStar,
    ProjectStartPrice,
} from '!/icons/project'
import { ProjectModel } from '!/types'
import { useNavigate, useParams } from '@solidjs/router'
import { onMount } from 'solid-js'
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

    type records = 'desc' | 'term' | 'feat'

    const update_records = async (file: File | null, type: records) => {
        if (!file) return

        const IMAGE_MIMETYPE = ['image/png', 'image/jpeg', 'image/jpg']

        if (!IMAGE_MIMETYPE.includes(file.type)) {
            return alert('فورمت فایل عکس نیست!')
        }

        let fd = new FormData()
        fd.set('file', file)

        try {
            const response = await fetch('/api/admin/records/', {
                method: 'POST',
                body: fd,
            })

            let result = await response.json()

            if (!result) {
                alert('خطا درهنگام اپلود فایل')
                return
            }

            setState(
                produce(s => {
                    s.images[type] = {
                        id: result.record_id,
                        url: result.url,
                    }
                })
            )
        } catch (err) {
            console.log(err)
        }

        return
    }

    onMount(() => {
        if (isNaN(parseInt(id))) {
            navigate('/admin/projects/')
            return
        }

        fetch_project()
    })

    return (
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
                    {state.images && state.images.desc.url ? (
                        <div
                            class='img-loader'
                            onclick={() => {
                                try {
                                    const result = fetch(
                                        `/api/admin/records/${state.images.desc.id}/`,
                                        {
                                            method: 'DELETE',
                                        }
                                    )

                                    setState(
                                        produce(s => {
                                            s.images.desc = {
                                                id: 0,
                                                url: '',
                                            }
                                        })
                                    )

                                    console.log(result)
                                } catch (error) {
                                    console.log(error)
                                }
                            }}
                        >
                            <img src={state.images.desc.url} />
                            <div class='remove-img'>
                                <CloseIcon size={30} />
                            </div>
                        </div>
                    ) : (
                        <label for='img-uploader' class='img-upload'>
                            <div class='upload'>
                                <input
                                    type='file'
                                    name=''
                                    id='img-uploader'
                                    onChange={e =>
                                        update_records(
                                            e.currentTarget.files[0],
                                            'desc'
                                        )
                                    }
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
                    )}
                </div>

                <div class='input-wrapper'>
                    <div class='holder title'>
                        <DbCheckIcon size={24} />
                        <span>ویژگی ها</span>
                    </div>
                    <div class='options-container'>
                        {state.features && state.features.length >= 1 ? (
                            <div class='options-wrapper'>
                                {state.features.map((option, idx01) => {
                                    return (
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
                                                            s.features[idx01] =
                                                                e.target.value
                                                        })
                                                    )
                                                }}
                                            />
                                            <div
                                                class='remove-option'
                                                onclick={() => {
                                                    setState({
                                                        features: [
                                                            ...state.features.filter(
                                                                (_, idx02) =>
                                                                    idx01 !==
                                                                    idx02
                                                            ),
                                                        ],
                                                    })
                                                }}
                                            >
                                                <CloseIcon size={20} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p class='title_small empty-option'>
                                ویژگی ای وجود ندارد!
                            </p>
                        )}
                        <button
                            onclick={() =>
                                setState({
                                    features: [...state.features, 'ویژگی جدید'],
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
                    <label for='img-uploader' class='img-upload'>
                        <div class='upload'>
                            <input type='file' name='' id='img-uploader' />
                            <img
                                src='/static/image/dashboard/projectImg.png'
                                alt=''
                            />
                            <p class='title_small'>عکس رو اینجا بنداز ! </p>
                            <p class='title_smaller support'>
                                فایل های عکس: jpg, png
                            </p>
                        </div>
                    </label>
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
                    <label for='img-uploader' class='img-upload'>
                        <div class='upload'>
                            <input type='file' name='' id='img-uploader' />
                            <img
                                src='/static/image/dashboard/projectImg.png'
                                alt=''
                            />
                            <p class='title_small'>عکس رو اینجا بنداز ! </p>
                            <p class='title_smaller support'>
                                فایل های عکس: jpg, png
                            </p>
                        </div>
                    </label>
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
                                {state.prices && state.prices.length >= 1 ? (
                                    <>
                                        {state.prices.map((price, idx01) => (
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
                                                            produce(s => {
                                                                s.prices = [
                                                                    ...s.prices.filter(
                                                                        (
                                                                            _,
                                                                            idx02
                                                                        ) =>
                                                                            idx01 !==
                                                                            idx02
                                                                    ),
                                                                ]
                                                            })
                                                        )
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </td>
                                            </tr>
                                        ))}
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
            <button type='submit' class='title submit-project'>
                ذخیره
            </button>
        </section>
    )
}
