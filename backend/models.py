from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    contact = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120))
    aadhaar = db.Column(db.String(20), nullable=False)
    license = db.Column(db.String(50), unique=True, nullable=False)
    carType = db.Column(db.String(50), nullable=False)
    carNumber = db.Column(db.String(50), nullable=False)
    registration_cert = db.Column(db.String(200))
    vehicle_image = db.Column(db.String(200))
    journeys = db.relationship('Journey', backref='user', lazy=True)

class Journey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String(100), nullable=False)
    from_state = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    passengers = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)



