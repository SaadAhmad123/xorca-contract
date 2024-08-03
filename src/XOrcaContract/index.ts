import * as zod from 'zod';
import { IXOrcaContract } from './types';

type XOrcaSchemaRecordToUnion<T extends Record<string, unknown>> = {
  [K in keyof T]: {
    type: K;
    schema: T[K];
  };
}[keyof T];

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
> {
  name: string;
  description: string | undefined;
  accepts: { type: TAcceptType; schema: TAcceptSchema };
  emits: TEmit;
  emitables: XOrcaSchemaRecordToUnion<TEmit>[];

  constructor(params: IXOrcaContract<TAcceptType, TAcceptSchema, TEmit>) {
    this.name = params.name || `XOrcaContract<${params.accepts.type}>`;
    this.description = params.description;
    this.accepts = params.accepts;
    this.emits = params.emits;
    this.emitables = Object.entries(params.emits).map(([key, value]) => ({
      type: key,
      schema: value,
    })) as XOrcaSchemaRecordToUnion<TEmit>[];
  }
}
