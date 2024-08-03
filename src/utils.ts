import * as zod from 'zod';

/**
 * Schema for XOrca error objects.
 *
 * This schema defines the structure of error objects used in the XOrca system.
 * It uses Zod for runtime type checking and validation.
 */
export const XOrcaErrorSchema = zod.object({
  errorName: zod.string().optional().describe('The name of the error.'),
  errorMessage: zod
    .string()
    .optional()
    .describe('A descriptive message for the error.'),
  errorStack: zod.string().optional().describe('The stack trace of the error.'),
});
