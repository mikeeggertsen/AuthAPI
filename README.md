# Authentication API
This API was developed in conjunction with a mandatory assignment in NodeJS.

### Specifications
- Uses MongoDB to store user information.
- Uses JWT as a user token to access private routes.
- Hashing of passwords is done with Bcrypt.
- Send confirmation email after registration.
- Implements reset password functionallty.
- Both confirmation and reset mail is send with Nodemailer.

### Documentation
##### Auth routes
- /user
    - @GET
    - Description: Get user data
    - Access: Private
    - Request: JWT token in header as **auth-token**.
    - Response: **User object**

- /signin
    - @POST 
    - Access: Public
    - Request: **Email** and **password**.
    - Response: **User object**, **JWT token**, **Message**.


##### User routes
- /
    - @POST
    - Description: Register user
    - Access: Public
    - Request: **User object**.
    - Response: **Message**.

- /forgot
    - @POST
    - Description: Send email with instructions to reset password.
    - Access: Public.
    - Request: **Email**.
    - Repsonse: **Message**.

- /resend-confirmation
    - @POST
    - Description: Send extra confirmation email after registration.
    - Access: Public.
    - Request: **Email**.
    - Repsonse: **Message**.

- /
    - @PATCH
    - Description: Update user (Firstname and lastname).
    - Access: Private.
    - Request: **_id**, **firstname**, **lastname**.
    - Response: **Message**.

- /reset
    - @PATCH
    - Description: Updates user password.
    - Access: Public.
    - Request: **JWT token**, **password**.
    - Response: **Message**.

- /confirm
    - @PATCH
    - Description: Updates isConfirmed user field.
    - Access: Public
    - Request: **JWT token**.
    - Response: **Message**.

- /delete
    - @DELETE
    - Description: Delete user
    - Access: Private
    - Request: **_id**.
    - Response: **Message**.
