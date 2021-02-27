import UniqueEntityID from '@core/domain/UniqueEntityID';
import Entity from '@core/domain/Entity';

export default class UserId extends Entity<null> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }
}
