import { Link, useRouteError } from "react-router-dom";
import PageContainer from "@/containers/PageContainer/PageContainer";
import { Button } from "@mui/material";
export default function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <PageContainer>
      <div id="error-page">
        <h1>Uh oh, something went wrong 😩</h1>
        <pre>{error.message || JSON.stringify(error)}</pre>
        <Button variant="contained" onClick={() => (window.location.href = "/")}>
          Click here to reload the app
        </Button>
      </div>
    </PageContainer>
  );
}
