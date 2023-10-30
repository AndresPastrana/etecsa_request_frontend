// This component will reacive a list of Options to show in the dashboard
// In our case the childrens will be Link

import { Title } from "@tremor/react";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};
const Dashboard: FC<Props> = ({ children }) => {
  return (
    <nav className="p-4 basis-3/12 h-full">
      <Title className="mb-10">Dashboard</Title>
      <menu className="flex flex-col [&>a]:py-2">{children}</menu>
    </nav>
  );
};

export default Dashboard;
