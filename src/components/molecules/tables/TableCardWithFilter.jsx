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
  Button,
} from "@mui/material";

export const TableCardWithFilter = ({ title, columns, data, renderFilter }) => {
  return (
    <Box className="bg-white rounded-2xl shadow-soft-xl border-0 overflow-hidden">
      {/* HEADER SECTION: Title + Filter */}
      <Box className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Typography variant="h6" className="font-bold text-slate-700">
          {title}
        </Typography>

        {/* This is where your custom filters go */}
        <Box className="w-full md:w-auto flex items-center gap-2">
          {renderFilter && renderFilter()}
        </Box>
      </Box>

      {/* TABLE SECTION */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  sx={{
                    fontWeight: 700,
                  }}
                  className="text-xxs font-extrabold uppercase border-b border-gray-100">
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-50/30 transition-colors">
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    className="py-4 border-b border-gray-100">
                    {col.render ? (
                      col.render(row)
                    ) : (
                      <Typography className="text-sm text-slate-600">
                        {row[col.id]}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* FOOTER SECTION: Pagination */}
      <Box className="p-4 flex items-center justify-between border-t border-gray-100">
        <Typography className="text-sm text-slate-500 font-medium">
          Showing 1 to 10 of 50 entries
        </Typography>
        <Box className="flex gap-2">
          <Button
            variant="outlined"
            size="small"
            className="rounded-lg border-gray-300 text-slate-700 capitalize shadow-soft-xs">
            Previous
          </Button>
          <Button
            variant="outlined"
            size="small"
            className="rounded-lg border-gray-300 text-slate-700 capitalize shadow-soft-xs">
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
