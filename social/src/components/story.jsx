export default function ({story}) {
  return (
    <div className='story'>
        <div className="storyImg">
            <img src={story.storyImage} alt="" />
        </div>
        <div className="content">
            <img src={story.profilePicture} alt="" className="profileImg" />
            <span className="userName">{story.username}</span>
        </div>
    </div>
  )
}

