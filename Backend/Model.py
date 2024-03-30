from pydantic import BaseModel

class User_signup( BaseModel ):
    fullName: str
    email: str
    password: str

class User_login( BaseModel ):
    email: str
    password: str

class Url( BaseModel ):
    url: str
    token: str

class Id_token( BaseModel ):
    token: str | None = None

class User_id( BaseModel ):
    uid: str | None = None

class User_name( BaseModel ):
    username: str
    token: str

class Password( BaseModel ):
    new_pass: str
    curr_pass: str
    email: str

class Email( BaseModel ):
    email: str
