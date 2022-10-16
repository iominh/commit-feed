import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { getCommits } from "../../utils/api";
import PageContainer from "@/containers/PageContainer/PageContainer";

interface CommitsType {
  node_id: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

export default function CommitsPage() {
  const location = useLocation();
  const { user = "", repo = "" } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Array<CommitsType>>([]);
  const [showButton, setShowButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = `${location.pathname ?? ""} - Commit Feed`;
    getCommits(user, repo, currentPage)
      .then((newData: CommitsType[]) => {
        setIsLoading(false);
        if (!Array.isArray(newData)) {
          navigate("/does/not/exist");
        }
        if (newData.length > 0) {
          setData([...(data || []), ...newData]);
        }
        if (newData.length < 30) {
          setShowButton(false);
        }
      })
      .catch(() => {
        navigate("/does/not/exist");
      });
  }, [currentPage, location]);

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
          <Typography variant="h3" component="div" gutterBottom>
            Commit Feed
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {`Showing results for ${user}/${repo}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {data.map((item) => {
                  const date = new Date(item.commit.author.date);
                  const [month, day, year] = [
                    date.getMonth(),
                    date.getDate(),
                    date.getFullYear(),
                  ];
                  const novotime = date.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  });
                  const formatedMonth = new Intl.DateTimeFormat("en-US", {
                    month: "long",
                  }).format(month);
                  return (
                    <TableRow
                      key={item.node_id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{`${formatedMonth} ${day}, ${year} at ${novotime}`}</TableCell>
                      <TableCell>
                        <Link to={item.html_url} target="_blank">
                          {item.commit.message}
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
              height: "100%",
              width: '100%',    
              marginTop: '1rem'
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
