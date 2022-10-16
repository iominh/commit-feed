import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function RepoPage() {
    let location = useLocation();

    useEffect(() => {
        console.log(location);
    }, [location])

    return <div>
        <Link to="/">Go Back</Link>
        Repo page
    </div>
}

export default RepoPage;