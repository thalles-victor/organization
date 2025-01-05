import * as jwt from 'jsonwebtoken';
import { ENV } from '../env';
import { UnauthorizedException } from '@nestjs/common';
import { PayloadType } from '../types';

export async function genJWTAccess(payload: PayloadType) {
  const duration = '24h';
  const expiresInMilliseconds = 24 * 60 * 60 * 1000; // 86400000 mile seconds
  const expiresInUnixEpoch = Date.now() + expiresInMilliseconds;

  const token = jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: '24h',
  });

  return {
    token,
    duration,
    expiresInMilliseconds,
    expiresInUnixEpoch,
  };
}

export async function verifyJWTAccess(jwtAccess: string): Promise<PayloadType> {
  try {
    const payload = jwt.verify(jwtAccess, ENV.JWT_SECRET);

    return payload as PayloadType;
  } catch {
    throw new UnauthorizedException();
  }
}

export async function jwtAlreadyExpireBaseUnixEpoch(
  expiresInUnixEpoch: number,
) {
  if (Date.now() > expiresInUnixEpoch) {
    return true;
  }

  return false;
}
