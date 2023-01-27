function serviceResponse({ status, data, message, errors }) {
    this.status = status || 200;
    this.data = data ? data : {};
    this.message = message || "";
    this.errors = errors ? errors : [];
    this.version = '1.0'
};

module.exports = serviceResponse;
