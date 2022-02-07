import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';
const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // const fetchUsers = async () => {
  //   setLoading();
  //   const response = await fetch(`https://api.github.com/users`);

  //   const data = await response.json();
  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: data,
  //   });
  // };

  const searchUsers = async (text) => {
    setLoading();
    // 1. One way to do it
    // const url = `https://api.github.com/search/users?q=${text}`;
    // const response = await fetch(`${url}`);

    // 2. Another way to do the search
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(
      `https://api.github.com/search/users?${params}`,
    );

    const { items } = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        dispatch,
        searchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
