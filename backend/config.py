import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a-very-secret-key'
    # Replace <username> and <password> with your MySQL credentials.
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:legendary@localhost/vehicle_registration'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME') or 'sanidhyapatel49@gmail.com'
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD') or '#'
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER') or 'sanidhyapatel49@gmail.com'