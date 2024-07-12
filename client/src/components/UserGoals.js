import GoalsList from './GoalsList';

function UserGoals({user}) {
    if (user.goals.length === 0) {
        return <p className="Loading-message">No Current Goals!</p>;
    }

    function renderGoals() {
        return user.goals.map((goal) => {
            return (
                <GoalsList goal={goal} key={goal.id} user={user}/>
            );
        });
    }

    return (
        <div>
            {renderGoals()}
        </div>
    )
}

export default UserGoals;