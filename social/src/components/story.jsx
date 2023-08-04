export default function ({story}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='story'>
        <div className="storyImg">
            <img src={ story.storyImg ? PF+story.storyImg : `${PF}profiles/default.jpg`} alt="story" />
        </div>
        <div className="content">
            <img src={ PF+story.profilePicture} alt="profile" className="profileImg" />
            <span className="userName">{story.username}</span>
        </div>
    </div>
  )
}

