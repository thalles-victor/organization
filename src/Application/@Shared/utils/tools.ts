import { InternalServerErrorException } from '@nestjs/common';

export function splitKeyAndValue(param: object) {
  const [key, value] = Object.entries(param)[0];

  if (!key || !value) {
    console.error('require key and value');
    throw new InternalServerErrorException();
  }

  return [key, value];
}
