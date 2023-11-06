import { useEffect, useState } from "react";
import { useDestinies, useProducts } from "../../hooks";
import { Flex, NumberInput, Select, SelectItem, Title } from "@tremor/react";
import { ButtonFactory } from "../ui";
import { IResource } from "../../types";
import { toast } from "sonner";
import { useRequest } from "../../hooks/useRequest";

export const FormCreateRequetst = () => {
  // Get the destinies and the Products
  const { products, loadProducts } = useProducts();
  const { destinies, loadDestinies } = useDestinies();
  const { createRequestAPI } = useRequest();

  const [request, setRequest] = useState<{
    destiny: string;
    resources: Array<Pick<IResource, "product" | "quantity">> | [];
  }>({
    destiny: "",
    resources: [],
  });
  const handlCheckBoxClick = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { checked, value } = e.currentTarget;
    if (checked) {
      //Add the resource with 0 quatinty  the input filed

      setRequest((prev) => {
        const newList = [...prev.resources, { product: value, quantity: 0 }];
        return { ...prev, resources: newList };
      });
    } else {
      // Remove the resource from the list

      setRequest((prev) => {
        return {
          ...prev,
          resources: prev.resources.filter((r) => r.product !== value),
        };
      });
    }
  };
  const handleChangeCant = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const q = value === "" ? 0 : parseInt(value);
    setRequest((prev) => {
      return {
        ...prev,
        resources: prev.resources.map((r) => {
          return r.product !== name ? r : { product: r.product, quantity: q };
        }),
      };
    });
  };

  // Helper to disble or able the cant input
  const isProductChecked = (value: string) =>
    request.resources.findIndex((r) => {
      return r.product === value;
    }) === -1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (request.destiny === "" || request.resources.length === 0) {
      return toast.error("Invalid data");
    }
    createRequestAPI(request);
  };
  useEffect(() => {
    Promise.all([loadProducts(), loadDestinies()]);
  }, []);

  return (
    <section className="basis-full flex flex-col">
      <Title className="text-3xl mb-10">Nueva Solicitud</Title>
      <form className=" mx-auto" onSubmit={handleSubmit}>
        <Title className="mb-3">Productos</Title>
        <section className=" mb-8 max-h-[400px] overflow-y-scroll p-5 rounded-lg scroll-smooth scroll-m-1  shadow-tremor-card">
          {products.map(({ name, aviableQuantity, id }) => {
            return (
              <div className="flex items-center gap-80 p-2">
                <Flex
                  className="w-40 gap-2"
                  justifyContent="start"
                  flexDirection="row"
                >
                  <input
                    type="checkbox"
                    name={name}
                    id={name}
                    value={id}
                    onChange={handlCheckBoxClick}
                  />
                  <label htmlFor={name}>{name.toUpperCase()}</label>
                </Flex>
                <NumberInput
                  name={id}
                  disabled={isProductChecked(id)}
                  placeholder="Cantifa"
                  className="max-w-[50px]"
                  max={aviableQuantity}
                  defaultValue={0}
                  min={0}
                  onChange={handleChangeCant}
                />
              </div>
            );
          })}
        </section>

        <Select
          placeholder="Destino"
          className="[&>ul]:max-h-28 mb-28"
          value={request.destiny}
          onChange={(e) => {
            setRequest((prev) => ({ ...prev, destiny: e }));
          }}
        >
          {destinies.map((s) => (
            <SelectItem defaultChecked={request.destiny === s.id} value={s.id}>
              {s.description}
            </SelectItem>
          ))}
        </Select>
        <ButtonFactory type="submit" className="w-full" text="Make request" />
      </form>
    </section>
  );
};
