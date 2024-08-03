import * as zod from 'zod'

import {
  XOrcaContractInfer,
  XOrcaSimpleContract,
  XOrcaBaseContract,
} from '../src'

const contract1 = new XOrcaBaseContract({
  accepts: {
    type: 'cmd.anthropic.completions',
    schema: zod.object({
      text: zod.string()
    })
  },
  emits: {
    'evt.anthropic.completions.success': zod.object({
      responses: zod.string().array()
    })
  }
})

const contract = new XOrcaSimpleContract({
  type: 'openai.completions',
  schema: zod.object({}),
  emits: zod.object({})
})


type TContract = XOrcaContractInfer<typeof contract>
type TContract1 = XOrcaContractInfer<typeof contract1>