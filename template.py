

# from shared import settings
from pathlib import Path

import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

base_dir: Path = Path(__file__).parent


app = FastAPI()
templates = Jinja2Templates(
    directory=base_dir / 'mark/tmpl/'
)

app.mount('/static', StaticFiles(directory='static'), name='static')


@app.get('/', response_class=HTMLResponse, include_in_schema=False)
async def index(request: Request):
    return templates.TemplateResponse(
        'home/index.html',
        {'request': request}
    )


@app.get('/about', response_class=HTMLResponse, include_in_schema=False)
async def about(request: Request):
    return templates.TemplateResponse(
        'about/index.html',
        {'request': request}
    )


@app.get('/cyprus', response_class=HTMLResponse, include_in_schema=False)
async def cyprus(request: Request):
    return templates.TemplateResponse(
        'cyprus/index.html',
        {'request': request}
    )


@app.get('/education', response_class=HTMLResponse, include_in_schema=False)
async def education(request: Request):
    return templates.TemplateResponse(
        'education/index.html',
        {'request': request}
    )


@app.get('/projects', response_class=HTMLResponse, include_in_schema=False)
async def projects(request: Request):
    return templates.TemplateResponse(
        'projects/index.html',
        {'request': request}
    )


@app.get('/project/1', response_class=HTMLResponse, include_in_schema=False)
async def project(request: Request):
    return templates.TemplateResponse(
        'project/index.html',
        {'request': request}
    )


if __name__ == '__main__':
    uvicorn.run(app, port=7201)
