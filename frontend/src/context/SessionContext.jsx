import { createContext, useEffect, useState } from 'react'

export const SessionContext = createContext()

export const SessionProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('userToken'));
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchUser = async () => {
            if (token === null) {
                localStorage.removeItem('userToken')
            } else {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token }) // Include token in the request body
                };

                try {
                    const response = await fetch(backendURL+'verify_token', requestOptions);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const responseJson = await response.json();
                    if (responseJson.status) {
                        localStorage.setItem('userToken', token)
                    }
                    else {
                        localStorage.removeItem('userToken')
                    }
                } catch (error) {
                    localStorage.removeItem('userToken')
                }
            }

        };
        fetchUser();
    }, [token, setToken])

    return (
        <SessionContext.Provider value={[token, setToken]}>
            {props.children}
        </SessionContext.Provider>
    )
}