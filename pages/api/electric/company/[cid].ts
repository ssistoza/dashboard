import { ElectricBill, ElectricCompany } from '@prisma/client';
import HTTPMethod from 'http-method-enum';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../util/db';

export default async function billApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case HTTPMethod.GET:
      {
        const cid = requireCompanyId(req, res);
        if (cid <= 0) {
          return;
        }

        const bill = await prisma.electricCompany.findUnique({
          where: {
            id: cid,
          },
        });
        res.status(200).json(bill);
      }
      break;
    case HTTPMethod.PATCH:
      {
        const cid = requireCompanyId(req, res);
        if (cid <= 0) {
          return;
        }

        const body = req.body as Partial<ElectricCompany>;
        if (!body) {
          return res.status(400).send({
            message: 'A malformed request was found',
          });
        }

        const bill = await prisma.electricCompany.update({
          where: {
            id: cid,
          },
          data: {
            name: body.name ?? undefined,
          },
        });

        res.status(200).json(bill);
      }
      break;
    case HTTPMethod.DELETE:
      {
        const cid = requireCompanyId(req, res);
        if (cid <= 0) {
          return;
        }

        const bill = await prisma.electricBill.delete({
          where: {
            id: cid,
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

function requireCompanyId(req: NextApiRequest, res: NextApiResponse) {
  if (req.query?.cid) {
    const cid = +(req.query?.cid as string);
    if (isNaN(cid)) {
      res.status(400).send({
        message: `No electric bill found id is not a numeric id (${cid})`,
      });
      res.end();
      return -1;
    }
    return cid;
  }
}
