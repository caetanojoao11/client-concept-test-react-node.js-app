import '../App.css'
import React, { useRef, useEffect, useState } from 'react';
import studentService from '../Services/StudentService'



function BoatGame() {
  const movieNameRef = useRef(null);
  const movieReviewRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [editableUser, setEditableUser] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedGrade, setEditedGrade] = useState('');

  useEffect(() => {
    // Call getUsers when the component mounts
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await studentService.getStudents();
      const users = response.data;
      // users.sort((a, b) => a.id - b.id);
      setUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const submitReview = () => {
    const student = {
      name: movieNameRef.current.value,
      grade: movieReviewRef.current.value,
    };

    studentService.addStudent(student)
      .then(() => {
        getUsers();
        movieNameRef.current.value = '';
        movieReviewRef.current.value = '';
      })
      .catch((error) => {
        console.error('Failed to submit the review:', error);
        alert('Failed to submit the review');
      });
  };

  const deleteUserById = async (userId) => {
    try {
      await studentService.deleteStudent(userId);
      console.log(`User with ID ${userId} deleted successfully`);
      getUsers(); // Refresh the user list
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      alert('Failed to delete user');
    }
  };

  const updateStudent = async (userId) => {
    try {
      const student = {
        id: userId,
        name: editedName,
        grade: editedGrade,
      };

      await studentService.updateStudent(student);
      setEditableUser(null);
      getUsers(); // Refresh the user list
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      alert('Failed to update user');
    }
  };

  const toggleEditMode = (userId, currentName, currentGrade) => {
    setEditableUser((prevEditableUser) =>
      prevEditableUser === userId ? null : userId
    );
    setEditedName(currentName);  // Set the editedName state to the currentName
    setEditedGrade(currentGrade);  // Set the editedGrade state to the currentGrade
  };

  return (
    <div className="App">
      <h1>Hello World! This is gonna be a Boat Game!</h1>

      <div className="d-flex justify-content-center">
        <div className="col-6 d-flex flex-column">
          <label className="text-center">Movie Name</label>
          <input
            type="text"
            name="movieName"
            className="mt-1"
            ref={movieNameRef}
          />
          <label className="text-center mt-3">Movie Review</label>
          <input
            type="text"
            name="movieReview"
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
              <th>Name</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
        {users.sort((a, b) => a.id - b.id).map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>
              {editableUser === user.id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {editableUser === user.id ? (
                <input
                  type="text"
                  value={editedGrade}
                  onChange={(e) => setEditedGrade(e.target.value)}
                />
              ) : (
                user.grade
              )}
            </td>
            <td>
              <i
                className="fa-solid fa-trash fa-fw"
                onClick={() => deleteUserById(user.id)}
              ></i>
              <i
                className="fa-solid fa-pencil fa-fw"
                onClick={() => toggleEditMode(user.id, user.name, user.grade)}
              ></i>
              {editableUser === user.id && (
                <i
                  className="fa-solid fa-check fa-fw"
                  onClick={() => updateStudent(user.id)}
                ></i>
              )}
            </td>
          </tr>
        ))}
      </tbody>
        </table>
      </div>
    </div>
  );
}

export default BoatGame;
