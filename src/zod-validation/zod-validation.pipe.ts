import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.Schema) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const errors = result.error.issues
        .map((error) => error.message)
        .join(', ');

      throw new BadRequestException('Validation failed', {
        cause: result.error,
        description: errors,
      });
    }

    return result.data;
  }
}
