import { parseBoolean } from '../utils/parsers/parseBoolean';
import { parseNumber } from '../utils/parsers/parseNumber';
import { parseString } from '../utils/parsers/parseString';

export const vars = {
  env: parseString(import.meta.env.NODE_ENV, 'develop'),
  logs: import.meta.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  isLocal: parseBoolean(import.meta.env.IS_LOCAL, false),
  port: parseNumber(import.meta.env.VITE_PORT, 3001),
  SERVER_URL: parseString(
    import.meta.env.VITE_SERVER_URL,
    'http://localhost:5001'
  ),
  LK_API_URL: parseString(import.meta.env.VITE_LK_API_URL, 'ws://localhost:7880'),
  LK_API_KEY: parseString(import.meta.env.VITE_LK_API_KEY, 'apikey'),
  LK_SECRET_KEY: parseString(import.meta.env.VITE_LK_SECRET_KEY, 'apisecret')
};
