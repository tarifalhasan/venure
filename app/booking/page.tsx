import React from "react";
import { BookingModalPopup } from "../venue/[venueId]/_components/BookingPopup/BookingModal";

const page = () => {
  return (
    <>
      <BookingModalPopup venueId={1}  />
    </>
  );
};

export default page;
