import firebase_admin
import os
from dotenv import load_dotenv

load_dotenv()

# Load environment variables
project_id = os.environ.get("FIREBASE_PROJECT_ID")
private_key_id = os.environ.get("FIREBASE_PRIVATE_KEY_ID")
private_key = os.environ.get("FIREBASE_PRIVATE_KEY")
client_email = os.environ.get("FIREBASE_CLIENT_EMAIL")
client_id = os.environ.get("FIREBASE_CLIENT_ID")
auth_uri = os.environ.get("FIREBASE_AUTH_URI")
token_uri = os.environ.get("FIREBASE_TOKEN_URI")
auth_provider_x509_cert_url = os.environ.get("FIREBASE_AUTH_PROVIDER_X509_CERT_URL")
client_x509_cert_url = os.environ.get("FIREBASE_CLIENT_X509_CERT_URL")


# Construct the Firebase credentials from environment variables
firebase_credentials = {
    "type": "service_account",
    "project_id": project_id,
    "private_key_id": private_key_id,
    "private_key": private_key,
    "client_email": client_email,
    "client_id": client_id,
    "auth_uri": auth_uri,
    "token_uri": token_uri,
    "auth_provider_x509_cert_url": auth_provider_x509_cert_url,
    "client_x509_cert_url": client_x509_cert_url
}


cred = firebase_admin.credentials.Certificate( firebase_credentials )
default_app = firebase_admin.initialize_app( cred )