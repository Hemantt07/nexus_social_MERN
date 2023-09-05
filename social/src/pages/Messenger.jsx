import Topbar from '../components/topbar'
import Sidebar from '../components/sidebar'
import Chat from '../components/Chat'
import FriendsList from '../components/FriendsList'

export default function Messenger() {
  return (
        <>
        <Topbar/>
        <div className="messenger-page row">
            <Sidebar/>
            <Chat />
            <FriendsList page="chat" />
        </div>
    </>
  )
}
