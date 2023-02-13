import { z } from 'zod';

export const createLinkSchema = z.object(
  {
    link: z.string({ required_error: 'Link is required' }).url(),
    slug: z.string().max(25, 'Slug must not exceed 25 characters').optional(),
  },
  { required_error: 'Body is required' },
);

export type CreateLinkDto = z.infer<typeof createLinkSchema>;
