import { vars } from "../config/vars";
import { http } from "../config/http";

export const startApiServer = async () => {
	http.listen(vars.port);
	console.log("HTTP started on PORT", vars.port);
};
