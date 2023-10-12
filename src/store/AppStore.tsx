import { create } from "zustand";
import { AdminState } from "../types";
export const useStoreAdmin = create();

export const useAdminStore = create<AdminState>()((set) => ({
	routes: [],
	tanks: [],
	specialists: [],
	productiveBases: [],
	addRoute: (route) => set((state) => ({ routes: [...state.routes, route] })),
	addSpecialist: (sepcialist) =>
		set((state) => ({ specialists: [...state.specialists, sepcialist] })),
	addTank: (tank) => set((state) => ({ tanks: [...state.tanks, tank] })),
	addProductiveBase: (productivebase) =>
		set((state) => ({
			productiveBases: [...state.productiveBases, productivebase],
		})),

	editTank: ({ id, data }) =>
		set((state) => {
			const newTanksArray = state.tanks.map((tank) => {
				if (tank.id === id) {
					return { ...tank, ...data };
				}
				return tank;
			});

			return { tanks: newTanksArray };
		}),
	editRoute: ({ id, data }) =>
		set((state) => {
			const newRoutesArray = state.routes.map((route) => {
				if (route.id === id) {
					return { ...route, ...data };
				}
				return route;
			});

			return { routes: newRoutesArray };
		}),

	editSpecialist: ({ id, data }) =>
		set((state) => {
			const newSpecialistArray = state.specialists.map((sepcialist) => {
				if (sepcialist.id === id) {
					return { ...sepcialist, ...data };
				}
				return sepcialist;
			});

			return { specialists: newSpecialistArray };
		}),
	editProductiveBase: () => {},
	removeProductiveBase: () => {},
	removeRoute: () => {},
	removeSpecialist: () => {},
	removeTank: () => {},
	setRoutes: () => {},
	setTanks: () => {},
	setSpecialists: () => {},
	setProductiveBases: () => {},
}));

export const useSpecialistStore = create({});
