import React, { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserRole } from "../const";
import useAuth from "../hooks/useAuth";
// Extract the access token from the auth context
type Props = {
  role: UserRole;
  fallbackPath: string;
  ToRenderComponet: React.FC;
};

const ProtectedRoute: FC<Props> = ({
  role,
  fallbackPath,
  ToRenderComponet,
}) => {
  const { loggedUser } = useAuth();
  return loggedUser?.role === role ? (
    <ToRenderComponet />
  ) : (
    <Navigate to={fallbackPath} />
  );
};

export default ProtectedRoute;
