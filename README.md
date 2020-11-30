# Employee Directory Application
The Employee Directory application is a webapp that shows current employees. It allows users to view the list of employees, add, edit and delete existing employees.


## Technology Information
- Node version: 14.15.1
- NPM version: 6.14.9
- Front end: React
   - Built using `create-react-app`
   - Uses `react-bootstrap` for formatting
- Server: Express
   - Express is used as the Node.js framework to make it easier to serve APIs
- Database: SQLite3
   - DB used to easily spin up an in-memory database for testing

## Running the Application Locally
 1. Run the server
    - Navigate to the `server` directory
    - Run `npm install`
    - Run `npm start`
    - Server should start on port `8000`    
 2. Run the UI
    - Navigate to the `server` directory
    - Run `npm install`
    - Run `npm start`
    - UI should start on port `3000`

## Todo List For Production
- Add authorization for delete/edit/add employees, so only authorized users can do each of those functions
- Add icons, logos, and build out the menu structure with any other information needed
- Add production and deployment configuration, including a load balancer for the server/UI if needed depending on traffic 
- Connect to a database that isn't in-memory
- Add form validation - make sure junk data isn't submitted to the database
- Add testing, especially on the server for the APIs


## API Endpoints Available from Server
| Endpoint | Description |
| :---  | :---  |
| GET /api/employees | Get a list of all employees in the database | 
| POST /api/employees/:id | Update a specific employee based on the employee id |
| POST /api/employees | Insert a new employee |
| DELETE /api/employees/:id | Delete a specific employee based on the employee id |

Both of the POST requests accept the following JSON in the Request Body:

```json
 {
    "name": "Employee Name",
    "title": "Employee Name",
    "department": "Employee Department",
    "location": "Employee Location",
    "imageUrl": "image/url"
  }
```
