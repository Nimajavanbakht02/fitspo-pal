import '../styles/WorkoutForm.css';

function WorkoutForm({ user }) {
  
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            duration: formData.get("duration"),
            calories_burned: formData.get("calories_burned"),
            username: user.username,
            user_id: user.id,
        };
        fetch("/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((workout) => {
                console.log(workout);
            });

        
        window.location.reload();
        alert("Workout added");
    }

  
    return (
    <div className="workout-form-container">
        <form onSubmit={handleSubmit}>
            <div className="workout-form-section">
                <label htmlFor="name" className="workout-form-label">Name:</label>
                <input type="text" id="name" name="name" />
            </div>
            <div className="workout-form-section">
                <label htmlFor="duration" className="workout-form-label">Duration:</label>
                <input type="number" id="duration" name="duration" />
            </div>
            <div className="workout-form-section">
                <label htmlFor="description" className="workout-form-label">Description:</label>
                <input type="text" id="description" name="description" />
            </div>
            <div className="workout-form-section">
                <label htmlFor="calories_burned" className="workout-form-label">Calories Burned:</label>
                <input type="number" id="calories_burned" name="calories_burned" />
            </div>
            <div className="workout-form-section">
                <input type="hidden" name="username" value={user.username} />
                <input type="hidden" name="user_id" value={user.id} />
            </div>
            <div className="workout-form-section">
                <button type="submit" className="workout-form-button">Add Workout</button>
            </div>
        </form>
    </div>
  )
}


export default WorkoutForm;
