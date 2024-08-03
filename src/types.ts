import * as zod from 'zod';
import { IXOrcaContract } from './XOrcaContract/types';

type XOrcaSchemaRecordToDataUnion<T extends Record<string, unknown>> = {
  [K in keyof T]: {
    type: K;
    data: T[K];
  };
}[keyof T];

/**
 * Infers the contract to the data typescript data types
 */
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
    data: zod.infer<T['accepts']['schema']>;
  };
  emits: {
    [K in keyof T['emits']]: zod.infer<T['emits'][K]>;
  };
  emitables: XOrcaSchemaRecordToDataUnion<{
    [K in keyof T['emits']]: zod.infer<T['emits'][K]>;
  }>;
};
