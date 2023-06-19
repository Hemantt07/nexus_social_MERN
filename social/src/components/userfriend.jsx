import { Link } from "react-router-dom";

export default function Userfriend({friend}) {
    const publicDir = process.env.REACT_APP_PUBLIC_FOLDER;
     return (
         <li className="usersfriend col-md-3">
             <Link to={`/profile/?userId=${friend.username}`}>
                <img
                    src = { friend.profilePicture || publicDir+'images/profiles/default.jpg' }
                    alt="" 
                    className = {friend.username}
                />
                <span className="friendName">
                    {friend.username}
                </span>
            </Link>
        </li>
    )
}
