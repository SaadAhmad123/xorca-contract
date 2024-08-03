import * as zod from 'zod'
import XOrcaContract from '../XOrcaContract';
import { XOrcaErrorSchema } from '../utils'
import { IXOrcaContract } from '../XOrcaContract/types';

export default class XOrcaBaseContract<
  TAcceptType extends string,
  TAcceptSchema extends zod.ZodTypeAny,
  TEmit extends Record<string, zod.ZodTypeAny>,
> extends XOrcaContract<
  TAcceptType,
  TAcceptSchema,
  TEmit & {
    [key in `sys.${TAcceptType}.error`]: typeof XOrcaErrorSchema
  }
> {

  constructor(params: IXOrcaContract<TAcceptType, TAcceptSchema, TEmit>) {
    super({
      ...params,
      name: params.name || `XOrcaBaseContract<${params.accepts.type}>`,
      emits: {
        ...params.emits,
        [`sys.${params.accepts.type}.error`]: XOrcaErrorSchema,
      }
    })
  }

}