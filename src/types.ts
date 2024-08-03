import * as zod from 'zod';
import { IXOrcaContract } from './XOrcaContract/types';

export type XOrcaSchemaRecordToUnion<T extends Record<string, unknown>> = {
  [K in keyof T]: {
    type: K;
    schema: T[K];
  };
}[keyof T];

export type XOrcaContractInfer<
  T extends IXOrcaContract<
    string,
    zod.ZodTypeAny,
    Record<string, zod.ZodTypeAny>
  >,
> = {
  name: T['name'];
  description: T['description'];
  accepts: {
    type: T['accepts']['type'];
    schema: zod.infer<T['accepts']['schema']>;
  };
  emits: {
    [K in keyof T['emits']]: zod.infer<T['emits'][K]>;
  };
  emitables: XOrcaSchemaRecordToUnion<{
    [K in keyof T['emits']]: zod.infer<T['emits'][K]>;
  }>;
};
