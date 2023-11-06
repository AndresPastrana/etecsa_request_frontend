import { Icon, Text } from "@tremor/react";
import useAuth from "../hooks/useAuth";
Text;
const Header = () => {
  const { loggedUser } = useAuth();

  const currentDate = new Date().toLocaleString().split(",")[0];
  return (
    <header className="p-3 basis-1/12 flex justify-between items-center h-[30vh]">
      <span className="flex items-center justify-between">
        <span className="mr-5">
          <img
            src="../../assets/img/logo.png"
            className="w-20"
            alt="Logo Etecsa"
          />
        </span>
        {/* <Icon icon={Bars3BottomLeftIcon} size="lg" /> */}
      </span>
      <div className="flex items-center gap-4">
        <Text>{currentDate}</Text>
        <Text className="">{loggedUser?.role}</Text>
        <div className="flex w-14 h-14 justify-center items-center rounded-[50%] bg-tremor-brand-muted">
          {loggedUser?.role?.charAt(0)}
        </div>
      </div>
    </header>
  );
};

export default Header;
