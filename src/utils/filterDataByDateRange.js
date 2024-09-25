
export const filterDataByDateRange = (data, startDateString, endDateString) => {
  console.log('Filtering data for range:', startDateString, endDateString);
  const start = new Date(startDateString);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDateString);
  end.setHours(23, 59, 59, 999);
  

  return Object.entries(data).reduce((acc, [queueId, queueData]) => {
    acc[queueId] = {
      ...queueData,
      daily_stats: Object.entries(queueData.daily_stats || {}).reduce((dailyAcc, [date, dayData]) => {
        const currentDate = new Date(date).getTime();
        if (currentDate >= start && currentDate <= end) {
          dailyAcc[date] = dayData;
        }
        return dailyAcc;
      }, {})
    };
    console.log('Filtered data:', acc);
    return acc;
  }, {});
};