import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./pagination.css";

const TravelPagePagination = ({ pagesNumber, setCurrentPage }) => {
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={pagesNumber}
        onChange={handlePageChange}
        size="large"
      />
    </Stack>
  );
};

export default TravelPagePagination;
