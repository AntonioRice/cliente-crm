import React from "react";
import TableCard from "../components/TableCard";
import AnimatedPage from "../components/AnimatedPage";
import AddClientButton from "../components/AddClientButton";
import { useGuest } from "../context/GuestProvider";

const Guests = () => {
  const { guests } = useGuest();

  return (
    <AnimatedPage>
      <div className="flex justify-between items-center pb-4">
        <h1 className="font-semibold text-2xl">Guests</h1>
        <AddClientButton />
      </div>
      <div className="h-full">
        <TableCard guests={guests} limit={15} />
      </div>
    </AnimatedPage>
  );
};

export default Guests;
