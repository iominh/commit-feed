import { useRouteError } from "react-router-dom";
import PageContainer from "@/containers/PageContainer/PageContainer";
import { Box, Button } from "@mui/material";
export default function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <PageContainer centered>
      <Box
        id="error-page"
        p={4}
        sx={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: 'column',
          justifyContent: "center",
        }}
      >
        <h1>Uh oh, something went wrong 😩</h1>
        <div>{error.message || JSON.stringify(error)}</div>
        <Button
          sx={{ mt: 4 }}
          variant="contained"
          onClick={() => (window.location.href = "/")}
        >
          Click here to reload the app
        </Button>
      </Box>
    </PageContainer>
  );
}
