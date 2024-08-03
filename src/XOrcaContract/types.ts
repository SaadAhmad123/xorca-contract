import * as zod from 'zod';

export interface IXOrcaContract<
  TAcceptType extends string,
  TAcceptSchema extends zod.ZodTypeAny,
  TEmit extends Record<string, zod.ZodTypeAny>,
> {
  name?: string;
  description?: string;

  accepts: {
    type: TAcceptType;
    schema: TAcceptSchema;
  };

  emits: TEmit;
}
