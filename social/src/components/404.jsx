import { Link } from 'react-router-dom';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

export default function Error() {
  return (
    <div className="under-construction-container d-flex justify-content-center align-items-center flex-column my-5">
       
        <h1 className='text-center my-1'>
            <BrokenImageIcon className='construction_icon m-1 p-3' />404 Error
        </h1>
        <p className='text-center my-3'>The url you have entered is wrong.</p>
        <p className='text-center my-3'>
            <Link to={ '/' }>
                Go to Home Page
            </Link>
        </p>

    </div>
  )
}
