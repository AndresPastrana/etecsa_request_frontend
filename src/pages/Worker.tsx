import { Link, Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { ButtonFactory } from "../components/ui";
import Header from "../components/Header";
import { Logout } from "../components/Logout";
const Worker = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Dashboard */}
      <Header />

      <section className="basis-11/12 flex h-[70vh]">
        <Dashboard>
          <Link to="product">
            <ButtonFactory text="Products" variant="light" color="neutral" />
          </Link>
          <Link to="request/list">
            <ButtonFactory text="Solicitudes" variant="light" color="neutral" />
          </Link>
          <Link to="request/new">
            <ButtonFactory
              text="Nueva Solicitud"
              variant="light"
              color="neutral"
            />
          </Link>

          <Logout
            text="Logout"
            className="justify-start font-extralight mt-8"
            color="neutral"
            size="xs"
          />
        </Dashboard>
        <Outlet />
      </section>
    </div>
  );
};

export default Worker;
