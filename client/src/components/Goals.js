import { useEffect, useState } from 'react';
import GoalsBox from './GoalsBox';
import '../styles/Goals.css';

function Goals({ user }) {
    const [goals, setGoals] = useState();

    useEffect(() => {
        fetch('/goals')
            .then((res) => res.json())
            .then((data) => setGoals(data));
    }, []);

    return (
        <div className="goals-container">
            <h1 className="goals-header">Goals</h1>
            {goals ? goals.map((goal) => <GoalsBox key={goal.id} goal={goal} user={user}/>) : <p className="Loading-message">Loading...</p>}
        </div>
    );
}

export default Goals;