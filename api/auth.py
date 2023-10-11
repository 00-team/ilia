
import logging

import httpx
from fastapi import APIRouter, Request, Response
from fastapi.responses import RedirectResponse
from pydantic import BaseModel

from api.verification import Action, verify_verification
from db.models import UserModel, UserTable
from db.user import user_add, user_get, user_update
from deps import rate_limit
from shared import settings
from shared.errors import bad_verification
from shared.tools import new_token, utc_now
from shared.validators import PhoneNumber, VerificationCode

router = APIRouter(
    prefix='/auth',
    tags=['auth'],
    dependencies=[rate_limit('auth', 30 * 60, 20, False)]
)


class LoginBody(BaseModel):
    phone: PhoneNumber
    code: VerificationCode


class LoginResponse(BaseModel):
    user: UserModel
    token: str
    created: bool


@router.get('/login/')
async def login(request: Request):
    url = httpx.URL(
        'https://accounts.google.com/o/oauth2/v2/auth',
        params={
            'client_id': settings.google_client_id,
            'redirect_uri': settings.google_redirect_uri,
            'response_type': 'code',
            'scope': ' '.join([
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
                # 'openid',
            ]),
            # 'access_type': 'offline',
            # 'prompt': 'select_account'
        }
    )

    return RedirectResponse(url)


@router.get('/gcb/')
async def google_callback(request: Request):
    # state = request.query_params.get('state')
    code = request.query_params.get('code')
    # scope = request.query_params.get('scope')
    # authuser = request.query_params.get('authuser')
    # prompt = request.query_params.get('prompt')
    error = request.query_params.get('error')

    if error:
        return RedirectResponse('/?error=' + error)

    result = httpx.post(
        'https://oauth2.googleapis.com/token',
        data={
            'client_id': settings.google_client_id,
            'client_secret': settings.google_client_secret,
            'redirect_uri': settings.google_redirect_uri,
            'code': code,
            'grant_type': 'authorization_code',
        }
    )

    if result.status_code != 200:
        return RedirectResponse('/?error=invalid_gcode')

    result = result.json()

    access_token = result.get('access_token')
    expires_in = result.get('expires_in')
    refresh_token = result.get('refresh_token')

    expires = utc_now() + expires_in

    result = httpx.get(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        # 'https://www.googleapis.com/userinfo/v2/me',
        headers={'Authorization': 'Bearer ' + access_token}
    )

    if result.status_code != 200:
        return RedirectResponse('/?error=gme')

    return result.json()


# @router.post(
#     '/login/', response_model=LoginResponse,
#     openapi_extra={'errors': [bad_verification]}
# )
# async def login(response: Response, body: LoginBody):
#     await verify_verification(
#         body.phone, body.code, Action.login
#     )
#
#     token, token_hash = new_token()
#     user = await user_get(UserTable.phone == body.phone)
#     if user is None:
#         user_id = await user_add(
#             phone=body.phone,
#             name='',
#             token=token_hash
#         )
#
#         token = f'{user_id}:{token}'
#         response.set_cookie(
#             key='Authorization',
#             value=f'Bearer {token}',
#             secure=True,
#             samesite='strict'
#         )
#
#         return {
#             'user': {
#                 'user_id': user_id,
#                 'name': '',
#                 'phone': body.phone,
#                 'email': None,
#                 'admin': None,
#                 'token': token_hash[:32],
#             },
#             'token': token,
#             'created': True,
#         }
#
#     await user_update(UserTable.user_id == user.user_id, token=token_hash)
#     user.token = token_hash[:32]
#
#     token = f'{user.user_id}:{token}'
#     response.set_cookie(
#         key='Authorization',
#         value=f'Bearer {token}',
#         secure=True,
#         samesite='strict'
#     )
#
#     return {
#         'user': user,
#         'token': token,
#         'created': False,
#     }
