import "../css/WorkoutList.css";

function WorkoutList({ workout, user }) {

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5555/workouts/${workout.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }); 

        if (response.ok) {
            window.location.reload();
            alert("Workout deleted");
        } else {
            console.log("Error deleting workout");
        }
    }

    return (
        <div className="workout-box-container">
            <div className="workout-box-section">
                <h2>{workout.username}</h2>
                <p>Calories Burned: {workout.calories_burned}</p>
                <p>Duration: {workout.duration}</p>
            </div>
            <div className="workout-box-section">
                <p>Workout: {workout.type}</p>
                <p>Description: {workout.description}</p>
            </div>
            <div className="delete-button">
                {user.username === workout.username ? <button onClick={handleDelete}>Delete</button> : null}
            </div>
        </div>
    );
}

export default WorkoutList;