import React from 'react';
const axios = require('axios');
// components
import Loading from '../components/Loading';
// hooks
import { useGetUser } from '../hooks/user';

// user context
const UserContext = React.createContext(null);

// user provider
function UserProvider(props) {
  const { data: user, ...userQuery } = useGetUser();

  // loading user
  if (userQuery.isLoading) {
    return <Loading />;
  }

  return <UserContext.Provider value={user} {...props} />;
}

// use user context hook
function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser() must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUser };
