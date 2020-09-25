import { Column, columnTypes, Model, Table } from 'nestjs-objection';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ type: columnTypes.increments })
  public id: number;

  @Column({ type: columnTypes.string })
  public login: string;

  @Column({ type: columnTypes.string })
  public password: string;
}
