import React, { useContext, useEffect, useState } from 'react'
import SignContext from '../../contextAPI/Context/SignContext';
import "../Users/User.css";

const Projects = () => {
    const {addProject , GetallProjects , GetProjectById , EditProject , deleteProject} = useContext(SignContext);
    const [Projects, setProjects] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [SelectedProject, setSelectedProject] = useState(null);
    const [newProject, setNewProject] = useState({
    name: '',
    startDate: '',
    endDate: '',
    isDeleted: false,
    });
    

    const getprojects = async ()=>{
        const res = await GetallProjects();
    // console.log(res);
    setProjects(res.data);
    }

    const handleAddProject = async () => {
        try {
          const res = await addProject(newProject);
      
          if (res.success) {
            setShowAddModal(false);
            setNewProject({
                name: '',
                startDate: '',
                endDate: '',
                isDeleted: false,
            });
            getprojects();
          } else {
            console.error('Error adding user:', res.message); 
          }
        } catch (error) {
          console.error('Error adding user:', error);
        }
    };

    const handleEditProjectModal = async (project) => {
        try {
          setSelectedProject(project);
      
          
          const userDetails = await GetProjectById(project._id);
      
          if (userDetails.success) {
            
            setNewProject({
              name: userDetails.data.name,
              email: userDetails.data.email,
              phone: userDetails.data.phone,
              birthDate: userDetails.data.birthDate,
              isDeleted: userDetails.data.isDeleted,
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
          const res = await EditProject(SelectedProject._id , newProject);
      
          if (res.success) {
            
            setShowEditModal(false);
      
      
            setSelectedProject(null);
      
       
            getprojects();
          } else {
            console.error('Error editing user:', res.message);
          }
        } catch (error) {
          console.error('Error editing user:', error);
        }
      };
      
      
    
    const handleDeleteProject = (project) => {
        setSelectedProject(project);
        setShowDeleteModal(true);
      };

    const confirmDeleteUser = async () => {
        try {
          await deleteProject(SelectedProject._id);
          setShowDeleteModal(false);
          getprojects();
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
    



    useEffect(() => {
      getprojects();
    }, [])

  return (

    <>
    <div>

            <h2>Projects List</h2>
            <div>
            <button onClick={() => setShowAddModal(true)}>Add</button>
            </div>
            <div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Delete Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Projects.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.startDate.slice(0, 10)
                                            .split("")
                                            .join("")}</td>
                            <td>{user.endDate.slice(0, 10)
                                            .split("")
                                            .join("")}</td>
                            <td>{user.isDeleted === true ? 'Deleted' : 'notDeleted'}</td>
                            <td>
                                <button className="edit-button" 
                                onClick={() => handleEditProjectModal(user)}
                                >Edit</button>
                            </td>
                            <td>
                                <button className="delete-button" 
                                onClick={() => handleDeleteProject(user)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>


            </div>
            {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddModal(false)}>
              &times;
            </span>
            <h2>Add Project</h2>
            <label>Name:</label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <label>Start:</label>
            <input
              type="text"
              value={newProject.email}
              onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
            />
            <label>End:</label>
            <input
              type="text"
              value={newProject.phone}
              onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
            />
            <label>isDeleted :</label>
            <input
              type="checkbox"
              checked={newProject.isDeleted}
              onChange={(e) => setNewProject({ ...newProject, isDeleted: e.target.checked })}
            />
            <button onClick={handleAddProject}>Add project</button>
          </div>
        </div>
            )}
            {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>
              &times;
            </span>
            <h2>Edit Project</h2>
            <label>Name:</label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <label>Start:</label>
            <input
              type="text"
              value={newProject.startDate}
              onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
            />
            <label>End:</label>
            <input
              type="text"
              value={newProject.endDate}
              onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
            />
            <label>isDeleted:</label>
            <input
              type="checkbox"
              checked={newProject.isDeleted}
              onChange={(e) => setNewProject({ ...newProject, isDeleted: e.target.checked })}
            />
            <button onClick={handleEditUser}>Edit project</button>
          </div>
        </div>
      )}

{showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this project?</p>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            <button onClick={confirmDeleteUser}>Delete</button>
          </div>
        </div>
      )}

            
        </>
  )
}

export default Projects