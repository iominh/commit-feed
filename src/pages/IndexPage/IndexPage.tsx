import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";

type UserOption = {
  label: string;
  id: number;
}

function IndexPage() {
  const ref = useRef(null);
  const [userNames, setUserNames] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, data, isFetching } = useQuery(
    ["user", userQuery],
    () => {
      if (!userQuery) return null;
      return fetch(
        `https://api.github.com/search/users?` +
          new URLSearchParams({
            q: userQuery,
          })
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const newUsers = res.items.map((item: any, id: number) => {
            return {
              label: item.login,
              id,
            };
          });
          setUserNames(newUsers);
          return newUsers;
        });
    }
  );

  useEffect(() => {
    document.title = `Commit Feed`;
  }, [location]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current) {
      const element = ref.current as HTMLDivElement;
      const userInput = element.querySelector("#userInput") as HTMLInputElement;
      const repoInput = element.querySelector("#repoInput") as HTMLInputElement;
      // navigate(`${userInput.value}/${repoInput.value}`);
    }
  };

  const onKeyDownUser = (e: any) => {
    console.log(e.key);
    setUserQuery(e.target.value);
  };

  if (isLoading) return "Loading...";
  // if (error) return `An error has occurred: ${error || ""}`;

  return (
    <div ref={ref}>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          disablePortal
          id="userInput"
          value={userQuery}
          onKeyDown={onKeyDownUser}
          isOptionEqualToValue={(option: any, value: string) => {
            return option.label.includes(value);
          }}
          options={userNames}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Username" />}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default IndexPage;
