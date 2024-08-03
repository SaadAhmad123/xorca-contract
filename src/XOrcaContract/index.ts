import * as zod from 'zod';
import { IXOrcaContract } from './types';

/**
 * Class representing an XOrca contract.
 * @template TAcceptType - The type of the accepted input.
 * @template TAcceptSchema - The Zod schema for validating the accepted input.
 * @template TEmit - A record of Zod schemas for emitted outputs.
 */
export default class XOrcaContract<
  TAcceptType extends string,
  TAcceptSchema extends zod.ZodTypeAny,
  TEmit extends Record<string, zod.ZodTypeAny>,
> implements IXOrcaContract<TAcceptType, TAcceptSchema, TEmit>
{
  /** Name of the contract */
  name: string;

  /** Optional description of the contract */
  description: string | undefined;

  /** Specification of the accepted input */
  accepts: { type: TAcceptType; schema: TAcceptSchema };

  /** A record of Zod schemas for emitted outputs */
  emits: TEmit;

  /**
   * Creates an instance of XOrcaContract.
   * @param {IXOrcaContract<TAcceptType, TAcceptSchema, TEmit>} params - The parameters for initializing the contract.
   */
  constructor(params: IXOrcaContract<TAcceptType, TAcceptSchema, TEmit>) {
    this.name = params.name || `XOrcaContract<${params.accepts.type}>`;
    this.description = params.description;
    this.accepts = params.accepts;
    this.emits = params.emits;
  }
}
