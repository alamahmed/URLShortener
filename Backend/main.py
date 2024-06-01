# To activate venv
# source myenv/bin/activate
# To Run python server locally with reload on change
# uvicorn main:app --reload
from UserFunctions import register, sign_in, get_user_info, get_data, get_verified_token, del_url, update_name, update_pass, reset_pass
from Model import User_signup, User_login, Url, Id_token, User_id, User_name, Password, Email
import hashlib
from firebase_init import default_app
from firebase_admin import firestore
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

db = firestore.client( app = default_app )
db_ref = db.collection( 'URL' )

app = FastAPI()

# Function to generate HashURL
def hashGen( url ):
    hashedURL = hashlib.md5( url.encode( 'utf-8' ) )
    hashedURL = hashedURL.hexdigest()
    return hashedURL

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Create post request
@app.post( '/' )
async def uploadItem( URL: Url ):
    url = URL.url
    # Get hashed url
    short_url = hashGen( url )
    # Add short_url in firebase database
    doc_ref = db_ref.document( short_url )
    if(URL.token):
        # Get user ID from token to verify the token
        response = get_user_info( URL.token )
        # Add hashed URL to user to later retrieve data
        if response[ 'status' ]:
            uid = response['uid']
            # Get UID list from firestore database
            data = doc_ref.get().to_dict()
            user_ids = []
            # if data:
            if data and 'uid' in data:
                user_ids = data['uid']
            user_ids.append( uid )
            doc_ref.set( { 'uid': user_ids }, merge = True )

    # Add original_url in firebase database
    doc_ref.set( {'original_url': url}, merge = True )
    # returning short Url as URL
    return { 'message': 'Success', 'URL': short_url }

@app.post( '/verify_token' )
async def verify_token( idToken: Id_token ):
    response = get_verified_token(idToken.token)
    return response

@app.post( '/signup' )
async def sign_up( User: User_signup ):
    response = register(User.fullName, User.email, User.password)
    return response

@app.post( '/login' )
async def log_in( User: User_login ):
    response = sign_in( User.email, User.password )
    return response

@app.post( '/get_user' )
async def get_user( idToken: Id_token ):
    response = get_user_info(idToken.token)
    return response

@app.post( '/get_data' )
async def get_user_data( userID: User_id ):
    response = get_data(userID.uid)
    return response;

@app.post( '/del_url_from_user' )
async def del_url_from_user( data: Url ):
    response = del_url( data.url, data.token )
    return response

@app.post( '/update_username' )
async def update_username( data: User_name ):
    response = update_name( data.token, data.username )
    return response

@app.post( '/update_password' )
async def update_password( data: Password ):
    response = update_pass( data.email, data.curr_pass, data.new_pass )
    return response

@app.post( '/reset_password' )
async def reset_password( data: Email ) :
    response = reset_pass( data.email )
    return response

# Redirect Request
@app.get( '/{hash}' )
async def redirect( hash:str ):
    try:
        doc_ref = db_ref.document( hash ).get().to_dict()
        response = RedirectResponse( url = doc_ref[ 'original_url' ] )
        return response
    except Exception as err:
        return {'message': f'error is {err}'}
    
