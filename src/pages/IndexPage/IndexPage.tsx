import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useDebounce from "@/hooks/useDebounce";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { getUsers, getRepos } from "@/utils/api";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import PageContainer from "@/containers/PageContainer/PageContainer";
import { Typography } from "@mui/material";

function IndexPage() {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const user = searchParams.get("user") || "";
  const repo = searchParams.get("repo") || "";

  const [showUsers, setShowUsers] = useState(false);
  const [showRepos, setShowRepos] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);

  const [users, setUsers] = useState<string[]>([]);
  const [repos, setRepos] = useState<string[]>([]);

  useEffect(() => {
    document.title = `Commit Feed`;
    if (user && error && users.length > 0) {
      setError(null);
    }

    if (repos.length > 0 && error) {
      setRepos([]);
    }
  }, [location, user, error, users, repos]);

  useEffect(() => {
    if (
      !error &&
      user &&
      users.length > 0 &&
      !showUsers &&
      repos.length === 0
    ) {
      setShowUsers(true);
    }
  }, [users, showUsers, user, error, repos]);

  const handleError = (error: Error) => {
    setError(error);
    throw error;
  };

  const loadRepos = (user: string) => {
    getRepos(user).then((data) => {
      if (data.message) {
        handleError(data);
      }
      setIsLoadingRepos(false);
      const newRepos = data.map((item: { name: any }) => item.name);
      setRepos(newRepos);
    });
  };

  const handleChangeUser = useCallback(
    (value: string) => {
      if (!value.trim()) {
        setUsers([]);
        return null;
      }

      setIsLoadingUsers(true);

      getUsers(value)
        .then((data) => {
          if (data.message) {
            handleError(new Error(data.message));
          }
          setIsLoadingUsers(false);
          const newUsers = data.items.map((item: { login: any }) => item.login);
          setUsers(newUsers);

          if (data.items.length === 0) {
            handleError(new Error("User not found"));
            if (user && repo) {
              setSearchParams({ user });
            }
          } else if (user && !isLoadingRepos) {
            setSearchParams({ user: value, ...(repo ? { repo } : {}) });
            setIsLoadingRepos(true);
            loadRepos(newUsers[0]);
          }
        })
        .catch((e: Error) => {
          throw e;
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

  if (error) throw error;

  return (
    <PageContainer centered>
      <Stack
        ref={ref}
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
        <Typography variant="h4" component="div" gutterBottom>
          Github Commit Search
        </Typography>
        <Autocomplete
          disablePortal
          autoComplete
          autoHighlight
          openOnFocus
          noOptionsText={isLoadingUsers ? "Loading..." : "No options found"}
          open={!isLoadingUsers && showUsers && !showRepos && users.length > 0}
          onOpen={() => setShowUsers(true)}
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
                loadRepos(newValue);
              }
            } else {
              setSearchParams({});
              setError(null);
            }
          }}
          renderOption={(props, option: string, { inputValue }) => {
            const matches = match(option, inputValue);
            const parts = parse(option, matches);
            return (
              <li {...props}>
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
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
            autoComplete
            autoHighlight
            openOnFocus
            noOptionsText={isLoadingRepos ? "Loading..." : "No options found"}
            open={!isLoadingRepos && showRepos && repos.length > 0}
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
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Repo"
                inputProps={{
                  ...params.inputProps,
                  endAdornment: (
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
        )}
        {Boolean(user && repos.length > 0) && (
          <Button type="submit" variant="contained" disabled={Boolean(error)}>
            Submit
          </Button>
        )}
      </Stack>
    </PageContainer>
  );
}

export default IndexPage;
