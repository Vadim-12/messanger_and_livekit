import { Request, Response } from "express";
import { AccessToken, AccessTokenOptions, VideoGrant } from "livekit-server-sdk";
import { vars } from "../../../config/vars";

const createToken = (userInfo: AccessTokenOptions, grant: VideoGrant) => {
  const at = new AccessToken(vars.LK_API_KEY, vars.LK_SECRET_KEY, userInfo);

  at.addGrant(grant);

	console.log({at: at.toJwt()});
	console.log(vars.LK_API_KEY)
	console.log(vars.LK_SECRET_KEY)
  return at.toJwt();
};

export const getToken = async (req: Request, res: Response) => {
	try {
		const { name, roomName, identity, metadata } = req.query;

		if (typeof name !== 'string') {
			console.log('name', typeof name)
			throw new Error('Ошибка при выдаче токена');
		}
		if (typeof roomName !== 'string') {
			console.log(typeof roomName)
			throw new Error('Можем выдать токен только к одной комнате');
		}
		if (typeof identity !== 'string') {
			console.log(typeof identity)
			throw new Error('Можем выдать токен только для одного пользователя');
		}
		if (typeof metadata !== 'string' && typeof metadata !== 'undefined') {
			console.log('metadata', typeof metadata)
			throw new Error('Ошибка при выдаче токена');
		}
	
		const grant: VideoGrant = {
			room: roomName,
			roomJoin: true,
			canPublish: true,
			canPublishData: true,
			canSubscribe: true
		};
	
		const token = createToken({identity, name, metadata}, grant);
	
	
		res.json({identity, AccessToken: token});
	} catch (e) {
		res.statusMessage = (e as Error).message;
    res.status(500).end();
	}
};
