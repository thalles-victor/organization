import { v4 } from 'uuid';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 10 });
const numberId = new ShortUniqueId({
  dictionary: 'number',
  length: 6,
});

export function defaultUniqueId() {
  return v4();
}

export function shortDefault(size: number = 10) {
  return uid.rnd(size);
}

export function shortTimesTampId(size: number = 32) {
  return uid.stamp(size);
}

export function recoverPasswordId() {
  return numberId.dict.join();
}
