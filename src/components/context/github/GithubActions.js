import axios from 'axios';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

export const searchUsers = async (text) => {
  // 1. One way to do it
  // const url = `https://api.github.com/search/users?q=${text}`;
  // const response = await fetch(`${url}`);

  // 2. Another way to do the search
  const params = new URLSearchParams({
    q: text,
  });
  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);
  return { user: user.data, repos: repos.data };
};
