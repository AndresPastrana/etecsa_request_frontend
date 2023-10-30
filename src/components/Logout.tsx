import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";
import { ButtonFactory } from "../components/ui/Button";
type Props = typeof ButtonFactory;
export const Logout: Props = ({ ...rest }) => {
  const { logout } = useAuth();
  return (
    <ButtonFactory
      icon={ArrowLeftCircleIcon}
      onClick={logout}
      variant="light"
      {...rest}
    />
  );
};
