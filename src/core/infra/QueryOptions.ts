type EntityFieldsNames<Entity> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof Entity]: Entity[P] extends Function ? never : P;
}[keyof Entity];

export interface FindOne<Entity> {
  select?: (keyof Entity)[];
  order?: {
    [P in EntityFieldsNames<Entity>]?: 'ASC' | 'DESC';
  };
  relations?: string[];
}

export interface FindMany<Entity> extends FindOne<Entity> {
  skip?: number;
  take?: number;
}
