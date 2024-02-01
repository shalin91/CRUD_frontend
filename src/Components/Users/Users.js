import React, { useContext, useEffect, useState } from 'react'
import SignContext from '../../contextAPI/Context/SignContext';
import "./User.css"


const Users = () => {
    const {GetallUsers , addUser , EditUser , deleteUser , GetUserById} = useContext(SignContext);
    const [Users, setUsers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [SelectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    isActive: false,
    });
    

    const getusers = async ()=>{
        const res = await GetallUsers();
    // console.log(res);
    setUsers(res.data);
    }

    const handleAddUser = async () => {
        try {
          const res = await addUser(newUser);
      
          if (res.success) {
            setShowAddModal(false);
            setNewUser({
              name: '',
              email: '',
              password: '',
              isActive: false,
            });
            getusers();
          } else {
            console.error('Error adding user:', res.message); 
          }
        } catch (error) {
          console.error('Error adding user:', error);
        }
    };

    const handleEditUserModal = async (user) => {
        try {
          setSelectedUser(user);
      
          // Fetch the user details based on the ID
          const userDetails = await GetUserById(user._id);
      
          if (userDetails.success) {
            // Populate newUser state with the user's information
            setNewUser({
              name: userDetails.data.name,
              email: userDetails.data.email,
              password: userDetails.data.password,
              isActive: userDetails.data.isActive,
            });
      
            // Open the edit modal
            setShowEditModal(true);
          } else {
            console.error('Error fetching user details:', userDetails.message);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      
      const handleEditUser = async () => {
        try {
          const res = await EditUser(SelectedUser._id , newUser);
      
          if (res.success) {
            // Close the modal
            setShowEditModal(false);
      
            // Optionally, you can reset the selected user state
            setSelectedUser(null);
      
            // Fetch the updated list of users
            getusers();
          } else {
            console.error('Error editing user:', res.message);
          }
        } catch (error) {
          console.error('Error editing user:', error);
        }
      };
      
      
    
    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
      };

    const confirmDeleteUser = async () => {
        try {
          await deleteUser(SelectedUser._id);
          setShowDeleteModal(false);
          getusers();
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
    



    useEffect(() => {
      getusers();
    }, [])
    

  return (

    <>
    <div>

            <h2>Users List</h2>
            <div>
            <button onClick={() => setShowAddModal(true)}>Add</button>
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Active Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.isActive ? 'Active' : 'Inactive'}</td>
                            <td>
                                <button className="edit-button" 
                                onClick={() => handleEditUserModal(user)}
                                >Edit</button>
                            </td>
                            <td>
                                <button className="delete-button" 
                                onClick={() => handleDeleteUser(user)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            </div>
            {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddModal(false)}>
              &times;
            </span>
            <h2>Add User</h2>
            <label>Name:</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <label>Email:</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <label>Password:</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <label>Active :</label>
            <input
              type="checkbox"
              checked={newUser.isActive}
              onChange={(e) => setNewUser({ ...newUser, isActive: e.target.checked })}
            />
            <button onClick={handleAddUser}>Add User</button>
          </div>
        </div>
            )}
            {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>
              &times;
            </span>
            <h2>Edit User</h2>
            <label>Name:</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <label>Email:</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <label>Password:</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <label>Active:</label>
            <input
              type="checkbox"
              checked={newUser.isActive}
              onChange={(e) => setNewUser({ ...newUser, isActive: e.target.checked })}
            />
            <button onClick={handleEditUser}>Edit User</button>
          </div>
        </div>
      )}

{showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this user?</p>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            <button onClick={confirmDeleteUser}>Delete</button>
          </div>
        </div>
      )}

            
        </>

  )
}

export default Users