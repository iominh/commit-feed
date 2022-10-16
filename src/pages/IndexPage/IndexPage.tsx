import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";

type UserOption = {
  label: string;
  id: number;
};

function IndexPage() {
  const ref = useRef(null);
  const [userNames, setUserNames] = useState([]);
  const [repoOptions, setRepoOptions] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [repoQuery, setRepoQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { error, data } = useQuery(["user", userQuery], () => {
    if (!userQuery) return null;
    return fetch(
      `https://api.github.com/search/users?` +
        new URLSearchParams({
          q: userQuery,
        })
    )
      .then((res) => res.json())
      .then((res) => {
        const newUsers = res.items.map((item: any) => {
          return {
            label: item.login,
          };
        });
        setUserNames(newUsers);
        return newUsers;
      });
  });

  const repoQueryResults = useQuery(["repos", userQuery], () => {
    if (!userQuery) return null;
    return fetch(`https://api.github.com/users/${userQuery}/repos`)
      .then((res) => res.json())
      .then((res) => {
        const repos = res.map((item: any) => {
          return {
            label: item.name,
          };
        });
        setRepoOptions(repos);
        return repos;
      });
  });

  useEffect(() => {
    document.title = `Commit Feed`;
  }, [location]);

  const onKeyDownUser = (e: any) => {
    if (/\w/gi.test(e.target.value)) {
      setUserQuery(e.target.value);
    }
  };
  const debouncedOnKeyDownUser = useDebounce(onKeyDownUser, 300);

  const onKeyDownRepo = (e: any) => {
    if (/\w/gi.test(e.target.value)) {
      setRepoQuery(e.target.value);
    }
  };
  const debouncedOnKeyDownRepo = useDebounce(onKeyDownRepo, 300);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/${userQuery}/${repoQuery}`);
  }

  if (error) return <>An error has occurred: ${error || ""}</>;

  return (
    <div ref={ref}>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          disablePortal
          id="userInput"
          value={userQuery}
          onKeyDown={debouncedOnKeyDownUser}
          onInputChange={(e: any) => {
            console.log('keyodwn', e);
          }}
          isOptionEqualToValue={(option: any, value: string) => {
            return option.label.includes(value);
          }}
          options={userNames}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Search User / Organization" />
          )}
        />
        {userQuery.length > 0 && repoOptions.length > 0 && (
          <Autocomplete
            disablePortal
            id="repoInput"
            value={repoQuery}
            onKeyDown={debouncedOnKeyDownRepo}
            isOptionEqualToValue={(option: any, value: string) => {
              return option.label.includes(value);
            }}
            options={repoOptions}
            sx={{ width: 300, marginTop: 4, marginBottom: 4 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Repo" />
            )}
          />
        )}
        {repoOptions.length > 0 && <button>Submit</button>}
      </form>
    </div>
  );
}

export default IndexPage;
