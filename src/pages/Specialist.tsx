import { Link, Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import { ButtonFactory } from "../components/ui";
import { Logout } from "../components/Logout";
const Specialist = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <section className="basis-11/12 flex h-[70vh]">
        <Dashboard>
          <Link to="user">
            <ButtonFactory
              text="Trabajadores"
              variant="light"
              color="neutral"
            />
          </Link>
          <Link to="department">
            <ButtonFactory
              text="Departmentos"
              variant="light"
              color="neutral"
            />
          </Link>
          <Link to="destiny">
            <ButtonFactory text="Destinos" variant="light" color="neutral" />
          </Link>
          <Link to="product">
            <ButtonFactory text="Productos" variant="light" color="neutral" />
          </Link>
          <Link to="request">
            <ButtonFactory text="Solicitudes" variant="light" color="neutral" />
          </Link>
          <Link to="stadistic">
            <ButtonFactory
              text="Estadisticas"
              variant="light"
              color="neutral"
            />
          </Link>

          <Link to="bill">
            <ButtonFactory text="Bills" variant="light" color="neutral" />
          </Link>
          <Link to="test">
            <ButtonFactory text="Test" variant="light" color="neutral" />
          </Link>

          <Logout
            text="Logout"
            className="justify-start font-extralight mt-8"
            color="neutral"
            size="xs"
          />
        </Dashboard>
        <div className="basis-9/12 h-full flex flex-col gap-1">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Specialist;
