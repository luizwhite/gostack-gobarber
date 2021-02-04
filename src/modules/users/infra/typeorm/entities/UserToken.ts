import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

// KISS - Keep It Simple & Stupid

@Entity('user_tokens')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date; // eslint-disable-line camelcase

  @UpdateDateColumn()
  updated_at: Date; // eslint-disable-line camelcase
}

export default UserToken;
