from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt, jwt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    _password_hash = db.Column(db.String(200), nullable=False)
    workouts = db.relationship('Workout', backref='user', lazy=True)
    goals = db.relationship('Goal', backref='user', lazy=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    profile_pic = db.Column(db.String(500), nullable=True)
    serialize_rules = ('-password', '-friendships.user', '-friendships.friend')

    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 3:
            raise ValueError('Username too short! Must be at 3 or more characters long!')
        return username
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Passwords may not be seen!')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    
    def __repr__(self):
        return f'<User {self.username}>'

class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    calories_burned = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(200), nullable=True)
    username = db.Column(db.String(80), db.ForeignKey('users.username'), nullable=False)

    serialize_rules = ('-user',)

    def __repr__(self):
      return f'<Workout {self.type}>'

class Goal(db.Model, SerializerMixin):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    target_date = db.Column(db.Date, nullable=False)
    username = db.Column(db.String(80), db.ForeignKey('users.username'), nullable=False)

    serialize_rules = ('-user',)

    def __repr__(self):
        return f'<Goal {self.description}>'

class Friendship(db.Model, SerializerMixin):
    __tablename__ = 'friendships'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', foreign_keys=[user_id], backref='friendships')
    friend = db.relationship('User', foreign_keys=[friend_id])

    serialize_rules = ('-user.friendships', '-friend.friendships')

    def __repr__(self):
        return f'<Friendship {self.id}>'