import { EntityManager, Repository, getManager } from 'typeorm';
import { getNamespace } from 'cls-hooked';

export default abstract class BaseRepository<T> {
  protected abstract getRepository(): Repository<T>;

  protected set repository(repository: Repository<T>) {
    this.repository = repository;
  }

  protected get repository(): Repository<T> {
    return this.getRepository();
  }

  protected get EntityManager(): EntityManager {
    const context = getNamespace('__cls__context');

    if (context && context.active) {
      const transactionalEntityManager = context.get('__typeOrm__transactionalEntityManager');

      if (transactionalEntityManager) {
        // At this point here we have successfully found a transactional EntityManager
        // that was previously saved within the current context.

        // We now use this EntityManager to work.
        return transactionalEntityManager;
      }
    }

    // No specific transactional EntityManager has been found : we use the global EntityManager to work.
    return getManager();
  }
}
