class Response {
  static success(res, status,msg, data) {
    res.status(status).json({
      msg,
      data,
    });
  }

  static error(res, status, error) {
    res.status(status).json({
      error,
    });
  }
}
module.exports = Response;