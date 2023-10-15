
import json

from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from db.models import ProjectModel, ProjectTable, UserModel
from db.project import project_get
from db.user import user_get
from deps import user_by_token
from shared import settings, sqlx

templates = Jinja2Templates(
    directory=settings.base_dir / 'mark/'
)

router = APIRouter(
    include_in_schema=False,
)


@router.get('/', response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse(
        'home/index.html',
        {'request': request, 'user': await user_by_token(request)}
    )


@router.get('/admin/{_:path}', response_class=HTMLResponse)
async def admin(request: Request):
    with open(settings.base_dir / 'static/dash/index.html', 'r') as f:
        return f.read()


@router.get('/dash/{_:path}', response_class=HTMLResponse)
async def dash(request: Request):
    with open(settings.base_dir / 'static/dash/index.html', 'r') as f:
        return f.read()


@router.get('/about', response_class=HTMLResponse)
async def about(request: Request):
    return templates.TemplateResponse(
        'about/index.html',
        {'request': request}
    )


@router.get('/cyprus', response_class=HTMLResponse)
async def cyprus(request: Request):
    return templates.TemplateResponse(
        'cyprus/index.html',
        {'request': request}
    )


@router.get('/education', response_class=HTMLResponse)
async def education(request: Request):
    return templates.TemplateResponse(
        'education/index.html',
        {'request': request}
    )


@router.get('/projects/', response_class=HTMLResponse)
async def projects(request: Request, q: str = '', page: int = 0):

    search = ''
    values = {}

    if q:
        search = 'WHERE title LIKE :query'
        values['query'] = '%' + q + '%'

    rows = await sqlx.fetch_all(
        f'''
        SELECT * from projects {search}
        LIMIT {settings.page_size} OFFSET {page * settings.page_size}
        ''',
        values
    )

    result = []
    for row in rows:
        args = dict(row)
        args['features'] = json.loads(args['features'])
        args['prices'] = json.loads(args['prices'])
        args['images'] = json.loads(args['images'])
        result.append(ProjectModel(**args))

    return templates.TemplateResponse(
        'projects/index.html',
        {
            'request': request,
            'search_query': q,
            'page': page,
            'projects': result
        }
    )


@router.get('/projects/{project_id}/', response_class=HTMLResponse)
async def project(request: Request, project_id: int):

    project = await project_get(project_id)
    if project is None:
        return HTMLResponse('not found', 404)

    return templates.TemplateResponse(
        'project/index.html',
        {'request': request, 'project': project}
    )
