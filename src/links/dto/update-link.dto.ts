import { z } from 'zod';

export const updateLinkSchema = z.object(
  {
    link: z.string({ required_error: 'Link is required' }).url().optional(),
    slug: z.string().max(25, 'Slug must not exceed 25 characters').optional(),
  },
  { required_error: 'Body is required' },
);

export type UpdateLinkDto = z.infer<typeof updateLinkSchema>;
