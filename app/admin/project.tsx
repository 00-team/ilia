import { DbCheckIcon, ImageIcon } from '!/icons/dashboard'
import { ProjectDescription, ProjectNameIcon } from '!/icons/project'
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
                        id=''
                        value={state.title}
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
                </div>
            </div>
        </section>
    )
}
