// class ApiResponse {
//     constructor(statusCode, data, message = "Success"){
//         this.statusCode = statusCode
//         this.data = data
//         this.message = message
//         this.success = statusCode < 400
//     }
// }

// export default { ApiResponse }

// utils/ApiResponse.js
class ApiResponse {
    static success(res, statusCode, message, data) {
      return res.status(statusCode).json({
        success: true,
        message,
        data,
      });
    }
  
    static error(res, statusCode, message, error) {
      return res.status(statusCode).json({
        success: false,
        message,
        error,
      });
    }
  }
  
  export { ApiResponse };
  