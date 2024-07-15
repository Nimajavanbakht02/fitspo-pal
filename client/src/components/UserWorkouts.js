import WorkoutBox from "./WorkoutBox";


function UserWorkouts({ user }) {
    if (user.workouts.length === 0) {
        return <p className="Loading-message">No workouts to display</p>;
    }

    function renderWorkouts() {
        return user.workouts.map((workout) => {
            return (
                <WorkoutBox workout={workout} key={workout.id} user={user} />
            );
        });
    }

    return (
        <div>
            {user.workouts.length === 0 ? <p className="Loading-message">No workouts to display</p> : renderWorkouts()}
        </div>
    )
}

export default UserWorkouts;