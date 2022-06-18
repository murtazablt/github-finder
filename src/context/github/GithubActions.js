import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
  baseURL: GITHUB_URL,
});

//Get search results
export const searchUsers = async (searchInput) => {
  const params = new URLSearchParams({
    q: searchInput,
  });

  const response = await github.get(`/search/users?${params}`);
  const items = response.data.items;

  return items;
};

//Get user and repos
export const getUserAndRepos = async (username) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${username}`),
    github.get(`/users/${username}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};
