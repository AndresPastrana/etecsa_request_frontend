import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/index";
import { ProductTable } from "./ProductTable";
import { ProductForm } from "./ProductForm";
import { FormMode, UserRole } from "../../const";
import { IProduct } from "../../types";
import { findById } from "../../helper/findById";
import { ButtonFactory } from "../ui";
import clsx from "clsx";
import useAuth from "../../hooks/useAuth";

export const ProductPanel = () => {
  const { loggedUser } = useAuth();
  const isSpecialist = loggedUser?.role === UserRole.SPECIALIST;
  const {
    products,
    loadProducts,
    insertProductAPI,
    deleteProductAPI,
    updateProductAPI,
  } = useProducts();
  // State for handle if the modal is open or not
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>(FormMode.insert);
  const [activeProduct, setActiveProduct] = useState<IProduct | null>(null);

  // Modal actions
  const onModalClose = () => {
    setOpen(false);
    setActiveProduct(null);
    setMode(FormMode.insert);
  };
  const handleSubmit = async (product: IProduct) => {
    if (mode === FormMode.insert) {
      return await insertProductAPI(product);
    }
    if (mode === FormMode.edit) {
      return await updateProductAPI(product);
    }
    return;
  };

  // Table buttons actions
  const handleBtnEdit = (id: string) => {
    setMode(FormMode.edit);
    const product = findById(id, products);
    if (product) {
      setActiveProduct(product);
      setOpen(true);
    }
  };
  const handleBtnAddNew = () => {
    if (activeProduct) {
      setActiveProduct(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
    if (!open) {
      setOpen(true);
    }
  };
  const handldeDelete = (id: string) => {
    deleteProductAPI(id);
    if (activeProduct) {
      setActiveProduct(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <ProductForm
        open={open}
        activeProduct={activeProduct}
        mode={mode}
        onClose={onModalClose}
        onSubmitAction={handleSubmit}
      />

      <section className="basis-9/12 h-full flex flex-col max-h-full p-4 ">
        <ProductTable
          products={products}
          handleDelete={handldeDelete}
          hanldeEdit={handleBtnEdit}
          isSpecialist={isSpecialist}
        />
        <ButtonFactory
          text="Agregar un nuevo producto"
          className={clsx("w-full mb-4", {
            "hidden ": !isSpecialist,
          })}
          variant="secondary"
          onClick={handleBtnAddNew}
        />
      </section>
    </>
  );
};
