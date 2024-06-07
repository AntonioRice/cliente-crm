import moment from "moment";

export const formatDateTime = (isoDate) => {
  if (!isoDate || !moment(isoDate, moment.ISO_8601, true).isValid()) {
    return null;
  }
  return moment(isoDate).format("MM-DD-YYYY");
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
