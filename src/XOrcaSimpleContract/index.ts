import * as zod from 'zod';
import { IXOrcaSimpleContract, XOrcaSimpleContractEmit } from './types';
import { XOrcaErrorSchema } from '../utils';
import XOrcaBaseContract from '../XOrcaBaseContract';

/**
 * Class representing a simple XOrca contract.
 * @template TType - The type of the contract.
 * @template TSchema - The Zod schema for the contract's input.
 * @template TEmit - The Zod schema for the contract's output.
 */
export default class XOrcaSimpleContract<
  TType extends string,
  TSchema extends zod.ZodTypeAny,
  TEmit extends zod.ZodTypeAny,
> extends XOrcaBaseContract<
  `cmd.${TType}`,
  TSchema,
  XOrcaSimpleContractEmit<TType, TEmit, typeof XOrcaErrorSchema>
> {

  parameters: IXOrcaSimpleContract<TType, TSchema, TEmit>
  /**
   * Creates an instance of XOrcaSimpleContract.
   * @param {IXOrcaSimpleContract<TType, TSchema, TEmit>} params - The parameters for the contract.
   */
  constructor(params: IXOrcaSimpleContract<TType, TSchema, TEmit>) {
    super({
      name: `XOrcaSimpleContract<${params.type}>`,
      description: params.description,
      accepts: {
        type: `cmd.${params.type}`,
        schema: params.schema,
      },
      emits: {
        [`evt.${params.type}.success`]: params.emits,
        [`evt.${params.type}.error`]: XOrcaErrorSchema,
      } as XOrcaSimpleContractEmit<TType, TEmit, typeof XOrcaErrorSchema>,
    });

    this.parameters = { ...params }
  }
}
