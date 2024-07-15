import WorkoutBox from './WorkoutBox.js';
import { useState } from 'react';
import '../styles/FriendBox.css';

function FriendBox({ friendShip, user }) {
    const [showWorkouts, setShowWorkouts] = useState(false);

    const handleName = friendShip.user_id === user.id ? friendShip.friend.username : friendShip.user.username;

    return (
        <div className='friendbox-container'>
            <div className='friendbox-header'>
                <h3 className='friend-name'>{handleName}</h3>
                <button className='show-workout-button' onClick={() => setShowWorkouts(!showWorkouts)}>
                    {showWorkouts ? 'Hide Workouts' : 'Show Workouts'}
                </button>
            </div>
            {showWorkouts ? (
                <div className='workouts-list'>
                    {friendShip.friend.workouts.length > 0 ? friendShip.friend.workouts.map((workout) => (
                        <WorkoutBox key={workout.id} workout={workout} user={user} />
                    )) : <p className='no-workouts-message'>No workouts to display</p>}
                </div>
            ) : null}
        </div>
    );
}

export default FriendBox;