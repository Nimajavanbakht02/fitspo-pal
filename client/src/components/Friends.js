import FriendBox from "./FriendBox";
import { useState, useEffect } from "react";
import "../styles/Friends.css";

function Friends({ user }) {
    const [friendShips, setFriendShips] = useState();
    const [usersFriends, setUsersFriends] = useState([]);


    useEffect(() => {
        fetch("/friends")
            .then((res) => res.json())
            .then((data) => setFriendShips(data));
    }, []);

    useEffect(() => {
        if (friendShips) {
            const friends = friendShips.filter((friendShip) => friendShip.user_id === user.id || friendShip.friend_id === user.id);
            setUsersFriends(friends);
        }
    }, [friendShips, user.id]);

    
    if (!friendShips) {
        return <p className="Loading-message">Loading...</p>;
    }

    
    return (
        <div className="friends-container">
            <h1 className="friends-header">Friends</h1>
            {usersFriends.length > 0 ? usersFriends.map((friendShip) => <FriendBox key={friendShip.id} friendShip={friendShip} user={user} />) : <p className="no-friends-message">You have no friends</p>}
        </div>
    );
}

export default Friends;