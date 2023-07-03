import Topbar from '../components/topbar'
import Sidebar from '../components/sidebar'
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Settings() {
    const { user, dispatch } = useContext( AuthContext );
    const logout = () => {
        try {
            window.location.href = '/login';
            dispatch({ type: 'LOGOUT', payload: user });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Topbar/>
            <div className="settings-page row">
                <Sidebar/>

                <div className="settings col-md-10">
                    <h2 className='title'>Settings</h2>

                    <form action="">
                        <ul className="settings-list">
                                
                        </ul>
                    </form>

                    <button className="logout">
                        <span onClick={ logout }>
                            <LogoutIcon />Log out
                        </span>
                    </button>
                </div>
            </div>

        </>
    )
}
