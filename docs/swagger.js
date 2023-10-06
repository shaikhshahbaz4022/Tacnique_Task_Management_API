/* ----------------------------->>>>>>> Schemas <<<<<<<-----------------------------*/

/* --------------------->>> Authorization Schema<<<---------------------*/
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Bearer token authorization header
 */

/* --------------------->>> Users Schema <<<---------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         _id:
 *           type: objectId
 *           description: ID of the user.
 *         username:
 *           type: string
 *           description: Name of the user.
 *         email:
 *           type: string
 *           description: Email of the user.
 *         password:
 *           type: string
 *           description: Password of the user.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user account was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user account was last updated.
 *       required:
 *         - email
 *         - password
 *       example:
 *         username: Tacnique
 *         email: Tacnique01@gmail.com
 *         password: Tacnique
 *         createdAt: "2023-10-05T12:00:00Z"
 *         updatedAt: "2023-10-05T14:30:00Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: objectId
 *           description: ID of the Task.
 *         title:
 *           type: string
 *           description: Title of the Task.
 *         description:
 *           type: string
 *           description: Description of the Task.
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - completed
 *           description: Status of the Task, can be 'pending' or 'completed'.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the Task was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the Task was last updated.
 *       example:
 *         _id: 650d24704e5f0989e6f0d762
 *         title: Task Name
 *         description: Task Description
 *         status: pending
 *         createdAt: "2023-10-05T12:00:00Z"
 *         updatedAt: "2023-10-05T14:30:00Z"
 */

// ------------------------>>> User Routes <<<------------------------
// Signup
/**
 * @swagger
 * paths:
 *   /user/register:
 *     post:
 *       summary: Register a new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       responses:
 *         201:
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 example:
 *                   success: true
 *                   message: Registration Succesfully
 *                   data:
 *                       username: Tacnique
 *                       email: Tacnique01@gmail.com
 *                       password: $2b$1Fwo6wgApNDpTVQju1RpVux6b5Ql1U/jUI0cc6B1Z7UGZ9VFpmTU
 *                       _id: 64f4c625a9b674bd4bb6bc8e
 *                       createdAt: 2023-09-03T17:45:09.734Z
 *                       updatedAt: 2023-09-03T17:45:09.734Z
 *                       __v: 0
 *         500:
 *           description: Internal Server Error or contact the administrator or Signup Failed
 *         400:
 *           description: User already exists
 */

// Login
/**
 * @swagger
 * paths:
 *   /user/login:
 *     post:
 *       summary: Log in an existing user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Email of the user
 *                 password:
 *                   type: string
 *                   description: Password of the user
 *               required:
 *                 - email
 *                 - password
 *               example:
 *                 email: Tacnique01@gmail.com
 *                 password: Tacnique01
 *       responses:
 *         200:
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 example:
 *                   success: true
 *                   message: Login successful
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTBjNmU4YWZiZTc0MTJmYWVjM2U5YzkiLCJlbWFpbCI6InNoYWhiYXpAZ21haWwuY29tIiwiaWF0IjoxNjk1MzkyMDE1LCJleHAiOjE2OTUzOTkyMTV9.F5Bj6aP4Cxas1LQj0uzQVq58blFa2lZNfeTcBq4FUqI
 *         500:
 *           description: Internal Server Error or Contact to administrator or Login Failed
 *         401:
 *           description: Authentication failed
 *         404:
 *           description: User Not Found
 */

// ------------------------>>> Tasks Routes <<<------------------------
/**
 * @swagger
 * paths:
 *   /tasks:
 *     post:
 *       summary: Add a New Task
 *       tags: [Tasks]
 *       security:
 *         - JWT: []
 *       requestBody:
 *         description: Task details to be added
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       responses:
 *         201:
 *           description: Task created successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 data: {
 *                   _id: "64f1f47978821805b01ec33d",
 *                   title: "New Task",
 *                   description: "Task Description",
 *                   status: "pending",
 *                   createdAt: "2023-10-05T12:00:00Z",
 *                   updatedAt: "2023-10-05T12:00:00Z",
 *                 }
 *         400:
 *           description: Bad Request, missing required fields
 *           content:
 *             application/json:
 *               example:
 *                 msg: "Fields are Required"
 *                 success: false
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: "Internal Server Error"
 *                 msg: "An error occurred while creating the task"
 */
/**
 * @swagger
 * paths:
 *   /tasks:
 *     get:
 *       summary: Get User's Tasks
 *       tags: [Tasks]
 *       security:
 *         - JWT: []
 *       responses:
 *         200:
 *           description: Tasks retrieved successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 data:
 *                   - $ref: '#/components/schemas/Task'  # Reference to the Task schema
 *         404:
 *           description: No Tasks Found
 *           content:
 *             application/json:
 *               example:
 *                 msg: "No Tasks Found"
 *                 success: false
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: "Internal Server Error"
 *                 msg: "An error occurred while retrieving tasks"
 */

/**
 * @swagger
 * paths:
 *   /tasks/all:
 *     get:
 *       summary: Get All Tasks
 *       tags: [Tasks]
 *       security:
 *         - JWT: []
 *       responses:
 *         200:
 *           description: Tasks retrieved successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 data:
 *                   - $ref: '#/components/schemas/Task'  # Reference to the Task schema
 *         404:
 *           description: No Tasks Found
 *           content:
 *             application/json:
 *               example:
 *                 msg: "No Tasks Found"
 *                 success: false
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: "Internal Server Error"
 *                 msg: "An error occurred while retrieving tasks"
 */

/**
 * @swagger
 * paths:
 *   /tasks/{id}:
 *     get:
 *       summary: Get Task by ID
 *       tags: [Tasks]
 *       security:
 *         - JWT: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the task to retrieve.
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Task retrieved successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'  # Reference to the Task schema
 *         404:
 *           description: Task Not Found
 *           content:
 *             application/json:
 *               example:
 *                 msg: "Task Not Found"
 *                 success: false
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: "Internal Server Error"
 *                 msg: "An error occurred while retrieving the task"
 */

/**
 * @swagger
 * paths:
 *   /tasks/{id}:
 *     put:
 *       summary: Update Task by ID
 *       tags: [Tasks]
 *       security:
 *         - JWT: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the task to update.
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         description: Updated task data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'  # Reference to the Task schema
 *       responses:
 *         200:
 *           description: Task updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 data:
 *                   $ref: '#/components/schemas/Task'  # Reference to the Task schema
 *         404:
 *           description: Task Not Found
 *           content:
 *             application/json:
 *               example:
 *                 msg: "Task Not Found"
 *                 success: false
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: "Internal Server Error"
 *                 msg: "An error occurred while updating the task"
 */
/**
 * @swagger
 * paths:
 *   /tasks/{id}:
 *     delete:
 *       summary: Delete Task by ID
 *       tags: [Tasks]
 *       security:
 *         - JWT: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the task to delete.
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Task deleted successfully
 *           content:
 *             application/json:
 *               example:
 *                 success: true
 *                 msg: "Task Deleted Successfully"
 *         404:
 *           description: Task Not Found
 *           content:
 *             application/json:
 *               example:
 *                 msg: "Task Not Found"
 *                 success: false
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 error: "Internal Server Error"
 *                 msg: "An error occurred while deleting the task"
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get API Logs
 *     tags:
 *       - Logs
 *     responses:
 *       200:
 *         description: Logs retrieved successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: Your log data goes here...
 *       404:
 *         description: Logs not found
 *         content:
 *           application/json:
 *             example:
 *               msg: Logs not found
 *               success: false
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Internal Server Error
 *               msg: An error occurred while retrieving logs
 */
