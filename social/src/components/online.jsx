import { Link } from "react-router-dom";

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to="#">
      <li className="friend">
          <div className="imgContainer">
              <img src={ user.profilePicture ? PF+user.profilePicture : PF+'profiles/default.jpg' } alt="" />
              <span className="onlineIcon"></span>
          </div>
          <p className="friendName">{user.username}</p>
      </li>
    </Link>
  )
}
