import Joi from 'joi';
import { NAME_MAX_LENGTH } from '../../const/hello';

export const name = () => Joi.string().max(NAME_MAX_LENGTH);
