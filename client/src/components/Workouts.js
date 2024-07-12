import WorkoutList from "./WorkoutList";
import { useState, useEffect, useContext } from "react";



function Workouts({ user, ThemeContext }) {
    const [workouts, setWorkouts] = useState();
    const theme = useContext(ThemeContext);
    const classAddition = theme === 'dark' ? '-dark' : '';


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
            {workouts ? workouts.map((workout) => (
                <WorkoutList key={workout.id} workout={workout} user={user} />
            ))
                : <p className="no-workouts-message">No current workouts!</p>
            }
        </div>
    );
}


export default Workouts;