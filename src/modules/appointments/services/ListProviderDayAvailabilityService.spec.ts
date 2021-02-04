// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '1234546789',
      date: new Date(2021, 0, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '1234546789',
      date: new Date(2021, 0, 20, 13, 0, 0),
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 0, 20, 10, 0, 0).getTime());

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 1,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 12, available: false },
        { hour: 13, available: false },
        { hour: 14, available: true },
      ]),
    );
  });
});
