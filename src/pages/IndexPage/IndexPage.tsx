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
  const location = useLocation();

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

  const repoQuery = useQuery(["repos", userQuery], () => {
    if (!userQuery) return null;
    return fetch(`https://api.github.com/users/${userQuery}/repos`)
      .then((res) => res.json())
      .then((res) => {
        const repos = res.items.map((item: any) => {
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
  const debouncedOnKeyDownUser = useDebounce(onKeyDownUser, 400);

  if (error) return <>An error has occurred: ${error || ""}</>;

  return (
    <div ref={ref}>
      <FormGroup>
        <Autocomplete
          disablePortal
          id="userInput"
          value={userQuery}
          onKeyDown={debouncedOnKeyDownUser}
          isOptionEqualToValue={(option: any, value: string) => {
            return option.label.includes(value);
          }}
          options={userNames}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Search User / Organization" />
          )}
        />
        {repoOptions.length > 0 && (
          <Autocomplete
            disablePortal
            id="repoInput"
            value={userQuery}
            onKeyDown={debouncedOnKeyDownUser}
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
      </FormGroup>
    </div>
  );
}

export default IndexPage;
