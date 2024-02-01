import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import "../Users/User.css";

const Task = () => {
  const {
    addTask,
    GetallTasks,
    GetTaskById,
    EditTask,
    deleteTask,
    GetallUsers,
    GetallProjects,
  } = useContext(SignContext);
  const [Tasks, setTasks] = useState([]);
  const [Projects, setProjects] = useState([]);
  const [Users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [SelectedTask, setSelectedTask] = useState(null);
  const [newTask, setnewTask] = useState({
    projectId: "",
    userId: "",
    name: "",
    dueDate: "",
    isDeleted: false,
    isActive: true,
  });

  const gettasks = async () => {
    const res = await GetallTasks();
    // console.log(res);
    setTasks(res.data);
  };

  const getprojects = async () => {
    const res = await GetallProjects();
    // console.log(res);
    setProjects(res.data);
  };

  const getusers = async () => {
    const res = await GetallUsers();
    // console.log(res);
    setUsers(res.data);
  };

  const handleAddTask = async () => {
    try {
      const res = await addTask(newTask);

      if (res.success) {
        setShowAddModal(false);
        setnewTask({
          projectId: "",
          userId: "",
          name: "",
          dueDate: "",
          isDeleted: false,
          isActive: true,
        });
        gettasks();
      } else {
        console.error("Error adding task:", res.message);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTaskModal = async (task) => {
    try {
      setSelectedTask(task);

      const taskDetails = await GetTaskById(task._id);

      if (taskDetails.success) {
        setnewTask({
          name: taskDetails.data.name,
          projectId: taskDetails.data.projectId,
          userId: taskDetails.data.userId,
          dueDate: taskDetails.data.dueDate,
          isActive: taskDetails.data.isActive,
          isDeleted: taskDetails.data.isDeleted,
        });

        // Open the edit modal
        setShowEditModal(true);
      } else {
        console.error("Error fetching task details:", taskDetails.message);
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  const handleEditTask = async () => {
    try {
      const res = await EditTask(SelectedTask._id, newTask);

      if (res.success) {
        setShowEditModal(false);

        setSelectedTask(null);

        gettasks();
      } else {
        console.error("Error editing task:", res.message);
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = async () => {
    try {
      await deleteTask(SelectedTask._id);
      setShowDeleteModal(false);
      gettasks();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    gettasks();
    getprojects();
    getusers();
  }, []);

  return (
    <>
      <div>
        <h2>Tasks List</h2>
        <div>
          <button onClick={() => setShowAddModal(true)}>Add</button>
        </div>
        <div>
          <table className="user-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>User</th>
                <th>Name</th>
                <th>Due Date</th>
                <th>Active Status</th>
                <th>Delete Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Tasks.map((user) => (
                <tr key={user.id}>
                  <td>{user.projectId.name}</td>
                  <td>{user.userId.name}</td>
                  <td>{user.name}</td>
                  <td>{user.dueDate.slice(0, 10).split("").join("")}</td>
                  <td>{user.isActive === true ? "Active" : "inActive"}</td>
                  <td>{user.isDeleted === true ? "Deleted" : "notDeleted"}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditTaskModal(user)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteTask(user)}
                    >
                      Delete
                    </button>
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
            <h2>Add Task</h2>
            <label>
              Project
            </label>
            <select
                                        className="form-select"
                                        name="departmentGroup"
                                        value={newTask.projectId}
                                        onChange={(e) => setnewTask({ ...newTask, projectId: e.target.value })}
                                      >
                                        <option value="">--select--</option>
                                        {Projects && Projects.length > 0 ? (
                                          Projects.map((pro) => (
                                            <option key={pro} value={pro._id}>
                                              {pro.name}
                                            </option>
                                          ))
                                        ) : (
                                          <option value="" disabled>
                                            No projects available
                                          </option>
                                        )}
                                      </select>
                                      <label>
              Users
            </label>
            <select
                                        className="form-select"
                                        name="departmentGroup"
                                        value={newTask.userId}
                                        onChange={(e) => setnewTask({ ...newTask, userId: e.target.value })}
                                      >
                                        <option value="">--select--</option>
                                        {Users && Users.length > 0 ? (
                                          Users.map((user) => (
                                            <option key={user} value={user._id}>
                                              {user.name}
                                            </option>
                                          ))
                                        ) : (
                                          <option value="" disabled>
                                            No users available
                                          </option>
                                        )}
                                      </select>
            <label>Name:</label>
            <input
              type="text"
              value={newTask.name}
              onChange={(e) => setnewTask({ ...newTask, name: e.target.value })}
            />
            <label>Due:</label>
            <input
              type="text"
              value={newTask.dueDate}
              onChange={(e) =>
                setnewTask({ ...newTask, dueDate: e.target.value })
              }
            />
            <label>isActive :</label>
            <input
              type="checkbox"
              checked={newTask.isActive}
              onChange={(e) =>
                setnewTask({ ...newTask, isActive: e.target.checked })
              }
            />
            <label>isDeleted :</label>
            <input
              type="checkbox"
              checked={newTask.isDeleted}
              onChange={(e) =>
                setnewTask({ ...newTask, isDeleted: e.target.checked })
              }
            />
            <button onClick={handleAddTask}>Add task</button>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>
              &times;
            </span>
            <h2>Edit Task</h2>
            <label>
              Project
            </label>
            <select
                                        className="form-select"
                                        name="departmentGroup"
                                        value={newTask.projectId}
                                        onChange={(e) => setnewTask({ ...newTask, projectId: e.target.value })}
                                      >
                                        <option value="">--select--</option>
                                        {Projects && Projects.length > 0 ? (
                                          Projects.map((pro) => (
                                            <option key={pro} value={pro._id}>
                                              {pro.name}
                                            </option>
                                          ))
                                        ) : (
                                          <option value="" disabled>
                                            No projects available
                                          </option>
                                        )}
                                      </select>
                                      <label>
              Users
            </label>
            <select
                                        className="form-select"
                                        name="departmentGroup"
                                        value={newTask.userId}
                                        onChange={(e) => setnewTask({ ...newTask, userId: e.target.value })}
                                      >
                                        <option value="">--select--</option>
                                        {Users && Users.length > 0 ? (
                                          Users.map((user) => (
                                            <option key={user} value={user._id}>
                                              {user.name}
                                            </option>
                                          ))
                                        ) : (
                                          <option value="" disabled>
                                            No users available
                                          </option>
                                        )}
                                      </select>
            <label>Name:</label>
            <input
              type="text"
              value={newTask.name}
              onChange={(e) => setnewTask({ ...newTask, name: e.target.value })}
            />
            <label>End:</label>
            <input
              type="text"
              value={newTask.dueDate}
              onChange={(e) =>
                setnewTask({ ...newTask, dueDate: e.target.value })
              }
            />
            <label>isActive :</label>
            <input
              type="checkbox"
              checked={newTask.isActive}
              onChange={(e) =>
                setnewTask({ ...newTask, isActive: e.target.checked })
              }
            />

            <label>isDeleted:</label>
            <input
              type="checkbox"
              checked={newTask.isDeleted}
              onChange={(e) =>
                setnewTask({ ...newTask, isDeleted: e.target.checked })
              }
            />
            <button onClick={handleEditTask}>Edit task</button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this task?</p>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            <button onClick={confirmDeleteTask}>Delete</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
