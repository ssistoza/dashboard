import { ElectricBill, ElectricCompany } from '@prisma/client';
import HTTPMethod from 'http-method-enum';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../util/db';

const MAX_ITEMS_TO_LOAD = 10;

export default async function companiesApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case HTTPMethod.GET:
      let skip = 0;
      if (req.query?.page) {
        const page = parseInt(req.query?.page as string, 10);
        if (page >= 2) {
          skip = (page - 1) * MAX_ITEMS_TO_LOAD;
        }
      }

      const companies = await prisma.electricCompany.findMany({
        orderBy: {
          name: 'asc',
        },
        take: MAX_ITEMS_TO_LOAD,
        skip,
      });

      res.status(200).json(companies);
      break;
    case HTTPMethod.POST:
      const data = req.body as Partial<ElectricCompany>;
      if (data.name) {
        const newBill = await prisma.electricCompany.create({
          data: {
            name: data.name,
          },
        });

        res.status(201).json({ id: newBill.id, name: newBill.name });
      } else {
        res.status(400).send({
          message:
            'A new electric company could not be created. Form Data is incomplete or improperly set.',
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
