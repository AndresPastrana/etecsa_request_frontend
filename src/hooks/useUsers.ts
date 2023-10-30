import { useCallback } from "react";
import { UserService } from "../services/index";
import { useSpecialistStore } from "../store";
import { UserFormData } from "../types";
import useAuth from "./useAuth";
import { toast } from "sonner";

// This hook hanldes the api calls to the UserService and changes the current state
export const useUsers = () => {
  // Zustand store
  const { users, setUsers, addUser, updateUser, deleteUser } =
    useSpecialistStore((state) => state);
  const { loggedUser = null } = useAuth();

  // States for handle the requests status

  // TODO: Handle every api call state individually , loading and error
  const loadUsersAPI = useCallback(async () => {
    try {
      const us = await UserService.getUsersByRole({
        params: { role: "HEAD_OF_DEPARTMENT" },
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });

      setUsers(us);
    } catch (error) {
      // Setting Error
    }
    // Finish laoding
  }, []);

  const insertUserAPI = async (user: UserFormData) => {
    try {
      const newUser = await UserService.createNewUser(user, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });

      if (newUser) {
        addUser(newUser);
        return toast.success(`User ${newUser.firstName} inserted successfully`);
      }
      return toast.error("Error creating the user");
    } catch (error) {
      return toast.error("Error creating the user");
    }
  };
  const updateUserAPI = async (user: UserFormData) => {
    try {
      const updatedUser = await UserService.UpdateUser(user, {
        headers: { Authorization: `Bearer ${loggedUser?.access_token}` },
      });
      if (updatedUser) {
        updateUser(updatedUser);
        return toast.success(
          `User ${updatedUser.firstName} updated successfully user`
        );
      }
      return toast.error(`Error updating the user`);
    } catch (error) {
      return toast.error(`Error updating the user`);
    }
  };
  const deleteUserAPI = async (idUser: string) => {
    try {
      const id = await UserService.deleteUserById(idUser, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (id) {
        deleteUser(id);
      }
    } catch (error) {
      toast.error("Message error");
    }
  };
  return {
    users,
    loadUsersAPI,
    insertUserAPI,
    updateUserAPI,
    deleteUserAPI,
  };
};
