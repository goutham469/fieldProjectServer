export const getCurrentTime = () => {
    const curDate = new Date();
    const seconds = String(curDate.getSeconds()).padStart(2, '0');
    const minutes = String(curDate.getMinutes()).padStart(2, '0');
    const hours = String(curDate.getHours()).padStart(2, '0');
    const day = String(curDate.getDate()).padStart(2, '0');
    const month = String(curDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = curDate.getFullYear();
  
    return `${seconds}/${minutes}/${hours}-${day}/${month}/${year}`;
  };