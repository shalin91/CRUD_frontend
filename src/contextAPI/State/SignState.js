import axios from "axios";
import SignContext from "../Context/SignContext";
import React from "react";

export const SignState = (props) => {
  
  const url = `http://localhost:5005`;
  

  // create user
  const addUser = async (UserData) => {
    try {
      const response = await axios.post(
        `${url}/user/adduser`,
        UserData
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  // view users
  const GetallUsers = async () => {
    try {
      const response = await axios.get(
        `${url}/user/getusers`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };


  const GetUserById = async (id) => {
    try {
      const response = await axios.get(
        `${url}/user/getuser/${id}`,
        {}
      );
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const EditUser = async (id, userData) => {
    try {
      const response = await axios.post(
        `${url}/user/edituser/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.post(
        `${url}/user/deleteuser/${id}`
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const addProject = async (ProjectData) => {
    try {
      const response = await axios.post(
        `${url}/project/addproject`,
        ProjectData
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetallProjects = async () => {
    try {
      const response = await axios.get(
        `${url}/project/getprojects`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetProjectById = async (id) => {
    try {
      const response = await axios.get(
        `${url}/project/getproject/${id}`,
        {}
      );
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const EditProject = async (id, userData) => {
    try {
      const response = await axios.post(
        `${url}/project/editproject/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await axios.post(
        `${url}/project/deleteproject/${id}`
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const addTask = async (TaskData) => {
    try {
      const response = await axios.post(
        `${url}/task/addtask`,
        TaskData
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetallTasks = async () => {
    try {
      const response = await axios.get(
        `${url}/task/gettasks`,
        {}
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };

  const GetTaskById = async (id) => {
    try {
      const response = await axios.get(
        `${url}/task/gettask/${id}`,
        {}
      );
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const EditTask = async (id, userData) => {
    try {
      const response = await axios.post(
        `${url}/task/edittask/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.post(
        `${url}/task/deletetask/${id}`
      );
      return response.data;
    } catch (error) {
      return { success: false, msg: "server Error" };
    }
  };




  return (
    <SignContext.Provider
      value={{
        addUser,
        GetallUsers,
        GetUserById,
        EditUser,
        deleteUser,
        addProject,
        GetallProjects,
        GetProjectById,
        EditProject,
        deleteProject,
        addTask,
        GetTaskById,
        GetallTasks,
        EditTask,
        deleteTask,
      }}
    >
      {props.children}
    </SignContext.Provider>
  );
};
