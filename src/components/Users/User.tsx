// Form to Edit or insert a new users
import { useEffect, useState } from "react";
import { useUsers } from "../../hooks";
import { UserFormData } from "../../types";
import UserTable from "./UserTable";
import { findById } from "../../helper/findById";
import { UserForm } from "./UserForm";
import { FormMode } from "../../const";

// Users table
export const UserPanel = () => {
  const [mode, setMode] = useState<FormMode>(FormMode.insert);
  const { users, deleteUserAPI, loadUsersAPI, insertUserAPI, updateUserAPI } =
    useUsers();

  const [activeUser, setActiveUser] = useState<UserFormData | null>(null);

  const handleBtnEdit = (id: string) => {
    setMode(FormMode.edit);
    const user = findById(id, users);
    if (user) {
      const trimed: UserFormData = {
        ...user,
        departament: user.departament ? user.departament._id : null,
      };
      setActiveUser(trimed);
    }
  };

  const cleanForm = () => {
    if (activeUser) {
      setActiveUser(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
  };

  const handleDelete = (id: string) => {
    deleteUserAPI(id);
    if (activeUser) {
      setActiveUser(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
  };

  const handleSubmit = async (user: UserFormData) => {
    if (mode === FormMode.insert) {
      await insertUserAPI(user);
    }
    if (mode === FormMode.edit) {
      await updateUserAPI(user);
    }

    return cleanForm();
  };

  useEffect(() => {
    loadUsersAPI();
  }, []);

  return (
    <>
      <UserForm
        activeUser={activeUser}
        mode={mode}
        onSubmitAction={handleSubmit}
      />
      <UserTable
        users={users}
        handleBtnEdit={handleBtnEdit}
        handleBtnDelete={handleDelete}
      />
    </>
  );
};
