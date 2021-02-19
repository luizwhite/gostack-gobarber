import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

/* eslint-disable semi */
export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
