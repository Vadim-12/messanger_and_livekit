import { users } from "../../db/users";

interface IResult {
	count: number;
}

export const getCountOfUsers = async (): Promise<IResult> => {
	const response = {
		count: users.size,
	};

	return response;
};
