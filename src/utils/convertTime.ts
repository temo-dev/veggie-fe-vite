export const convertTime = (time: string) => {
    if(time == null){
        return null;
    }
  const dateObj = new Date(time);

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = dateObj.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};
