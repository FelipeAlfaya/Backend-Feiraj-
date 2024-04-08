/* eslint-disable prettier/prettier */
import { Request } from 'express';

export interface IRequest extends Request {
  context: Map<string, unknown>;
  set: (key: string, value: unknown) => void;
  get: <T>(key: string) => T;
}
