import React from "react";
import TableCard from "../components/TableCard";

const Guests = () => {
  return (
    <>
      <div className="flex justify-between items-center pb-4">
        <h1 className="font-semibold text-2xl">Guests</h1>
      </div>
      <div className="h-full">
        <TableCard limit={15} />
      </div>
    </>
  );
};

export default Guests;
