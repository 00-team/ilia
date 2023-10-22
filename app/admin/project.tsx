import { DbCheckIcon, ImageIcon } from '!/icons/dashboard'
import {
    ProjectDescription,
    ProjectLocation,
    ProjectNameIcon,
    ProjectStar,
} from '!/icons/project'
import { ProjectModel } from '!/types'
import { useNavigate, useParams } from '@solidjs/router'
import { onMount } from 'solid-js'
import { createStore } from 'solid-js/store'

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
                    ></textarea>
                </div>
                <div class='input-wrapper'>
                    <div class='holder title'>
                        <ImageIcon size={30} />
                        <span>عکس توضیحات</span>
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
                        <DbCheckIcon size={24} />
                        <span>ویژگی ها</span>
                    </div>
                    <div class='options-container'>
                        {state.features && state.features.length >= 1 ? (
                            <div class='options-wrapper'>
                                {state.features.map(option => {
                                    return (
                                        <div class='option'>
                                            <div class='holder'>
                                                <ProjectStar size={30} />
                                            </div>
                                            <input
                                                type='text'
                                                class='option-inp title_smaller'
                                                value={option}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p class='title_small empty-option'>
                                ویژگی ای وجود ندارد!
                            </p>
                        )}
                        <button class='add-option title_smaller'>
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
            </div>
        </section>
    )
}
