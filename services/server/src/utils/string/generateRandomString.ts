import crypto from 'crypto';

export const generateRandomString = (length?: number): string => {
	if (!length) {
		return crypto.randomUUID();
	}

	let res = '';
	while (res.length !== length) {
		const guid = crypto.randomUUID();
		if (guid.length + res.length > length) {
			res += guid.substring(0, length - res.length);
		} else {
			res += guid;
		}
	}
	return res;
};
