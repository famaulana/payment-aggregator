import React from "react";
import { TableDefault } from "@/components/molecules/tables/TableDefault";

const DetailMDRModal = ({ data }) => {
  const columns = [
    {
      id: "date",
      label: "Date Update",
    },
    {
      id: "previous",
      label: "Nilai Sebelumnya",
    },
    {
      id: "current",
      label: "Nilai Baru",
    },
    {
      id: "modified_by",
      label: "Diubah Oleh",
    },
  ];

  const dummy = [
    {
      date: "10 January 2026, 18:00",
      previous: "1%",
      current: "1.5%",
      modified_by: "Super Admin",
    },
    {
      date: "9 January 2026, 18:00",
      previous: "0.5%",
      current: "1%",
      modified_by: "Super Admin",
    },
    {
      date: "8 January 2026, 18:00",
      previous: "1%",
      current: "0.5%",
      modified_by: "Super Admin",
    },
    {
      date: "7 January 2026, 18:00",
      previous: "0.7%",
      current: "1%",
      modified_by: "Super Admin",
    },
  ];
  return (
    <div className="flex w-full">
      <TableDefault data={dummy} columns={columns} />
    </div>
  );
};

export default DetailMDRModal;
