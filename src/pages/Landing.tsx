import {
  AtSymbolIcon,
  BuildingOfficeIcon,
  ClipboardDocumentIcon,
  ComputerDesktopIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

import { Slider } from "../components/Slider";
// import {} from "@heroicons/react/solid";
import { Bold, Button, Flex, Icon, Subtitle, Text, Title } from "@tremor/react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <>
      {/* Header   */}
      <header>
        <nav className="py-5 flex items-start">
          <Flex justifyContent="start">
            <span>
              <img
                src="assets/img/etecsa.png"
                className="w-[60px]"
                alt="etecsa-logo"
              />
            </span>
            <p className="font-normal">ETECSA</p>
            <ul className="flex ml-10 gap-2 ">
              <li>
                <a
                  className="text-gray-500 hover:text-gray-900 transition ease-in-out delay-150"
                  // rome-ignore lint/a11y/useValidAnchor: <explanation>
                  href="#"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  className="text-gray-500 hover:text-gray-900 transition ease-in-out delay-150"
                  href="#gestion"
                >
                  Gestion
                </a>
              </li>
              <li>
                <a
                  className="text-gray-500 hover:text-gray-900 transition ease-in-out delay-150"
                  href="#recursos"
                >
                  Recursos
                </a>
              </li>
              <li>
                <a
                  className="text-gray-500  hover:text-gray-900 transition ease-in-out delay-150"
                  href="#sobre_nosotros"
                >
                  Sobre Nosotros
                </a>
              </li>
            </ul>
          </Flex>
        </nav>
        <Flex
          justifyContent="between"
          className="bg-blue-900 text-tremor-brand-faint px-8 py-32"
        >
          <div className="flex flex-col">
            <h1 className="mt-0  sm:text-2xl md:text-3xl  text-lg">
              Dpto de Logistica y servicios
            </h1>
            <p className="sm:text-md md:text-lg  text-sm  font-normal">
              Gestion y Aprovacion de solicitudes y recursos
            </p>
            <div className="flex mt-12 gap-3 items-center ">
              <Link to="/login">
                <Button
                  variant="primary"
                  className="w-60 ml-10 bg-white text-tremor-brand-emphasis hover:bg-transparent hover:border-tremor-brand-faint hover:text-tremor-brand-faint"
                >
                  Iniciar Seccion
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="assets/img/logist-img.svg"
              className="w-[300px] h-[300px]"
              alt=""
            />
          </div>
        </Flex>
      </header>

      <main className="[&>section]:px-4">
        <section>
          <Title className="text-center my-8" id="gestion">
            Gestion
          </Title>
          <Flex
            justifyContent="around"
            alignItems="center"
            className="gap-8 flex-col sm:flex-row"
          >
            <article className="max-w-[300px] sm:max-w-[350px] flex flex-row items-center gap-5">
              <Icon
                icon={BuildingOfficeIcon}
                color="blue"
                variant="solid"
                size="md"
                className="max-h-[35-px] h-auto"
              />
              <div>
                <Subtitle className="text-sm">Departamentos</Subtitle>
                <Text className="text-lg mt-5">
                  <Bold>
                    Los departamentos pueden realizar solicitudes diarias
                  </Bold>
                </Text>
              </div>
            </article>
            <article className="max-w-[300px] sm:max-w-[350px] flex flex-row items-center gap-5">
              <Icon
                icon={ComputerDesktopIcon}
                color="blue"
                variant="solid"
                size="md"
                className="max-h-[35-px] h-auto"
              />
              <div>
                <Subtitle className="text-sm">Productos</Subtitle>
                <Text className="text-lg mt-5">
                  <Bold>
                    Gestión de los recusos informáticos y de telecomunicaciones.
                  </Bold>
                </Text>
              </div>
            </article>
            <article className="max-w-[300px] sm:max-w-[350px] flex flex-row items-center gap-5">
              <Icon
                icon={ClipboardDocumentIcon}
                color="blue"
                variant="solid"
                size="md"
                className="max-h-[35-px] h-auto"
              />
              <div>
                <Subtitle className="text-sm">Solicitudes</Subtitle>
                <Text className="text-lg mt-5">
                  <Bold>
                    Gestión y aprobacion de las soliciudes de recursos
                    relizadas.
                  </Bold>
                </Text>
              </div>
            </article>
          </Flex>
        </section>
        <section className="my-16">
          <Title id="recursos" className="text-center mb-8">
            Recursos
          </Title>

          <Slider
            images={[
              "huawei.png",
              "teclado.avif",
              "tarj.jpeg",
              "fuente.jpg",
              "disco.jpeg",
            ]}
          />
        </section>
      </main>
      {/* FOOTER */}
      <footer>
        <section>
          <Title id="sobre_nosotros" className="text-center">
            Contactanos
          </Title>
          <Flex
            flexDirection="row"
            alignItems="start"
            className="p-5 flex-col sm:flex-row gap-9 sm:gap-5"
          >
            <div className="max-w-[400px] sm:max-w-[200] md:max-w-[350]">
              <Flex
                justifyContent="start"
                alignItems="center"
                className="gap-2 mb-4"
              >
                <Icon icon={MapPinIcon} size="xs" variant="solid" />
                <Text className="text-center">Direccion del Dpto</Text>
              </Flex>
              <Flex flexDirection="col">
                <Text className="font-semibold">
                  Pinar del Rio,Parque de Independencia,Planta baja, ala
                  izquierda, entrafa No.3
                </Text>
              </Flex>
            </div>
            <div className="max-w-[400px] sm:max-w-[200] md:max-w-[350]">
              <Flex
                justifyContent="start"
                alignItems="center"
                className="gap-2 mb-4"
              >
                <Icon icon={PhoneIcon} size="xs" variant="solid" />
                <Text className="text-center">Telefonos</Text>
              </Flex>
              <Flex flexDirection="col">
                <Text className="text-left">
                  Pinar del Rio,Parque de Independencia,Planta baja, ala
                  izquierda, entrafa No.3
                </Text>
                <Text>
                  Pinar del Rio,Parque de Independencia,Planta baja, ala
                  izquierda, entrafa No.3
                </Text>
              </Flex>
            </div>
            <div className="max-w-[400px] sm:max-w-[200] md:max-w-[350]">
              <Flex
                justifyContent="start"
                alignItems="center"
                className="gap-2 mb-4"
              >
                <Icon icon={AtSymbolIcon} size="xs" variant="solid" />
                <Text className="text-center">Correos</Text>
              </Flex>
              <Flex flexDirection="col">
                <Text className="">
                  Pinar del Rio,Parque de Independencia,Planta baja, ala
                  izquierda, entrafa No.3
                </Text>
              </Flex>
            </div>
          </Flex>
        </section>
        <section>
          <Flex
            flexDirection="col"
            className=" bg-blue-900 py-10 px-5 text-center"
          >
            <Subtitle className="text-white text-xs font-light">
              @ 2023
            </Subtitle>
            <Subtitle className="text-white text-sm font-normal">
              Empresa de Telecomunicaciones de Cuba,Pinar del Río,ETECSA.Todos
              los derechos reservados.
            </Subtitle>
          </Flex>
        </section>
      </footer>
    </>
  );
};
export default Landing;
