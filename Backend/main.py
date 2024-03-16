# To activate venv
# source myenv/bin/activate
# To Run python server locally with reload on change
# uvicorn main:app --reload
import requests
import hashlib
import firebase_admin
from firebase_admin import credentials, firestore, auth
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.responses import RedirectResponse

# Use a service account.
cred = credentials.Certificate( './urlshortner.json' )
app = firebase_admin.initialize_app( cred )
db = firestore.client()
app = FastAPI()

doc_ref = db.collection( 'URLShortener' ).document( 'URL' )

# Function to generate HashURL
def hashGen( url ):
    hashedURL = hashlib.md5( url.encode( 'utf-8' ) )
    hashedURL = hashedURL.hexdigest()
    return hashedURL

def createUser(fullname, email, password):
    try :
        auth.create_user(
            display_name=fullname,
            email=email,
            password=password,
        )
        return {'message': 'Signup Sucessfull', 'status': 'Success'}
    except ValueError as message:
        return {'message': message, 'status': 'Error'}
    except auth.EmailAlreadyExistsError as e:
        return {'message': e.default_message, 'status': 'Error'}


def getUserDatabyEmail(email):
    try:
        user = auth.get_user_by_email(email)
        return user
    except auth.EmailNotFoundError as e:
        return {'Message': e.default_message}
    
    
def updatePassword(email, newPassword):
    user = auth.get_user_by_email(email)
    auth.update_user(
        user.uid,
        password=newPassword,
    )

def VerifyUser(password):
    user = getUserDatabyEmail(email)
    if user.password == password:
        return True

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


# Allow to pass string
class URL( BaseModel ):
    url:str

# Create post request
@app.post( '/' )
async def uploadItem( URL: URL ):
    url = URL.url
    hashedURL = hashGen( url )
    # Add url in firebase database
    doc_ref.set( { hashedURL: url }, merge = True )
    # Return message and shortenedURL
    return { 'message': 'Success', 'URL': hashedURL }

class User( BaseModel ):
    fullName: str 
    email: str
    password: str

@app.post( '/signup' )
async def sign_up( User: User ):
    # fullName, email, password = User.fullName, User.email, User.password
    response = createUser(User.fullName, User.email, User.password)
    return response


# Redirect Request
@app.get( '/{hash}')
async def redirect( hash:str ):
    data = doc_ref.get()
    url = data.to_dict()[ hash ]
    if(url):
        response = RedirectResponse( url = data.to_dict()[ hash ] )
        return response
    else:
        return { 'message': 'Please enter a valid url' }