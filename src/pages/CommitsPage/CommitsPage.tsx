import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function CommitsPage() {
  let location = useLocation();
  let { user, repo } = useParams();
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    console.log("repo page", location);
    document.title = `${location.pathname ?? ""} - Commit Feed`;
  }, [location]);

  // const { error, data } = useQuery(["commits"], () => {
  //   return fetch(`https://api.github.com/repos/${user}/${repo}/commits?page=1`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setCommits(res);
  //       return res;
  //     });
  // });

  return (
    <div>
      <h1>Repo page</h1>
      <Link to="/">Go Back</Link>
      <div>{JSON.stringify(commits, null, 2)}</div>
    </div>
  );
}

export default CommitsPage;
