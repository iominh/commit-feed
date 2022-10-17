import { ReposType } from "@/types/ReposType";
import { UsersType } from "@/types/UsersType";
import { CommitsType } from "@/types/CommitsType";

// Set token to avoid rate limiting
const TOKEN_GITHUB = null;
let options = {};
if (TOKEN_GITHUB) {
  options = {
    headers: {
      Authorization: `token ${TOKEN_GITHUB}`,
    },
  };
}

export function getUsers(query: string): Promise<UsersType> {
  return fetch(`https://api.github.com/search/users?q=${query}`, options).then(
    (res) => res.json()
  );
}

export function getRepos(user: string) {
  return fetch(`https://api.github.com/users/${user}/repos`, options).then(
    (res) => res.json()
  );
}

export function getCommits(
  user: string,
  repo: string,
  page: number = 1
): Promise<CommitsType[]> {
  return fetch(
    `https://api.github.com/repos/${user}/${repo}/commits?page=${page}`,
    options
  ).then((res) => res.json());
}
