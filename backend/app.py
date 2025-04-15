from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db, User, Journey
from datetime import datetime
import os
from flask_mail import Mail, Message # type: ignore

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)
mail = Mail(app)

db.init_app(app)

# Create tables on startup.
with app.app_context():
    db.create_all()
    # Create a superuser if not exists.
    admin = User.query.filter_by(license="admin").first()
    if not admin:
        admin = User(
            name="admin",
            contact="12345678",
            email="admin@example.com",
            aadhaar="000000000000",
            license="admin",
            carType="Admin",
            carNumber="ADMIN-000",
            registration_cert="",
            vehicle_image=""
        )
        db.session.add(admin)
        db.session.commit()

@app.route('/')
def index():
    return "Welcome to the Vehicle Registration Backend"

# Endpoint for sign-up registration.
@app.route('/api/signup', methods=['POST'])
def signup():
    # For file uploads, ensure your frontend uses multipart/form-data.
    data = request.form
    print("Received signup data:", data)  # Debug print
    new_user = User(
        name=data.get('name'),
        contact=data.get('contact'),
        email=data.get('email'),
        aadhaar=data.get('aadhaar'),
        license=data.get('license'),
        carType=data.get('carType'),
        carNumber=data.get('carNumber'),
        registration_cert="path/to/registration_cert",  # Implement file saving as needed.
        vehicle_image="path/to/vehicle_image"             # Implement file saving as needed.
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Registration successful!"}), 201

# Endpoint for login.
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    license_no = data.get('license')
    contact = data.get('contact')
    user = User.query.filter_by(license=license_no, contact=contact).first()
    if user:
        return jsonify({"message": "Login successful!", "user": user.name}), 200
    else:
        return jsonify({"message": "User not found or credentials are incorrect."}), 404

# Endpoint for journey planning.
@app.route('/api/journey', methods=['POST'])
def plan_journey():
    data = request.get_json()
    user_license = data.get('license')
    user = User.query.filter_by(license=user_license).first()
    if not user:
        return jsonify({"message": "User not found."}), 404

    existing = Journey.query.filter_by(user_id=user.id).order_by(Journey.start_date.desc()).first()
    if existing and existing.end_date >= datetime.today().date():
        return jsonify({"message": "You already have an ongoing journey."}), 400

    journey = Journey(
        destination=data.get('destination'),
        from_state=data.get('fromState'),
        start_date=datetime.strptime(data.get('startDate'), '%Y-%m-%d').date(),
        end_date=datetime.strptime(data.get('endDate'), '%Y-%m-%d').date(),
        passengers=data.get('passengers'),
        user_id=user.id
    )
    db.session.add(journey)
    db.session.commit()

    if user.email:
        msg = Message(
            subject="Journey Booking Confirmation",
            recipients=[user.email]
        )

        msg.body = (
            f"Hello {user.name},\n\n"
            f"Your journey from {data.get('fromState')} to {data.get('destination')} has been successfully booked.\n"
            f"Start Date: {data.get('startDate')}\n"
            f"End Date: {data.get('endDate')}\n"
            f"Passengers: {data.get('passengers')}\n\n"
            "Thank you for using KUMBH-TS!"
        )
        try:
            mail.send(msg)
        except Exception as e:
            print(f"Error sending email: {e}")
    
    return jsonify({"message": "Journey planned successfully and confirmation email sent!"}), 201

# Endpoint for profile editing (example)
@app.route('/api/profile', methods=['POST'])
def edit_profile():
    data = request.form
    user_license = data.get('license')
    user = User.query.filter_by(license=user_license).first()
    if not user:
        return jsonify({"message": "User not found."}), 404

    user.contact = data.get('contact', user.contact)
    # Implement vehicle addition/editing if needed.
    db.session.commit()
    return jsonify({"message": "Profile updated successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)



