import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function RepoPage() {
  let location = useLocation();
  let { id, repo } = useParams();

  useEffect(() => {
    console.log("repo page", location);
    document.title = `${location.pathname ?? ''} - Commit Feed`;
  }, [location]);

  return (
    <div>
      <h1>Repo page</h1>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default RepoPage;
