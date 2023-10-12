import { Link, Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const Specialist = () => {
	return (
		<div>
			<h1>Specialist Page</h1>
			{/* Dashboard */}
			<Dashboard>
				<Link to="user">Users</Link>
				<Link to="department">Department</Link>
				<Link to="destiny">Destiny</Link>
				<Link to="product">Product</Link>
				<Link to="request">Request</Link>
				<Link to="stadistic">Stadistic</Link>
				<Link to="bill">Bill</Link>
			</Dashboard>
			<h2>Children Route</h2>
			<Outlet />
			{/* Children Here */}
		</div>
	);
};

export default Specialist;
