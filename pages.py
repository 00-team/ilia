
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from shared import settings

templates = Jinja2Templates(
    directory=settings.base_dir / 'mark/'
)

router = APIRouter(
    include_in_schema=False
)


@router.get('/', response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse(
        'home/index.html',
        {'request': request}
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
async def projects(request: Request):
    return templates.TemplateResponse(
        'projects/index.html',
        {'request': request, 'search_query': 'hey'}
    )


@router.get('/project/1', response_class=HTMLResponse)
async def project(request: Request):
    return templates.TemplateResponse(
        'project/index.html',
        {'request': request}
    )
