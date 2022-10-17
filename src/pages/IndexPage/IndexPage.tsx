import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import useDebounce from '@/hooks/useDebounce';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getUsers, getRepos } from '@/utils/api';
import PageContainer from '@/containers/PageContainer/PageContainer';
import { Typography } from '@mui/material';
import { renderInput, renderOption } from '@/utils/select-helpers';

function IndexPage() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const user = searchParams.get('user') || '';
  const repo = searchParams.get('repo') || '';

  const [showUsers, setShowUsers] = useState(false);
  const [showRepos, setShowRepos] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);

  const [users, setUsers] = useState<string[]>([]);
  const [repos, setRepos] = useState<string[]>([]);

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
  }, [error, user, users, showUsers, repos]);

  useEffect(() => {
    document.title = `Commit Feed`;
    if (user && error && users.length > 0) {
      setError(null);
    }

    if (repos.length > 0 && error) {
      setRepos([]);
    }
  }, [user, error, users, repos]);

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
    (newUser: string) => {
      if (!newUser.trim()) {
        setUsers([]);
        return null;
      }

      setIsLoadingUsers(true);

      getUsers(newUser)
        .then((data) => {
          if (data.message) {
            handleError(new Error(data.message));
          }
          setIsLoadingUsers(false);
          const newUsers = data.items.map((item: { login: any }) => item.login);
          setUsers(newUsers);

          if (data.items.length === 0) {
            if (user && repo) {
              setSearchParams({ user });
            }
          } else if (user && !isLoadingRepos) {
            setSearchParams({ user: newUser, ...(repo ? { repo } : {}) });
            setIsLoadingRepos(true);
            loadRepos(newUsers[0]);
          }
        })
        .catch((e: Error) => {
          throw e;
        });
    },
    [isLoadingRepos, setSearchParams, repo, user]
  );
  const debouncedChangeHandler = useDebounce(handleChangeUser, 300);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (user && repo) {
      navigate(`/${user}/${repo}`);
    }
  };

  // throw error to ErrorPage
  if (error) throw error;

  return (
    <PageContainer centered>
      <Stack
        component='form'
        onSubmit={handleSubmit}
        spacing={4}
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant='h4' component='div'>
          Github Commit Search
        </Typography>
        <Autocomplete
          disablePortal
          autoComplete
          autoHighlight
          openOnFocus
          noOptionsText={isLoadingUsers ? 'Loading...' : 'No options found'}
          open={!isLoadingUsers && showUsers && !showRepos && users.length > 0}
          onOpen={() => setShowUsers(true)}
          onClose={() => setShowUsers(false)}
          loading={isLoadingUsers}
          id='userInput'
          value={user}
          options={users}
          onInputChange={(e: any, newInputValue: any) => {
            debouncedChangeHandler(newInputValue);
          }}
          onChange={(e: any, newUser: any) => {
            if (newUser) {
              setSearchParams({ user: newUser || '' });
              if (!isLoadingRepos) {
                setIsLoadingRepos(true);
                loadRepos(newUser);
              }
            } else {
              setSearchParams({});
              setError(null);
            }
          }}
          renderOption={renderOption}
          isOptionEqualToValue={(option: string, value: string) => {
            return option.localeCompare(value) === 0;
          }}
          sx={{ width: 300 }}
          renderInput={renderInput(isLoadingRepos, 'Search User or Organization')}
        />

        {Boolean(user && repos.length > 0) && (
          <Autocomplete
            autoComplete
            autoHighlight
            openOnFocus
            noOptionsText={isLoadingRepos ? 'Loading...' : 'No options found'}
            open={!isLoadingRepos && showRepos && repos.length > 0}
            id='repoInput'
            value={repo}
            onOpen={() => setShowRepos(true)}
            onClose={() => setShowRepos(false)}
            onChange={(_, newRepo: string | null) => {
              if (newRepo) {
                setSearchParams({ user, repo: newRepo || '' });
              } else {
                setSearchParams({ user });
              }
            }}
            renderOption={renderOption}
            isOptionEqualToValue={(option: string, value: string) => {
              return option.localeCompare(value) === 0;
            }}
            options={repos}
            sx={{ width: 300 }}
            renderInput={renderInput(isLoadingRepos, 'Select Repo')}
          />
        )}
        {Boolean(user && repos.length > 0) && (
          <Button
            type='submit'
            variant='contained'
            disabled={Boolean(error) || !user || !repo}
          >
            View Commit Feed
          </Button>
        )}
      </Stack>
    </PageContainer>
  );
}

export default IndexPage;
