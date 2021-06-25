import { ElectricCompany } from '@prisma/client';

const companies: Omit<ElectricCompany, 'id'>[] = [
  {
    name: 'AES Indiana / IPL',
  },
  {
    name: 'Duke Energy',
  },
  {
    name: 'HELCO',
  },
  {
    name: 'HECO',
  },
  {
    name: 'MECO',
  },
];

export default companies;
