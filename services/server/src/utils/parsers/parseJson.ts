export const parseJson = (str: string | undefined, def: object): object => {
	try {
		return JSON.parse(str as string);
	} catch (e) {
		return def;
	}
};
