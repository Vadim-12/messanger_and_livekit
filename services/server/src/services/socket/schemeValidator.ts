import { Socket } from 'socket.io';
import { Schema } from 'joi';

export const schemeValidator = (scheme: Schema) => (
	async (socket: Socket, data: any) => {
		const result = scheme.validate(data);

		if (result.error) {
			throw result.error;
		}
	}
);
