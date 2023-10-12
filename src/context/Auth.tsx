import { createContext, FC, useState } from "react";
export const AuthContext = createContext(null);

type LogedUser = {
	uid: string | null | undefined;
	role: string | null | undefined;
	access_token: string | null | undefined;
};

type Props = {
	children: React.ReactNode;
};
const defaultUser: LogedUser = {
	uid: null,
	role: null,
	access_token: null,
};

export const AuthProvider: FC<Props> = ({ children }) => {
	const [user, setUser] = useState(defaultUser);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
