import { Request, Response } from "express";
import { getCountOfUsers } from "../../../services/user/permission";

export const getConnectPermission = async (req: Request, res: Response) => {
	const { count } = await getCountOfUsers();
	const response = {
		permission: count < 4,
	};
	res.json(response);
};
