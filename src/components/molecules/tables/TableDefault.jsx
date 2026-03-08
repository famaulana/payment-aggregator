import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const TableDefault = ({ columns, data = [] }) => {
  const isEmpty = !data || data.length === 0;

  // Shared scrollable styles to keep the code DRY
  const scrollableCellStyles = (col) => ({
    width: col.width || "auto",
    minWidth: col.minWidth || "auto",
    maxWidth: col.maxWidth || "auto",
    // Enable horizontal scroll
    overflowX: "auto",
    whiteSpace: "nowrap",
    // Hide scrollbar for Chrome, Safari and Opera
    "&::-webkit-scrollbar": {
      display: "none",
    },
    // Hide scrollbar for IE, Edge and Firefox
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  });

  return (
    <Box className="w-full">
      <TableContainer>
        {/* tableLayout: fixed is required for maxWidth/width to work strictly */}
        <Table
          sx={{
            // minWidth: 650, s
            tableLayout: "fixed",
          }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  sx={{
                    fontWeight: 700,
                    ...scrollableCellStyles(col),
                  }}
                  className="text-xxs font-extrabold uppercase border-b border-gray-100">
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isEmpty ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  className="py-20">
                  <Typography className="text-slate-400 font-medium">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50/30 transition-colors">
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      className="py-4 border-b border-gray-100"
                      sx={scrollableCellStyles(col)}>
                      {col.render ? (
                        col.render(row)
                      ) : (
                        <Typography className="text-sm text-slate-600">
                          {row[col.id] || "-"}
                        </Typography>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* FOOTER SECTION */}
    </Box>
  );
};
