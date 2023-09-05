import axios from "axios";
import { toast } from "react-toastify";

export const loginCall = async( userCredentials, dispatch )=>{

    dispatch({ type: "LOGIN_START" });

    try {

        const res = await axios.post( process.env.REACT_APP_BASE_PATH_API+'auth/login', userCredentials );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

    } catch (error) {
        error.response ? toast.error(error.response.data) : toast.error(error.message)
        dispatch({ type: "LOGIN_FAILURE", payload: error });
        
    }

}

