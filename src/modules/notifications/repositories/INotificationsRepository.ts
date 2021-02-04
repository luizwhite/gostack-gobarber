import ICreateNotificationsDTO from './ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

/* eslint-disable semi */
export default interface INotificationsRepository {
  create(data: ICreateNotificationsDTO): Promise<Notification>;
}
