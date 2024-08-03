import { XOrcaContract, XOrcaSimpleContract } from '../src';
import * as zod from 'zod';

const contract = new XOrcaSimpleContract({
  type: 'openai.completions',
  schema: zod.object({}),
  emits: zod.object({}),
});

//const c = new XOrcaContract

type X = zod.infer<(typeof contract.emits)['evt.openai.completions.error']>;
