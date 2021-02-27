import { UpdatePartial } from '@utils/types/types';

interface Repository<T> {
  insert(t: T): Promise<T>;
  update(t: UpdatePartial<T>): Promise<T>;
}

export default Repository;
