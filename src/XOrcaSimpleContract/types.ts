import * as zod from 'zod';

/**
 * Interface representing a simple XOrca contract.
 * @template TType - The type of the contract.
 * @template TSchema - The Zod schema for the contract's input.
 * @template TEmit - The Zod schema for the contract's output.
 */
export interface IXOrcaSimpleContract<
  TType extends string,
  TSchema extends zod.ZodTypeAny,
  TEmit extends zod.ZodTypeAny,
> {
  type: TType;
  description?: string;
  schema: TSchema;
  emits: TEmit;
}

/**
 * Type representing the emit events for a simple XOrca contract.
 * @template TType - The type of the contract.
 * @template TSchema - The Zod schema for the contract's successful output.
 * @template TErrorSchema - The Zod schema for error outputs.
 */
export type XOrcaSimpleContractEmit<
  TType extends string,
  TSchema extends zod.ZodTypeAny,
  TErrorSchema extends zod.ZodTypeAny,
> = {
  [K in
    | `evt.${TType}.success`
    | `evt.${TType}.error`
    | `sys.${TType}.error`]: K extends `evt.${TType}.success`
    ? TSchema
    : TErrorSchema;
};
