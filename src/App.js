import './App.css';
import React, {useRef, useEffect, useState} from "react";
import Axios from 'axios';

function App() {

  const movieNameRef = useRef(null);
  const movieReviewRef = useRef(null);
  const [users, setUsers] = useState([]);
  
  function submitReview (){

    Axios.post("http://127.0.0.1:3001/userroutes/insert", {
      firstName: movieNameRef.current.value,
      age: movieReviewRef.current.value
    }).then(() => {
      getUsers();
      // Clear the input values
    movieNameRef.current.value = "";
    movieReviewRef.current.value = "";

    // Reload the page
    window.location.reload();
    }).catch(error => {
      // console.error("Error:", error);
      alert("Failed to submit the review");
    });
  };

  const getUsers = async () => {
    try {
      const response = await Axios.get("http://127.0.0.1:3001/userroutes/select");
      const users = response.data.response;
      users.reverse();
      setUsers(users);
      console.log('Users:', users);
      // Do something with the users (e.g., update UI)
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const deleteUserById = async (userId) => {
  try {
    // Assuming you have an appropriate endpoint for deleting a user by ID
    await Axios.delete(`http://127.0.0.1:3001/userroutes/delete/${userId}`);
    console.log(`User with ID ${userId} deleted successfully`);

    // You may want to refresh the list of users after a successful delete
    getUsers();
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    // Handle error (e.g., show an error message)
  }
};

  useEffect(() => {
    // Call getUsers when the component mounts
    getUsers();
  }, []); 

  return (
    <div className="App">
      <h1>Hello World! This is gonna be a Boat Game!</h1>

      <div className="d-flex justify-content-center">
        <div className='col-6 d-flex flex-column'>
          <label className="text-center">Movie Name</label>
          <input
            type='text'
            name='movieName'
            className="mt-1"
            ref={movieNameRef}
          />
          <label className="text-center mt-3">Movie Review</label>
          <input
            type='text'
            name='movieReview'
            className="mt-1"
            ref={movieReviewRef}
          />
          <button className="text-center mt-3" onClick={submitReview}>
            Submit
          </button>
        </div>
      </div>
      <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Age</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.age}</td>
              <td onClick={() => deleteUserById(user.id)}><i className="fa-solid fa-trash fa-fw"></i></td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default App;



  // useEffect(() =>{
  //   axios.get("http://127.0.0.1:3001/select")
  //   .then((response) => {
  //     console.log(response.data);
  //     console.log(" aqui")
  //   })
  // });


  // useEffect(() =>{
//     axios.get("http://127.0.0.1:3001/")
//     .then((response) => {
//       console.log(response.data);
//       console.log(" aqui")
//     })
//   });