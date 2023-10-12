import { useAdminStore } from "../store/AppStore";

const Admin = () => {
	const state = useAdminStore((state) => state);
	const { routes, productiveBases, tanks, specialists } = state;

	return (
		<div>
			<h1>Admin</h1>
			<p>{JSON.stringify(routes)}</p>
			<p>{JSON.stringify(tanks)}</p>
			<p>{JSON.stringify(specialists)}</p>
			<p>{JSON.stringify(productiveBases)}</p>
		</div>
	);
};

export default Admin;
