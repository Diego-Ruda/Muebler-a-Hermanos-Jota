const logger = (req, res, next) => {
  const dateTime = new Date().toLocaleString('es-AR');
  console.log(`[${req.method}] ${req.originalUrl} - ${dateTime}`);
  next();
};

export default logger;
