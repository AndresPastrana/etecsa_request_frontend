import { FC, useState } from "react";
// Extract the access token from the auth context
type Props = {
	role: string;
};
const ProtectedRoutes: FC<Props> = ({ role }) => {
	const [currentRole] = useState();
	// return <>{(currentRole === role && <Component />) || <Fallback />}</>;
};

export default ProtectedRoutes;
