# To activate venv
# source myenv/bin/activate
# To Run python server locally with reload on change
# uvicorn main:app --reload
import hashlib
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.responses import RedirectResponse

# Use a service account.
cred = credentials.Certificate( './urlshortner.json' )
app = firebase_admin.initialize_app( cred )
db = firestore.client()
app = FastAPI()

doc_ref = db.collection( 'URLShortner' ).document( 'URL' )

# Function to generate HashURL
def hashGen( url ):
    hashedURL = hashlib.md5( url.encode( 'utf-8' ) )
    hashedURL = hashedURL.hexdigest()
    return hashedURL

# Remove CORS Error
origins = [
    'https://alamahmed.github.io/URLShortner/',
    'http://localhost',
    'http://localhost:5500',
    'http://0.0.0.0',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    return { 'Message': 'Success', 'URL': hashedURL }

@app.get( '/{hash}')
async def redirect( hash:str ):
    data = doc_ref.get()
    url = data.to_dict()[ hash ]
    if(url):
        response = RedirectResponse( url = data.to_dict()[ hash ] )
        return response
    else:
        return { 'message': 'Please enter a valid url' }