export const calculateDaysNumber = (startDate, endDate) => {
  const days =
    Number(endDate.split("-")[startDate.split("-").length - 1].slice(0, 2)) -
    Number(startDate.split("-")[startDate.split("-").length - 1].slice(0, 2));
  const years = Number(endDate.split("-")[0]) - Number(startDate.split("-")[0]);
  const months =
    Number(endDate.split("-")[1]) - Number(startDate.split("-")[1]);
  const finalResult = years * 365 + months * 30 + days;
  return finalResult;
};
