export default function Userfriend({friend}) {
  return (
            <li className="usersfriend col-md-3">

                <img
                    src = {friend.profilePicture}
                    alt="" 
                    className = {friend.username}
                />
                <span className="friendName">
                    {friend.username}
                </span>

            </li>
  )
}
