import Axios from 'axios';


const getUsers = async () => {
    try {
        const response = await Axios.get("https://localhost:7046/api/Student");
        return response;
        // console.log(response.data);
        // const users = response.data;
        // console.log(users);
        // users.reverse();
        // setUsers(users);
        // console.log('Users:', users);
        // Do something with the users (e.g., update UI)
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error (e.g., show an error message)
      }
}

const addStudent = async (student) => {
    try {
        await Axios.post("https://localhost:7046/api/Student", student)
    } catch (error) {
        console.log(error);
    }
}

const studentService = {
    getUsers,
    addStudent,
};

export default studentService;

