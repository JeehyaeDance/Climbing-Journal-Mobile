function urlResolver() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  } else if (process.env.NODE_ENV === "production") {
    return "someurl.com";
  }
}

function sortLogs(logs) {
  let countObj = {};
  let result = {
    label: [],
    data: []
  };
  logs.forEach(log => {
    if (!countObj[log.posting_date]) {
      countObj[log.posting_date] = { count: 1, total: log.level };
    } else {
      countObj[log.posting_date].count++;
      countObj[log.posting_date].total += log.level;
    }
  });
  for (let date in countObj) {
    result.label.push(`${date.substring(5, 10)}`);
    result.data.push(Math.floor(countObj[date].total / countObj[date].count));
  }
  return result;
}

export { sortLogs, urlResolver };
