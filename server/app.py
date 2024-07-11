from flask import Flask, request, jsonify, session
from flask_restful import Resource
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from models import User, Workout, Goal, Friendship
from config import db, app

# Routes

@app.before_request
def check_if_logged_in():
    open_access_list = [
        'signup',
        'login',
        'check_session',
        'register',
        'workouts',
        'goals',
        'friends',
        'users',
        'users/<int:id>',
        'workouts/<int:id>',
        'goals/<int:id>',
        'friends/<int:id>'
    ]

    if (request.endpoint) not in open_access_list and (not session.get('user_id')):
        return {'error': '401 Unauthorized'}, 401


@app.route('/')
def index():
    return "welcome to the fitness tracker!"

@app.route('/signup', methods=['POST'], endpoint='signup')
def signup():
    request_json = request.get_json()


    username = request_json.get('username')
    password = request_json.get('password')
    email = request_json.get('email')

    if not username or not password or not email:
        return {'error': 'Username, password, and email are required'}, 400


    new_user = User(username=username, email=email, _password_hash=password, profile_pic='data:image/png;base64,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')

    db.session.add(new_user)

    try:
        db.session.commit()
    except IntegrityError:
        return {'error': 'Username or email already exists'}, 400

    session['user_id'] = new_user.id

    return new_user.to_dict(), 201
    
@app.route('/login', methods=['POST'], endpoint='login')
def login():
    request_json = request.get_json()

    username = request_json.get('username')
    password = request_json.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not user.authenticate(password):
        return {'error': 'Invalid username or password'}, 401

    session['user_id'] = user.id

    return user.to_dict(), 200
        
@app.route('/logout', methods=['DELETE'], endpoint='logout')
def logout():
    session.clear()
    return {}, 204

@app.route('/check_session', methods=['GET'], endpoint='check_session')
def check_session():
    if user_id := session.get('user_id'):
        user = User.query.get(user_id)
        return user.to_dict(), 200
    else:
        return {}, 401


@app.route('/users', methods=['GET'], endpoint='users')
def users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200


@app.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'], endpoint='users/<int:id>')
def manage_user(id):
    user = User.query.get_or_404(id)
    workouts = Workout.query.filter_by(user_id=id).all()
    goals = Goal.query.filter_by(user_id=id).all()
    friends = Friendship.query.filter_by(user_id=id).all()
    if request.method == 'GET':
        return jsonify(user.to_dict()), 200
    elif request.method == 'PUT':
        data = request.get_json()
        user.username = data['username']
        user.email = data['email']
        db.session.commit()
        return jsonify({"message": "User profile updated successfully!"}), 200
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        logout()
        return jsonify({"message": "User profile deleted successfully!"}), 200


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "New User registration completed!"}), 201



@app.route('/workouts', methods=['GET', 'POST'], endpoint='workouts')
def workouts():
    if request.method == 'POST':
        data = request.get_json()
        new_workout = Workout(type=data['type'], duration=data['duration'], calories_burned=data['calories_burned'], user_id=data['user_id'])
        db.session.add(new_workout)
        db.session.commit()
        return jsonify({"message": "Workout logged successfully!"}), 201
    else:
        workouts = Workout.query.all()
        return jsonify([workout.to_dict() for workout in workouts]), 200


@app.route('/workouts/<int:id>', methods=['GET', 'PUT', 'DELETE'], endpoint='workouts/<int:id>')
def manage_workout(id):
    workout = Workout.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(workout.to_dict()), 200
    elif request.method == 'PUT':
        data = request.get_json()
        workout.type = data['type']
        workout.duration = data['duration']
        workout.calories_burned = data['calories_burned']
        db.session.commit()
        return jsonify({"message": "Workout updated successfully!"}), 200
    elif request.method == 'DELETE':
        db.session.delete(workout)
        db.session.commit()
        return jsonify({"message": "Workout deleted successfully!"}), 200


@app.route('/goals', methods=['GET', 'POST'], endpoint='goals')
def goals():
    if request.method == 'POST':
        data = request.get_json()
        new_goal = Goal(description=data['description'], target_date=data['target_date'], user_id=data['user_id'])
        db.session.add(new_goal)
        db.session.commit()
        return jsonify({"message": "Goal set and added to the goal chart successfully!"}), 201
    else:
        goals = Goal.query.all()
        return jsonify([goal.to_dict() for goal in goals]), 200
    

@app.route('/goals/<int:id>', methods=['GET', 'PUT', 'DELETE'], endpoint='goals/<int:id>')
def manage_goal(id):
    goal = Goal.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(goal.to_dict()), 200
    elif request.method == 'PUT':
        data = request.get_json()
        goal.description = data['description']
        goal.target_date = data['target_date']
        db.session.commit()
        return jsonify({"message": "Goal updated successfully!"}), 200
    elif request.method == 'DELETE':
        db.session.delete(goal)
        db.session.commit()
        return jsonify({"message": "Goal deleted from goal chart successfully!"}), 200
    


@app.route('/friends', methods=['GET', 'POST'], endpoint='friends')
def friends():
    if request.method == 'POST':
        data = request.get_json()
        new_friendship = Friendship(user_id=data['user_id'], friend_id=data['friend_id'])
        db.session.add(new_friendship)
        db.session.commit()
        return jsonify({"message": "Friend added to friend's list successfully!"}), 201
    else:
        friendships = Friendship.query.all()
        return jsonify([friendship.to_dict() for friendship in friendships]), 200
    

@app.route('/friends/<int:id>', methods=['GET', 'DELETE'], endpoint='friends/<int:id>')
def manage_friend(id):
    friendship = Friendship.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(friendship.to_dict()), 200
    elif request.method == 'DELETE':
        db.session.delete(friendship)
        db.session.commit()
        return jsonify({"message": "Friend removed from friend's list successfully!"}), 200

if __name__ == '__main__':
    app.run(port=5555, debug=True)