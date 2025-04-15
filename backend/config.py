import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a-very-secret-key'
    # Replace <username> and <password> with your MySQL credentials.
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:legendary@localhost/vehicle_registration'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
