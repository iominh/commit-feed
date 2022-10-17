import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { getCommits } from "@/utils/api";
import PageContainer from "@/containers/PageContainer/PageContainer";
import styles from "./CommitsPage.module.css";
import { CommitsType } from "@/types/CommitsType";
import { TableHead } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";

export default function CommitsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user = "", repo = "" } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Array<CommitsType>>([]);
  const [showButton, setShowButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const handleError = (error: Error) => {
    setError(error);
    navigate("/error");
  };

  useEffect(() => {
    document.title = `${location.pathname ?? ""} - Commit Feed`;
    getCommits(user, repo, currentPage)
      .then((newData: any) => {
        if (newData.message) {
          handleError(newData);
        }
        setIsLoading(false);
        if (newData.length > 0) {
          setData([...newData, ...(data || [])]);
        }
        if (newData.length < 30) {
          setShowButton(false);
        }
      })
      .catch((e) => {
        handleError(e);
      });
  }, [currentPage, location]);

  const handleClickLoadMore = () => {
    setCurrentPage(currentPage + 1);
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PageContainer>
      <Grid container spacing={2} sx={{ mt: 8, p: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h6" component="div" gutterBottom>
            {`Commits for ${user}/${repo}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={styles.table} aria-label="Commit Table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Commit Message</TableCell>
                  <TableCell>Username</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => {
                  const date = new Date(item.commit.author.date);
                  let options: any = {
                    timeZoneName: "short",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
                  const dateString = new Intl.DateTimeFormat(
                    "en-US",
                    options
                  ).format(date);
                  return (
                    <TableRow key={item.node_id}>
                      <TableCell>{`${dateString}`}</TableCell>
                      <TableCell>
                        <Link href={item.html_url} target="_blank">
                          <pre
                            className={`text-ellipsis ${styles.commitMessage}`}
                          >
                            {item.commit.message}
                          </pre>
                        </Link>
                      </TableCell>
                      <TableCell>{item.commit.author.name}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {showButton && (
          <Box
            sx={{
              width: "100%",
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleClickLoadMore}
              disabled={isLoading}
            >
              Load More
            </Button>
          </Box>
        )}
      </Grid>
    </PageContainer>
  );
}
