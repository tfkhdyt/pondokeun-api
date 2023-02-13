import { z } from 'zod';
import { createLinkSchema } from './create-link.dto';

export const updateLinkSchema = createLinkSchema;

export type UpdateLinkDto = z.infer<typeof updateLinkSchema>;
