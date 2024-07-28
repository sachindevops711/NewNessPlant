const HTTP_STATUSES = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  PAYLOAD_LARGE: 413,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

const FUNCTIONS = {
  NOT_FOUND_MESSAGE: (name) => `${name} not found`,
  ALREADY_EXIST: (name) => `${name} already exist`,
  NOT_EXIST: (name) => `${name} does not exist`,
  ALREADY_REGISTERED: (name) => `This ${name} already registered please login`,
  CREATED_SUCCESSFULLY: (name) => `${name} created successfully`,
  UPDATED_SUCCESSFULLY: (name) => `${name} updated successfully`,
  SENT_SUCCESSFULLY: (name) => `${name} sent successfully`,
  DELETED_SUCCESSFULLY: (name) => `${name} deleted successfully`,
  SENT_MESSAGE: (text) => `${text} sent successfully`,
  PROFILE_MESSAGE: (text) => `${text} profile fetched successfully`,
  FAILED_MESSAGE: (text) => `Failed to ${text}`,
  RESET_PASSWORD_MESSAGE_TYPE: (text) => `Password reset ${text} sent successfully`,
};

const OTHERS = {
  PER_PAGE_LIMIT: 10,
};

const PROVIDE_MESSAGES = {
  PROVIDE_EMAIL: "Please provide your email.",
  PROVIDE_PASSWORD: "Please provide your password.",
  PROVIDE_CURRENT_PASSWORD: "Please provide your current password.",
  PROVIDE_NEW_PASSWORD: "Please provide your new password.",
  PROVIDE_PIC: "Please provide the profile pic.",
  PROVIDE_IMAGE: "Please provide image.",
  PROVIDE_OBJECT_ID: "Please provide valid ObjectId.",
  PROVIDE_SHEET: "Please provide sheet.",
};

const API_MESSAGES = {
  REGISTER_MESSAGE: "You are Registered successfully",
  LOGIN_MESSAGE: "You are logged in successfully",
  FORGOT_PASSWORD_MESSAGE: "Verification link sent successfully",
  RESET_PASSWORD_LINK_MESSAGE: "Password reset link sent successfully",
  RESET_PASSWORD_MESSAGE: "Password Reset Successfully",
  ACCOUNT_VERIFIED_MESSAGE: "Account Verified Successfully",
  CHANGE_PASSWORD_MESSAGE: "Password Changed Successfully",
  VALID_TOKEN: "Token is Validated Successfully",
  VALIDATE_CONTENT: "Content validation successful",
  LOGOUT_MESSAGE: "Logged out successfully",
  REFRESH_TOKEN_SUCCESS: "Refresh token generated successfully",
};

const ERRORS = {
  UNKNOWN_ERROR: "Something went wrong, please try again later!",
  VERIFICATION_FAILED: "Payment verification failed",
  EMAIL_ERROR: "There was an error sending the email. Try again later!",
  FORBIDDEN_ERROR: "You do not have permission to perform this action.",
  NOT_ENOUGH_CREDITS:
    "You do not have enough credits to schedule this reminder, please recharge or reduce the number of receivers.",
  PLAN_EXPIRED:
    "You do not have plan or the plan has expired, please recharge.",
  UNAUTHORIZED_ERROR: "You are not logged in! please log in to get access.",
  TOKEN_NOT_EXIST_ERROR:
    "The user belonging to this token does no longer exist.",
  INVALID_TOKEN_ERROR: "Invalid token. Please log in again!",
  TOKEN_EXPIRED_ERROR: "Your token has expired. Please log in again!",
  EXPIRED_TOKEN_ERROR: "Token is invalid or has expired.",
  INTERNAL_SERVER_ERROR: "An unexpected error occurred. Please try again later.",
  PASSWORD_CHANGED_ERROR:
    "User recently changed password! Please log in again.",
  RATE_LIMIT_ERROR:
    "Too many requests from this IP, please try again in an hour!",
  MAINTENANCE_ERROR:
    "This site is currently unable to handle the HTTP request due to a maintenance of the server. Please try after some time.",
  NO_ROUTE: (url) => `Cant find path ${url} on this server.`,
  DO_NOT_MATCH: (text) => `${text} do not match.`,
  DOES_NOT_MATCH: (text) => `${text} does not match.`,
  FCM_FAILED: "Failed to send notification",
  TOKEN_FAILED: "Failed to generate token",
  VIDEO_SIZE_TOO_LARGE: "Video size is too large",
  VIDEO_DURATION_TOO_LARGE: "Video duration is too large",
  VIDEO_UPLOAD_FAILED: "Failed to upload video",
  THUMB_UPLOAD_FAILED: "Failed to upload video",
};

const LIMITS = {
  MAX_INDIVIDUAL_VIDEO_POST_SIZE: 99999999,
};
const MESSAGES = {
  SITE_HANDSHAKE:
    "Welcome to the Bhulona API, just shoot the end points you want to visit!!!",
  API_HANDSHAKE: "Hi, I am an API Home Page",
  INCORRECT_LOGIN: "Incorrect email or password",
  NOT_VERIFIED: "This user account is not verified",
  NOT_ACTIVATED: "This user account is not activated",
  PASSWORD_WRONG: "Your current password is wrong",
  INCORRECT_EMAIL: "Incorrect email",
  INCORRECT_MOBILE: "Incorrect mobile",
  USER_ALREADY_EXIST: "This user account is already exist",
  EMAIL_ALREADY_EXIST: "This email already exist",
  MOBILE_NUMBER_ALREADY_EXIST: "This mobile number already exist",
  ID_NOT_FOUND: "No data found with this id",
  ITEM_EXIST: "This item already exist",
  INVALID_FILE: "Please upload valid file",
  OTP_MISMATCH: "Otp does not match",
  INCORRECT_CREDENTIALS: "Incorrect credentials",
  CURRENT_NEW_PASSWORD_DIFFERENT:
    "Current password and new password should not be the same",
  PASSWORD_DO_NOT_MATCH: "Password and confirm password does not match",
  PAYMENT_VERIFIED: "Package purchased successfully",
  REFUND_SUCCESS: "Refund processed successfully",
  RESET_PASSWORD_LINK_EXPIRED: "Reset password link expired",
};

const LOGINTYPE = {
  ADMIN: "admin",
  USER: "user",
  VENDOR: "vendor",
};

module.exports = {
  ...HTTP_STATUSES,
  ...FUNCTIONS,
  ...PROVIDE_MESSAGES,
  ...MESSAGES,
  ...OTHERS,
  ...API_MESSAGES,
  ...ERRORS,
  ...LIMITS,
  ...LOGINTYPE,
};
