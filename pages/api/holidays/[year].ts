import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import middleware from '../../../src/middleware';

interface HolidayOrigin {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  type: string;
}

export interface Holiday extends HolidayOrigin {
  id: number;
}

// CORS制限を外す為にProxyする
export default middleware(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    res.setHeader('Content-Type', 'application/json');

    // 外部のリクエストを取得
    const { year } = req.query;
    const result = await fetch(`https://date.nager.at/api/v2/PublicHolidays/${year}/JP`);
    if (result.ok) {
      // json化
      const holidays = (await result.json()) as HolidayOrigin[];
      // FEにjson形式でレスポンスを返却
      const response: Holiday[] = holidays.map((h, idx) => ({ id: idx, ...h }));
      res.statusCode = 200;
      res.json(response);
    }

    res.statusCode = 500;
    res.end();
  },
);
