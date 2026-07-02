function logger(req, res, next) {
  const start = process.hrtime();
  res.on('finish', () => {
    const diff = process.hrtime(start);
    const time = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);
    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} - ${time} ms`);
  });
  next();
}

module.exports = logger;
