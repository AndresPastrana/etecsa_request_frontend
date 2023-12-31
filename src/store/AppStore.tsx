import { create } from "zustand";
import { IDepartament, AppState } from "../types";

export const useAppStore = create<AppState>((set) => ({
  users: [],
  departments: [],
  products: [],
  requests: [],
  bills: [],
  stadistics: {
    approved: 0,
    denied: 0,
    pending: 0,
  },
  destinies: [],
  ccostos: [],
  states: [],
  setStates: (states) => set(() => ({ states })),
  setRequests: (requests) => set(() => ({ requests })),
  addRequest: (request) =>
    set((state) => ({ requests: [...state.requests, request] })),

  // Users
  setUsers: (users) => set(() => ({ users })),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),
  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
  // Department
  addDepartment: (department) =>
    set((state) => ({ departments: [...state.departments, department] })),
  updateDepartment: (updatedDepartment) =>
    set((state) => ({
      departments: state.departments.map((department) =>
        department.id === updatedDepartment.id ? updatedDepartment : department
      ),
    })),
  deleteDepartment: (departmentId) =>
    set((state) => ({
      departments: state.departments.filter(
        (department) => department.id !== departmentId
      ),
    })),
  setDepartments: (departments: Array<IDepartament>) =>
    set(() => ({ departments })),

  // Products
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    })),
  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  setProducts: (products) => set(() => ({ products })),

  // Destinies
  addDestinies: (destiny) =>
    set((state) => ({ destinies: [...state.destinies, destiny] })),

  updateDestiny: (destiny) =>
    set((state) => ({
      destinies: state.destinies.map((d) => {
        return d.id === destiny.id ? destiny : d;
      }),
    })),
  deleteDestiny: (destinyId) =>
    set((state) => ({
      destinies: state.destinies.filter((destiny) => destiny.id !== destinyId),
    })),
  setDestinies: (destinies) => set(() => ({ destinies })),

  updateRequest: (updatedRequest) =>
    set((state) => ({
      requests: state.requests.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request
      ),
    })),

  // Facturas
  setBills: (bills) => set(() => ({ bills })),

  addBill: (bill) => set((state) => ({ bills: [...state.bills, bill] })),
  // Departamentos de costos
  updateStadistics: (newStatics) =>
    set((state) => ({ bills: { ...state.bills, ...newStatics } })),

  setCCostos: (ccostos) => set(() => ({ ccostos })),
}));
