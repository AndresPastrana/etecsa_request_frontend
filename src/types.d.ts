import { RequestStatus, UserRole } from "./const";

interface IProduct {
	id: string;
	code: string;
	name: string;
	price: number;
	aviableQuantity: number;
}

interface IProvince {
	id: string;
	name: string;
}

interface IState {
	id: string;
	name: string;
	province: string;
}

interface IDestiny {
	id: string;
	code: string;
	description: string;
	state: string;
}
interface IBilling {
	id: string;
	request: string;
	total_import: number;
}

interface IUser {
	id: string;
	username: string;
	password: string;
	email: string;
	role: UserRole;
	firstName: string;
	lastName: string;
	departament?: string;
	isValidPassword: (password: string) => Promise<boolean>;
}

interface ICCosto {
	id: string;
	code: string;
}

interface IDepartament {
	id: string;
	ccosto: string;
	descripcion: string;
}
interface IResource {
	id: string;
	product: string;
	quantity: number;
}

interface IRequest {
	id: string;
	departament: string;
	resources: Array<IResource>;
	destiny: string;
	status: RequestStatus;
	aprovedBy?: string;
	createdAt: Date;
	updatedAt: Date;
}

type RequestCounter = {
	[status in RequestStatus]: number;
};

type SpecialistStore = {
	users: IUser[];
	departments: IDepartament[];
	products: IProduct[];
	requests: IRequest[];
	bills: IBilling[];
	stadistics: RequestCounter;
	destinies: IDestiny[];
	ccost: ICCosto[];
};

type SpecialistActions = {
	// CRUD actions for users
	addUser: (user: IUser) => void;
	updateUser: (user: IUser) => void;
	deleteUser: (userId: string) => void;
	setUsers: (users: IUser[]) => void;
	// CRUD actions for departments
	addDepartment: (department: IDepartament) => void;
	updateDepartment: (department: IDepartament) => void;
	deleteDepartment: (departmentId: string) => void;
	setDepartments: (departments: IDepartament[]) => void;
	// CRUD actions for products
	addProduct: (product: IProduct) => void;
	updateProduct: (product: IProduct) => void;
	deleteProduct: (productId: string) => void;
	setProducts: (products: IProduct[]) => void;

	// CRUD actions for destinies
	addDestinies: (destiny: IDestiny) => void;
	updateDestiny: (destiny: IDestiny) => void;
	deleteDestiny: (destinies: string) => void;
	setDestinies: (destiny: IDestiny[]) => void;

	// CRUD actions for requests
	updateRequest: (request: IRequest) => void;
	setRequest: (request: IRequest[]) => void;
	// CRUD actions for bills
	addBill: (bill: IBilling) => void;
	updateStadistics: (newStadistics: RequestCounter) => void;
	setBills: (bill: IBill[]) => void;
};

type WorkerStore = {
	requests: IRequest[];
	products: IProduct[];
};

type WorkerActions = {
	setRequests: (request: IRequest[]) => void;
	addRequest: (request: IRequest) => void;
	setProducts: (products: IProduct[]) => void;
};

type SpecialistState = SpecialistStore & SpecialistActions;

type WorkerState = WorkerStore & WorkerActions;

//  enum Routes {
// 	auth = "/auth",
// 	user = "/user",
// 	product = "/product",
// 	destiny = "/destiny",
// 	province = "/province",
// 	states = "/state",
// 	ccosto = "/ccosto",
// 	request = "/request",
// 	departament = "/departament",
// }
