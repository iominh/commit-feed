import React, { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { getUsers, getRepos } from "../../utils/api";

type UserOption = {
  label: string;
  id: number;
};

function IndexPage() {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const user = searchParams.get("user") || "";
  const repo = searchParams.get("repo") || "";

  const [showUsers, setShowUsers] = useState(false);
  const [showRepos, setShowRepos] = useState(false);
  const [userError, setUserError] = React.useState("");

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);

  const [users, setUsers] = useState<string[]>([]);
  const [repos, setRepos] = useState<string[]>([]);

  useEffect(() => {
    document.title = `Commit Feed`;
    if (user && userError && users.length > 0) {
      setUserError("");
    }

    if (repos.length > 0 && userError) {
      setRepos([]);
    }
  }, [location, user, userError, users, repos]);

  useEffect(() => {
    if (
      users.length > 0 &&
      !showUsers &&
      repos.length === 0 &&
      !userError &&
      user
    ) {
      setShowUsers(true);
    }
  }, [users, showUsers, user, userError, repos]);

  const handleChangeUser = React.useCallback(
    (value: string) => {
      if (!value.trim()) {
        setUsers([]);
        return null;
      }

      setIsLoadingUsers(true);

      getUsers(value).then((data) => {
        setIsLoadingUsers(false);
        const newUsers = data.items.map((item: { login: any }) => item.login);
        setUsers(newUsers);

        if (data.items.length === 0) {
          setUserError("User not found");
          if (user && repo) {
            setSearchParams({ user });
          }
        } else if (user && !isLoadingRepos) {
          setSearchParams({ user: value, ...(repo ? { repo } : {}) });
          setIsLoadingRepos(true);
          getRepos(newUsers[0]).then((data) => {
            setIsLoadingRepos(false);
            setRepos(data.map((item: { name: any }) => item.name));
          });
        }
      });
    },
    [isLoadingRepos, repo, user]
  );
  const debouncedChangeHandler = useDebounce(handleChangeUser, 300);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (user && repo) {
      navigate(`/${user}/${repo}`);
    }
  };

  return (
    <div ref={ref}>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{
          height: "100%",
        }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Autocomplete
          disablePortal
          autoComplete
          autoHighlight
          openOnFocus
          loading={isLoadingUsers}
          id="userInput"
          value={user}
          options={users}
          onInputChange={(e: any, newValue: any) => {
            debouncedChangeHandler(newValue);
          }}
          onChange={(e: any, newValue: any) => {
            if (newValue) {
              setSearchParams({ user: newValue || "" });
              if (!isLoadingRepos) {
                setIsLoadingRepos(true);
                getRepos(newValue).then((data: any) => {
                  setIsLoadingRepos(false);
                  setRepos(data.map((item: { name: any }) => item.name));
                });
              }
            } else {
              setSearchParams({});
              setUserError("");
            }
          }}
          isOptionEqualToValue={(option: string, value: string) => {
            return option.localeCompare(value) === 0;
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search User / Organization"
              autoFocus
              inputProps={{
                ...params.inputProps,
                endadornment: (
                  <>
                    {isLoadingRepos ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />

        {Boolean(user && repos.length > 0) && (
          <Autocomplete
            disablePortal
            autoComplete
            autoHighlight
            id="repoInput"
            value={repo}
            onOpen={() => setShowRepos(true)}
            onClose={() => setShowRepos(false)}
            onChange={(_, newValue: string | null) => {
              if (newValue) {
                setSearchParams({ user, repo: newValue || "" });
              } else {
                setSearchParams({ user });
              }
            }}
            isOptionEqualToValue={(option: string, value: string) => {
              return option.localeCompare(value) === 0;
            }}
            options={repos}
            sx={{ width: 300, marginTop: 4, marginBottom: 4 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Repo" />
            )}
          />
        )}
        {Boolean(user && repos.length > 0) && (
          <Button
            type="submit"
            variant="contained"
            disabled={Boolean(userError)}
          >
            submit
          </Button>
        )}
      </Stack>
    </div>
  );
}

export default IndexPage;
