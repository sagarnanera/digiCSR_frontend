import React, { createContext, useState, useContext } from 'react';

// New context
const UserContext = createContext();

// Provider component
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isRegistered, setIsRegistered] = useState(false);

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    const updateRegistrationStatus = (status) => {
        setIsRegistered(status);
    };

    return (
        <UserContext.Provider value={{ user, isRegistered, updateUser, updateRegistrationStatus }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access the user context
export const useUserContext = () => useContext(UserContext);
