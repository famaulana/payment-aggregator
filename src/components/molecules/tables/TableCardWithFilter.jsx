import React from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { GradientPagination } from "../pagination/GradientPagination";

export const TableCardWithFilter = ({
  title,
  columns,
  data = [],
  pagination = null,
  renderFilter,
}) => {
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
    <Box className="bg-white p-6 rounded-2xl shadow-soft-xl border-0 overflow-hidden">
      {/* HEADER SECTION */}
      <Box className=" flex flex-col mb-4 md:flex-row justify-between items-start md:items-center gap-4">
        <Typography variant="h6" className="font-bold text-slate-700">
          {title}
        </Typography>
        <Box className="w-full md:w-auto flex items-center gap-2">
          {renderFilter && renderFilter()}
        </Box>
      </Box>

      {/* TABLE SECTION */}
      <TableContainer>
        {/* tableLayout: fixed is required for maxWidth/width to work strictly */}
        <Table sx={{ minWidth: 650, tableLayout: "fixed" }}>
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
      {!isEmpty && pagination != null && (
        <Box className="p-4 flex items-center justify-between border-t border-gray-100">
          <Typography className="text-sm text-slate-500 font-medium">
            Showing {pagination?.from} to {pagination?.to} of{" "}
            {pagination?.total} entries
          </Typography>
          <GradientPagination
            totalPages={
              pagination?.total && pagination?.per_page
                ? Math.ceil(pagination?.total / pagination?.per_page)
                : 0
            }
          />
        </Box>
      )}
    </Box>
  );
};
