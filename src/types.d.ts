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
  state: {
    _id: string;
    province: string;
    name: string;
  };
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
  departament: {
    _id: string;
    descripcion: string;
    ccosto: string;
  } | null;
  // isValidPassword: (password: string) => Promise<boolean>;
}

interface ICCosto {
  id: string;
  code: string;
}

interface IDepartament {
  id: string;
  ccosto: {
    _id: string;
    code: string;
  };
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

type AppState = {
  products: IProduct[];
  states: IState[];
  destinies: IDestiny[];
  requests: RequestFormData[];
  users: IUser[];
  departments: IDepartament[];
  bills: IBilling[];
  stadistics: RequestCounter;
  ccostos: ICCosto[];
  setStates: (states: IState[]) => void;
  setProducts: (products: IProduct[]) => void;
  setDestinies: (destiny: IDestiny[]) => void;
  setRequests: (request: IRequest[]) => void;
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

  // CRUD actions for destinies
  addDestinies: (destiny: IDestiny) => void;
  updateDestiny: (destiny: IDestiny) => void;
  deleteDestiny: (destinies: string) => void;

  // CRUD actions for requests
  updateRequest: (request: RequestFormData) => void;
  addRequest: (request: RequestFormData) => void;

  // CRUD actions for bills
  addBill: (bill: IBilling) => void;
  updateStadistics: (newStadistics: RequestCounter) => void;
  setBills: (bill: IBill[]) => void;
  // R actions for ccosto
  setCCostos: (ccostos: ICCosto[]) => void;
};

interface ServerResponse {
  success: boolean;
  msg: string;
  data: any;
  error: any;
}

type DepartmentFormData = Pick<IDepartament, "descripcion" | "id"> & {
  ccosto: string;
};

type DestinyFormData = Pick<IDestiny, "code" | "description" | "id"> & {
  state: string;
};

type UserFormData = Pick<
  IUser,
  "id" | "firstName" | "lastName" | "email" | "role" | "username" | "password"
> & { departament?: string };

type RequestFormData = Pick<IRequest, "id" | "status" | "createdAt"> & {
  departament: ({ _id: string } & Pick<IDepartament, "descripcion">) | null;
  destiny: ({ _id: string } & Pick<IDestiny, "description">) | null;
  aprovedBy: ({ _id: string } & Pick<IUser, "firstName">) | null;
  resources: [
    { _id: string; quantity: number; product: { _id: string; name: string } }
  ];
};
