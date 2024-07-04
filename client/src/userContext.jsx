import { createContext, useState } from "react";

export const UserContext=createContext({});
export function UserContextProvider({children}) {
    const [userInfo,setUserInfo]=useState({});
    const url='https://blogify-backend-cxsm.onrender.com'

    return(
        <UserContext.Provider value={{userInfo,setUserInfo,url}}>
            {children}
        </UserContext.Provider>
    )
}

