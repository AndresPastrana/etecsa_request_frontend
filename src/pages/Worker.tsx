import { Link, Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard";
const Worker = () => {
	return (
		<div>
			<h1>Worker Page</h1>
			{/* Dashboard */}
			<h2>Dashborad</h2>
			<Dashboard>
				<Link to="product">Product</Link>
				<Link to="request">Request</Link>
			</Dashboard>
			<Outlet />
			{/* Children Here */}
		</div>
	);
};

export default Worker;
