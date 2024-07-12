import WorkoutList from "./WorkoutList";


function UserWorkouts({ user }) {
    if (user.workouts.length === 0) {
        return <p className="Loading-message">No Current Workouts!</p>;
    }

    function renderWorkouts() {
        return user.workouts.map((workout) => {
            return (
                <WorkoutList workout={workout} key={workout.id} user={user} />
            );
        });
    }

    return (
        <div>
            {user.workouts.length === 0 ? <p className="Loading-message">No Current Workouts!</p> : renderWorkouts()}
        </div>
    )
}

export default UserWorkouts;