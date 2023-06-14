export default function Online({user}) {
  const publicF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
   
    <li className="friend">
        <div className="imgContainer">
            <img src={ publicF + user.profilePicture } alt="" />
            <span className="onlineIcon"></span>
        </div>
        <p className="friendName">{user.username}</p>
    </li>

  )
}
