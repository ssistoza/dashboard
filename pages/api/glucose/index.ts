import { ElectricBill, Glucose } from '@prisma/client';
import HTTPMethod from 'http-method-enum';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';
import { isAuthorizedByApi } from '../../../lib/isAuthorized';

const MAX_ITEMS_TO_LOAD = 10;

export default async function glucoseApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // isAuthorizedByApi(req, res);

  switch (req.method) {
    case HTTPMethod.GET:
      let skip = 0;
      if (req.query?.page) {
        const page = parseInt(req.query?.page as string, 10);
        if (page >= 2) {
          skip = (page - 1) * MAX_ITEMS_TO_LOAD;
        }
      }

      const glucoseLevels = await prisma.glucose.findMany({
        orderBy: {
          date: 'asc',
        },
        take: MAX_ITEMS_TO_LOAD,
        skip,
      });

      res.status(200).json(glucoseLevels);
      break;
    case HTTPMethod.POST:
      const data = req.body as Partial<Glucose>;
      if (data.date && data.level) {
        const newBill = await prisma.glucose.create({
          data: {
            date: new Date(data.date),
            level: data.level,
          },
        });

        res.status(201).json(newBill);
      } else {
        res.status(400).send({
          message:
            'A new glucose record could not be created. Form Data is incomplete or improperly set.',
        });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).send({
        message: `The following ${req.method} request is not allowed.`,
      });
      break;
  }
}
