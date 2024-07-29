import { createContext, useContext, useEffect, useState } from 'react'
import { SessionContext } from './SessionContext'

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [token] = useContext(SessionContext)
    const [user, setUser] = useState(localStorage.getItem('user') | { uid: '', username: '', email: '' })

    const backendURL = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        const getData = async () => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            };

            try {
                const response = await fetch(backendURL + 'get_user', requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseJson = await response.json();
                if (responseJson.status) {
                    setUser(prevState => ({
                        ...prevState,
                        uid: responseJson.uid,
                        email: responseJson.email,
                        username: responseJson.username,
                    }));
                }
            } catch (error) {
                localStorage.removeItem('userToken')
            }
        }
        if (token)
            getData()
        //eslint-disable-next-line
    }, [token])

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}