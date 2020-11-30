
/* 
 * Connects to server for all API endpoints related to the Employee Directory
 */
import axios from 'axios';

const baseUrl = "http://localhost:8000"; // use config (ex: webpack) instead of declaring here

export const getEmployeeDirectory = async () => {
    const response = await axios.get(baseUrl + '/api/employees')
    console.log(response)
    return response.data
}

export const addNewEmployee = async (employee) => {
    const response = await axios.post(baseUrl + '/api/employees', employee)
    console.log(response)
    return response.data
}

export const updateEmployee = async (employee) => {
    console.log(employee)
    const response = await axios.post(baseUrl + '/api/employees/' + employee.id, employee)
    console.log(response)
    return response.data
}

export const deleteEmployee = async (employeeId) => {
    console.log(baseUrl + '/api/employees/' + employeeId)
    const response = await axios.delete(baseUrl + '/api/employees/' + employeeId)
    console.log(response)
    return response.data
}
