export default function Userfriend({friend}) {
    const publicDir = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
            <li className="usersfriend col-md-3">

                <img
                    src = { publicDir + friend.profilePicture}
                    alt="" 
                    className = {friend.username}
                />
                <span className="friendName">
                    {friend.username}
                </span>

            </li>
  )
}
