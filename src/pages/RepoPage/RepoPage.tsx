import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function RepoPage() {
  let location = useLocation();

  useEffect(() => {
    console.log("repo page", location);
    document.title = `${location.pathname ?? ''} - Commit Feed`;
  }, [location]);

  return (
    <div>
      <h1> Repo page</h1>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default RepoPage;
