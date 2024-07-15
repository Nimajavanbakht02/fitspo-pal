import "../styles/WorkoutBox.css";

function WorkoutBox({ workout, user }) {

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
    console.log(workout)

    const handleName = workout.user_id !== user.id ? workout.username : user.username



    return (
        <div className="workout-box-container">
            <div className="workout-box-left">
                <div className="workout-box-username-container">
                    {user.profile_pic ? <img src={user.profile_pic} alt="profile-pic" /> : null}
                    <h2>{handleName}</h2>
                </div>
                <p>Calories Burned: {workout.calories_burned}</p>
                <p>Duration: {workout.duration}/mins</p>
            </div>
            <div className="workout-box-right">
                <p>Workout: {workout.type}</p>
                <p>Description: {workout.description}</p>
                {user.username === workout.username ? <button className="delete-button" onClick={handleDelete}>Delete</button> : null}
            </div>
        </div>
    );
}

export default WorkoutBox;
