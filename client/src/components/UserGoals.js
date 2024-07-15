import GoalBox from './GoalsBox';

function UserGoals({user}) {
    if (user.goals.length === 0) {
        return <p className="Loading-message">No Goals to display</p>;
    }

    function renderGoals() {
        return user.goals.map((goal) => {
            return (
                <GoalBox goal={goal} key={goal.id} user={user}/>
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