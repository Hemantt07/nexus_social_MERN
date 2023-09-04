import { Link } from "react-router-dom";

export default function FriendInline( {user} ) {
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="item">
            <Link to={`/profile/${user.username}`}>
                    <img
                        src = { user.profilePicture ? public_folder+user.profilePicture : public_folder+'profiles/default.jpg' }
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
