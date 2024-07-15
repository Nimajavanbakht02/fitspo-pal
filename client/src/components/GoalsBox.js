import '../styles/GoalBox.css'


function GoalsBox({ goal, user }) {

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5555/goals/${goal.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            window.location.reload();
        } else {
            console.log("Error deleting goal");
        }
    }

    return (
        <div className='goalsbox-container'>
            <h2>{goal.username}</h2>
            <p><strong>Goal:</strong> {goal.description}</p>
            <p><strong>Target Date:</strong> {goal.target_date}</p>
            {user.username === goal.username ? <button onClick={handleDelete}>Delete</button> : null}
        </div>
    );
}

export default GoalsBox;