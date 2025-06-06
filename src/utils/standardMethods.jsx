import moment from "moment";
import imageCompression from "browser-image-compression";

export const formatDateTime = (isoDate, datePicker = false) => {
  const format = (date, datePicker) => {
    if (!date || !moment(date, moment.ISO_8601, true).isValid()) {
      return null;
    }
    if (datePicker) {
      return moment(date).format("YYYY-MM-DD");
    }
    return moment(date).format("MM-DD-YYYY");
  };

  return format(isoDate, datePicker);
};

export const getLastVisit = (guest) => {
  if (!guest.reservations || guest.reservations.length === 0) {
    return null;
  }

  const lastReservation = guest.reservations.reduce((latest, reservation) => {
    return new Date(reservation.check_out) > new Date(latest.check_out)
      ? reservation
      : latest;
  }, guest.reservations[0]);
  return formatDateTime(lastReservation.check_out);
};

export const calculateTotalAmountSpent = (reservations) => {
  return reservations
    .reduce(
      (total, reservation) => total + parseFloat(reservation.total_amount),
      0,
    )
    .toFixed(2);
};

export const formatPhoneNumber = (input) => {
  input = input.replace(/\D/g, "");

  if (input.length > 10) {
    input = input.slice(0, 10);
  }

  let formatted = "";
  if (input.length > 0) {
    formatted = `${input.slice(0, 3)}`;
  }
  if (input.length > 3) {
    formatted += `-${input.slice(3, 6)}`;
  }
  if (input.length > 6) {
    formatted += `-${input.slice(6, 10)}`;
  }

  return formatted;
};

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 400,
    useWebWorker: true,
    initialQuality: 0.7,
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Error compressing image:", error);
    return file;
  }
};
