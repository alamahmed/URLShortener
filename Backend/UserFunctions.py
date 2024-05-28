import requests
import hashlib
from google.cloud.firestore_v1 import FieldFilter
from firebase_init import default_app
from firebase_admin import firestore, auth, exceptions
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the environment variables
Api_key = os.environ.get("API_KEY")

db = firestore.client( app = default_app )

# Function to generate HashURL
def hashGen( url ):
    hashedURL = hashlib.md5( url.encode( 'utf-8' ) )
    hashedURL = hashedURL.hexdigest()
    return hashedURL

# backend_url = 'https://short-fkjp.onrender.com/'
backend_url = 'http://127.0.0.1:8000/'
password_reset_API = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='
get_user_data_API = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key='
change_password = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key='
update_user_data_API = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key='
log_in_API = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
email_verify_API = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='
sign_up_API = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='


def get_verified_token(idToken):
    try:
        auth.verify_id_token( idToken )
        return { 'status': True }
    except auth.InvalidIdTokenError:
        return { 'status': False, 'message': 'Invalid ID token' }
    except exceptions.FirebaseError:
        return { 'status': False, 'message': 'Failed to Verify ID token' }

def get_user_info(idToken):
    try:
        decoded_token = auth.verify_id_token( idToken )
        uid = decoded_token['uid']
        email = decoded_token['email']
        name = decoded_token['name']
        return { 'status': True, 'uid': uid, 'username': name, 'email': email }
    except auth.InvalidIdTokenError:
        return { 'status': False, 'message': 'Invalid ID token' }
    except exceptions.FirebaseError:
        return { 'status': False, 'message': 'Failed to Verify ID token' }

def sign_in(email, password):

    try:
        payload = {
            'email': email,
            'password': password,
            'returnSecureToken': True
        }
        status, message = False, ''
        response = requests.post( log_in_API + Api_key, data = payload ).json()
        if response.get( 'error' ):
            error = response[ 'error' ][ 'message' ].split(':')
            message = error[ len(error) - 1 ]
        else:
            user = requests.post( get_user_data_API + Api_key, data = { 'idToken': response[ 'idToken' ] } ).json()
            if user.get( 'error' ):
                message = 'Invalid ID Token'
            elif user.get( 'emailVerified' ) == False:
                message = 'Please Verify Your email first'
            else:
                status = True
                message = 'Login Successful'
                User = get_user_info( response[ 'idToken' ] )
                user_ref = db.collection( 'Users' ).document( User[ 'uid' ] )
                if not( user_ref ):
                    user_ref.set( { 'username': User[ 'username' ], 'email': User[ 'email' ] } )
                return { 'status': status, 'token': response[ 'idToken' ], 'message': message }
        return { 'status': status, 'message': message }
    
    except requests.exceptions.HTTPError as http_err:
        print( 'HTTP Error ', http_err )
        return { 'status': False, 'message': str( http_err ) }
    
    except Exception as err:
        print( 'Exception: ', err )
        return { 'status': False, 'message': str( err ) }

def send_email_verification_link(idToken):
    verification_payload = {
        'requestType': 'VERIFY_EMAIL',
        'idToken': idToken
    }
    return requests.post(email_verify_API + Api_key, data = verification_payload).json()

def register(fullName, email, password):
    
    try:
        payload = {
            'displayName': fullName,
            'email': email,
            'password': password,
            'returnSecureToken': True
        }
        response = requests.post(sign_up_API + Api_key, data = payload).json()
        verification_response = {}

        if response.get('idToken'):
            verification_response = send_email_verification_link(response['idToken'])
        
        status, message = False, ''
        
        if response.get('error'):
            message = response['error']['message']
        elif verification_response.get('error') != None:
            message = verification_response['error']['message']
        else:
            status = True
            message = 'Please check you email for verification link'

        return { 'status': status, 'message': message }
    
    except requests.exceptions.HTTPError as http_err:
        print('HTTP Error ', http_err)
        return {'status': False, 'message': str(http_err)}
    except Exception as err:
        print('Exception: ', err)
        return {'status': False, 'message': str(err)}

def get_data(uid):
    try:
        if uid:
            data = db.collection( 'URL' ).where( filter = FieldFilter( 'uid', 'array_contains', uid )).get()
            res = []
            if data:
                for doc in data:
                    original_url = doc.to_dict()['original_url']
                    short_url = backend_url+doc.id
                    res.append({'original_url': original_url, 'short_url': short_url})
                return { 'status': True, 'data': res }
            else:
                return { 'status': True, 'message': 'Start Creating short links' }
        else: 
            return {'status': True, 'message': (f'cannot find uid which is {uid}')}
    except Exception as err:
        return { 'status': False, 'message': (f'There was an error {err}') }

def del_url(url_to_del, token):
    try:
        url_to_del = url_to_del.split('/')
        url_to_del = str( url_to_del[ len( url_to_del ) - 1 ] )
        response = get_user_info( token )
        if response['status']:
            uid = response[ 'uid' ]
            doc_ref = db.collection( 'URL' ).document( url_to_del )
            user_ref = doc_ref.get().to_dict()
            if 'uid' in user_ref:
                uids = user_ref[ 'uid' ]
                uids.remove( uid )
                doc_ref.set( { 'uid': uids }, merge = True )
                return { 'status': True, 'message': 'Successfully deleted' }
            else:
                return { 'status': False, 'message': 'User not found' }
        else:
            return response
    except Exception as err:
        return { 'status': False, 'message': 'There was an error' +{err} }
    
def update_name(idToken, username):
    try:
        payload = {
            'idToken': idToken, 
            'displayName': username,
            'returnSecureToken': True,
        }
        response = requests.post( update_user_data_API + Api_key, data = payload ).json()
        status, message = False, ''
        if response.get( 'error' ):
            message = 'error is ' + response['error']['message']
        else:
            status = True
            message = 'Your username has been changed successfully'
        return { 'status': status, 'message': message }

    except Exception as err:
        message = f'error is {err}' 
        return { 'status': False, 'message': message }
    
def update_pass(email, current_password, new_password):
    try:
        # to verify weather the current password is correct or not
        payload = {
            'email': email,
            'password': current_password,
            'returnSecureToken': True
        }
        verify_password = requests.post( log_in_API + Api_key, data = payload ).json()
        status, message = False, ''
        if verify_password.get( 'error' ):
            message = 'invalid current password'
        elif verify_password.get( 'idToken' ):
            message = 'Password has been changed successfully'
            payload = {
                'idToken': verify_password[ 'idToken' ],
                'password': new_password,
                'returnSecureToken': True
            }
            response = requests.post( change_password + Api_key, data = payload ).json()
            if response.get('error'):
                message = response['error']['message']
            else:
                status = True
                message = 'Your password has been changed successfully'

        return{ 'status': status, 'message': message }
    except Exception as err:
        return { 'status': False, 'message': err }

def reset_pass(email):
    try:
        response = requests.post(password_reset_API+Api_key, data = {'requestType': 'PASSWORD_RESET', 'email': email}).json()
        status, message = False, ''
        if response.get('error'):
            message = response['error']['message']
        else:
            status = True
            message = 'Plese Check your email for password reset link'
        return { 'status': status, 'message': message }
    except Exception as err:
        return { 'status': False, 'message': err }

