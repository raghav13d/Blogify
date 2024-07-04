import { createContext, useState } from "react";

export const UserContext=createContext({});
export function UserContextProvider({children}) {
    const [userInfo,setUserInfo]=useState({});
    const url='http://localhost:4000'

    return(
        <UserContext.Provider value={{userInfo,setUserInfo,url}}>
            {children}
        </UserContext.Provider>
    )
}

