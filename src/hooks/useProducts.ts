import { toast } from "sonner";
import { ProductService } from "../services";
import { useSpecialistStore } from "../store";
import useAuth from "./useAuth";
import { IProduct } from "../types";

export const useProducts = () => {
  const { products, setProducts, addProduct, updateProduct, deleteProduct } =
    useSpecialistStore(
      ({
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        setProducts,
      }) => ({
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        setProducts,
      })
    );

  const { loggedUser } = useAuth();

  const loadProducts = async () => {
    try {
      const products = await ProductService.getAllProducts({
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (products) {
        setProducts(products);
        return;
      }
      toast.error("Error loading Products");
    } catch (error) {
      toast.error("Error loading Products");
    }
  };

  const insertProductAPI = async (product: IProduct) => {
    try {
      const newProduct = await ProductService.createProduct(product, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (newProduct) {
        addProduct(newProduct);
        return toast.success(
          `Product: ${newProduct.name} inserted Succesfully`
        );
      }
      return toast.error("Error inserting product");
    } catch (error) {
      return toast.error("Error inserting product");
    }
  };
  const updateProductAPI = async (product: IProduct) => {
    try {
      const updatedproduct = await ProductService.updateProductById(product, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (updatedproduct) {
        updateProduct(updatedproduct);
        return toast.success(
          `Product: ${updatedproduct.name} updated Succesfully`
        );
      }
      return toast.error("Error updating product");
    } catch (error) {
      return toast.error("Error updating product");
    }
  };

  const deleteProductAPI = async (idproduct: string) => {
    try {
      const deletedproduct = await ProductService.deleteProductById(idproduct, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (deletedproduct) {
        deleteProduct(idproduct);
        return toast.success(
          `product ${deletedproduct.name} deleted sucssesfully !`
        );
      }
      return toast.error("Error deleting product");
    } catch (error) {
      return toast.error("Error deleting product");
    }
  };
  return {
    products,
    loadProducts,
    insertProductAPI,
    updateProductAPI,
    deleteProductAPI,
  };
};
