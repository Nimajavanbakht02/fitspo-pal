import WorkoutList from './WorkoutList.js';
import { useState } from 'react';
import '../css/FriendList.css';

function FriendList({ friendShip, user }) {
    const [showWorkouts, setShowWorkouts] = useState(false);

    return (
        <div className='friendbox-container'>
            <h3 className='friend-name-header'>{friendShip.friend.username}</h3>
            <button className='show-workout-button' onClick={() => setShowWorkouts(!showWorkouts)}>
                {showWorkouts ? 'Hide Workouts' : 'Show Workouts'}
            </button>
            {showWorkouts ? (
                <div>
                    {friendShip.friend.workouts.length > 0 ? friendShip.friend.workouts.map((workout) => (
                        <WorkoutList key={workout.id} workout={workout} user={user} />
                    )) : <p className='no-workouts-message'>No current workouts!</p>}
                </div>
            ) : null}

            
        </div>
    );
}

export default FriendList;