import { SearchIcon } from '!/icons/dashboard'
import './style/projects.scss'

export default () => {
    return (
        <section class='projects'>
            <header class='projects-header'>
                <button class='new-project basic-button title_small'>
                    پروژه جدید
                </button>
                <div class='search'>
                    <SearchIcon size={40} />
                    <input
                        class='title_small'
                        type='text'
                        name=''
                        id=''
                        placeholder='جستجو ...'
                        autofocus
                    />
                </div>
            </header>
            <div class='projects-wrapper'></div>
        </section>
    )
}
