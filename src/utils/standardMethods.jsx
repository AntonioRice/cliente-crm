import moment from "moment";

export const formatDateTime = (isoDate) => {
  return isoDate !== null ? moment(isoDate).format("MM-DD-YYYY") : isoDate;
};
