import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user :{
        _id : '647f2e30bca1bc420d29cd2d',
        username : "Aakanksha Raya",
        email : "akshh@gmail.com",
        password : "$2b$10$D.FvR29cJ8SV05d5gTfv2uEX5lHvnp7tuYy0Q0Hk7L3gIB7dtijie",
        profilePicture : "http://localhost:3000/assets/images/profiles/profile6.jpeg",
        coverPicture : "http://localhost:3000/assets/images/posts/post14.jpeg",
        followers : [],
        followings : [ 
            "647f2dffbca1bc420d29cd2b",
            "647f07d41b53f9ecc1c0db99", 
            "6490285cf377eb9ab1d63116",
            "64900b4935d4763d62a0226d",
            "647ed0d41b53f9ecc1c0db97",
        ],
        isAdmin : false,
        createdAt : '2023-06-06T13:01:36.861+00:00',
        updatedAt : '2023-06-27T11:46:07.166+00:00',
        __v : 0,
        city : "Mohali",
        desc : "Hey there Iam using Nexus Social",
        from : "Himachal Pradesh",
        sex : 1
    },
    isFetching: false,
    error: false
}

export const AuthContext = createContext( INITIAL_STATE );

export const AuthContextProcvider = ({ children })=>{
    const [ state, dispatch ] = useReducer( AuthReducer, INITIAL_STATE );

    return (
        <AuthContext.Provider 
            value={ 
                { 
                    user: state.user, 
                    isFetching: state.isFetching, 
                    error: state.error,
                    dispatch,
                } 
            }
        >
            { children }
        </AuthContext.Provider>
    )
}