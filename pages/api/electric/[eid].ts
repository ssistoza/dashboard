import { ElectricBill } from '@prisma/client';
import HTTPMethod from 'http-method-enum';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';

export default async function billApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case HTTPMethod.GET:
      {
        const eid = requireElectricId(req, res);
        if (eid <= 0) {
          return;
        }

        const bill = await prisma.electricBill.findUnique({
          where: {
            id: eid,
          },
        });
        res.status(200).json(bill);
      }
      break;
    case HTTPMethod.PATCH:
      {
        const eid = requireElectricId(req, res);
        if (eid <= 0) {
          return;
        }

        const body = req.body as Partial<ElectricBill>;
        if (!body) {
          return res.status(400).send({
            message: 'A malformed request was found',
          });
        }

        const bill = await prisma.electricBill.update({
          where: {
            id: eid,
          },
          data: {
            companyId: body.companyId ?? undefined,
            cost: body.cost ?? undefined,
            date: body.date ?? undefined,
            usage: body.usage ?? undefined,
          },
        });

        res.status(200).json(bill);
      }
      break;
    case HTTPMethod.DELETE:
      {
        const eid = requireElectricId(req, res);
        if (eid <= 0) {
          return;
        }

        const bill = await prisma.electricBill.delete({
          where: {
            id: eid,
          },
        });

        res.status(200).json(bill);
      }
      break;
    default:
      res.setHeader('Allow', [
        HTTPMethod.GET,
        HTTPMethod.PATCH,
        HTTPMethod.DELETE,
      ]);
      res.status(405).send({
        message: `The following ${req.method} request is not allowed.`,
      });
      break;
  }
}

function requireElectricId(req: NextApiRequest, res: NextApiResponse) {
  if (req.query?.eid) {
    const eid = +(req.query?.eid as string);
    if (isNaN(eid)) {
      res.status(400).send({
        message: `No electric bill found id is not a numeric id (${eid})`,
      });
      res.end();
      return -1;
    }
    return eid;
  }
}
