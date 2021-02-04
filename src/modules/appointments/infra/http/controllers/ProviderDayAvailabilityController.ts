/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

type IMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month, day } = request.query;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );
    const availability = await listProviderDayAvailability.execute({
      provider_id,
      year: Number(year),
      month: Number(month) as IMonth,
      day: Number(day),
    });

    return response.json(availability);
  }
}
