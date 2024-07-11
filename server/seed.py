from random import randint, choice as rc
from faker import Faker

from app import app
from models import db, User, Workout, Goal, Friendship

if __name__ == '__main__':
    fake = Faker()
    
    def generate_fitness_sentence():
        activities = ["Running", "Cycling", "Swimming", "Yoga", "Weightlifting"]
        goals = ["improve endurance", "increase strength", "lose weight", "gain muscle", "enhance flexibility"]
        return f"{rc(activities)} to {rc(goals)}"
    
    def generate_workout_description():
        age = randint(18, 65)
        years_working_out = randint(1, 20)
        return f"{fake.name()}, aged {age}, has been working out for {years_working_out} years."
    
    with app.app_context():
        print("Creating seed...")

        # Refresh DB Data
        User.query.delete()
        Workout.query.delete()
        Goal.query.delete()
        Friendship.query.delete()


        # Create users seed
        users = []
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                profile_pic='data:image/jpeg;base64,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'
            )
            user.password_hash = f'{user.username}password'
            users.append(user)
        db.session.add_all(users)
        db.session.commit()

        # Create workouts seed
        workouts = []
        for _ in range(30):
            workout = Workout(
                type=rc(['Sprinting', 'Calisthetics', 'Hot Yoga', 'Walking', 'Weightlifting']),
                duration=randint(10, 120),
                calories_burned=randint(100, 1200),
                description=generate_workout_description(),
                username=rc(users).username
            )
            workouts.append(workout)
        db.session.add_all(workouts)
        db.session.commit()

        # Create goals seed
        goals = []
        for _ in range(20):
            goal = Goal(
                description=generate_fitness_sentence(),
                target_date=fake.date_this_year(),
                username=rc(users).username
            )
            goals.append(goal)
        db.session.add_all(goals)
        db.session.commit()

        # Create friendships seed
        friendships = []
        user_ids = [user.id for user in users]
        for _ in range(15):
            user_id = rc(user_ids)
            friend_id = rc([uid for uid in user_ids if uid != user_id])
            if not db.session.query(Friendship).filter_by(user_id=user_id, friend_id=friend_id).first():
                friendship = Friendship(
                    user_id=user_id,
                    friend_id=friend_id
                )
                friendships.append(friendship)
        db.session.add_all(friendships)
        db.session.commit()

        print("Seeding complete!")
