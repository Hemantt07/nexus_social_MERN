export default function Online({user}) {
  return (
   
    <li className="friend">
        <div className="imgContainer">
            <img src={user.profilePicture} alt="" />
            <span className="onlineIcon"></span>
        </div>
        <p className="friendName">{user.username}</p>
    </li>

  )
}
