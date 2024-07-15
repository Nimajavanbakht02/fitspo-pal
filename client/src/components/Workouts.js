import WorkoutBox from "./WorkoutBox";
import { useState, useEffect } from "react";
import WorkoutForm from "./WorkoutForm";

function Workouts({ user }) {
    const [workouts, setWorkouts] = useState();


    useEffect(() => {
        fetch("http://localhost:5555/workouts")
            .then((res) => res.json())
            .then((data) => setWorkouts(data));
    }, []);

    if (!workouts) {
        return <p className="Loading-message">Loading...</p>;
    }



    return (
        <div>
            {user ? <WorkoutForm user={user} /> : null}
            {workouts ? workouts.map((workout) => (
                <WorkoutBox key={workout.id} workout={workout} user={user} />
            ))
                : <p className="no-workouts-message">No workouts to display</p>
            }
        </div>
    );
}


export default Workouts;