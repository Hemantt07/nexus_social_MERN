import { Link } from "react-router-dom";

export default function FriendInline( {user} ) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="item">
            <Link to={`/profile/${user.username}`}>
                    <img
                        src = { user.profilePicture ? PF+user.profilePicture : PF+'profiles/default.jpg' }
                        alt="" 
                        className = {user.username}
                    />
                    <span className="userName">
                        {user.username}
                    </span>
            </Link>
        </li>
    )
}
