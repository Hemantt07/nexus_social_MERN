import { Link } from "react-router-dom";

export default function Online({user}) {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to="#">
      <li className="friend">
          <div className="imgContainer">
              <img src={ user.profilePicture ? public_folder+user.profilePicture : public_folder+'profiles/default.jpg' } alt="" />
              <span className="onlineIcon"></span>
          </div>
          <p className="friendName">{user.username}</p>
      </li>
    </Link>
  )
}
