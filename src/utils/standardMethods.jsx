import moment from "moment";

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
    return new Date(reservation.check_out) > new Date(latest.check_out) ? reservation : latest;
  }, guest.reservations[0]);
  return formatDateTime(lastReservation.check_out);
};

export const calculateTotalAmountSpent = (reservations) => {
  return reservations.reduce((total, reservation) => total + parseFloat(reservation.total_amount), 0).toFixed(2);
};
