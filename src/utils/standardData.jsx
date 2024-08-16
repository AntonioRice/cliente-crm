import { useTranslation } from "react-i18next";
import { ArgentinaFlag, BoliviaFlag, BrazilFlag, ChileFlag, ColombiaFlag, EcuadorFlag, USAFlag, CanadaFlag, ParaguayFlag, PeruFlag, UruguayFlag, VenezuelaFlag } from "./flags";

export const months = () => {
  const { t } = useTranslation();

  return [t("months.january"), t("months.february"), t("months.march"), t("months.april"), t("months.may"), t("months.june"), t("months.july"), t("months.august"), t("months.september"), t("months.october"), t("months.november"), t("months.december")];
};

export const daysOfWeek = () => {
  const { t } = useTranslation();
  return [t("daysOfWeek.sun"), t("daysOfWeek.mon"), t("daysOfWeek.tue"), t("daysOfWeek.wed"), t("daysOfWeek.thu"), t("daysOfWeek.fri"), t("daysOfWeek.sat")];
};

export const countries = [
  { name: "Argentina", code: "+54", flag: <ArgentinaFlag /> },
  { name: "Bolivia", code: "+591", flag: <BoliviaFlag /> },
  { name: "Brazil", code: "+55", flag: <BrazilFlag /> },
  { name: "Chile", code: "+56", flag: <ChileFlag /> },
  { name: "Colombia", code: "+57", flag: <ColombiaFlag /> },
  { name: "Ecuador", code: "+593", flag: <EcuadorFlag /> },
  { name: "USA", code: "+1", flag: <USAFlag /> },
  { name: "Canada", code: "+1 ", flag: <CanadaFlag /> },
  { name: "Paraguay", code: "+595", flag: <ParaguayFlag /> },
  { name: "Peru", code: "+51", flag: <PeruFlag /> },
  { name: "Uruguay", code: "+598", flag: <UruguayFlag /> },
  { name: "Venezuela", code: "+58", flag: <VenezuelaFlag /> },
];

export const rooms = [
  { name: "Matrimonial", number: 1, occupied: true },
  { name: "Single", number: 2, occupied: false },
  { name: "Single", number: 3, occupied: false },
  { name: "Single", number: 4, occupied: false },
  { name: "Triple", number: 5, occupied: true },
  { name: "Triple", number: 6, occupied: false },
  { name: "Quad", number: 7, occupied: false },
  { name: "Double", number: 8, occupied: false },
  { name: "Double", number: 9, occupied: false },
  { name: "Double", number: 10, occupied: false },
  { name: "Double", number: 11, occupied: false },
  { name: "Double", number: 12, occupied: false },
];
