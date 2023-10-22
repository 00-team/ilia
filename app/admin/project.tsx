import { ProjectNameIcon } from '!/icons/project'
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
                    />
                </div>
            </div>
        </section>
    )
}
