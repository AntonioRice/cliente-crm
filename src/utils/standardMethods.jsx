import moment from "moment";

export const formatDateTime = (isoDate) => {
  if (!isoDate || !moment(isoDate, moment.ISO_8601, true).isValid()) {
    return null;
  }
  return moment(isoDate).format("MM-DD-YYYY");
};
