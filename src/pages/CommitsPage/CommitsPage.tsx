import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { getCommits } from "@/utils/api";
import PageContainer from "@/containers/PageContainer/PageContainer";
import styles from "./CommitsPage.module.css";
import { CommitsResponse, CommitsType } from "@/types/CommitsType";
import { TableHead } from "@mui/material";

export default function CommitsPage() {
  const location = useLocation();
  const { user = "", repo = "" } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Array<CommitsType>>([]);
  const [showButton, setShowButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const handleError = (error: Error) => {
    setError(error);
    throw error;
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
          setData([...(data || []), ...newData]);
        }
        if (newData.length < 30) {
          setShowButton(false);
        }
      })
      .catch((e) => {
        handleError(e);
      });
  }, [currentPage, location]);

  if (error) throw error;

  if (data.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleOnClickLoadMore = () => {
    setCurrentPage(currentPage + 1);
    setIsLoading(true);
  };

  return (
    <PageContainer>
      <Grid container spacing={2} sx={{ mt: 9, p: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h6" component="div" gutterBottom>
            {`Showing results for ${user}/${repo}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ margin: "auto" }}>
            <Table className={styles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontWeight: 'bold'}}>Date</TableCell>
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              onClick={handleOnClickLoadMore}
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
