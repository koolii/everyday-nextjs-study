import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Holiday } from './api/holidays/[year]';

// Tip
// apiに切り出しているが、 getServerSideProps()にて同様の処理を行うことで
// 同一の処理を行うことができる

const HolidayPage: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const currentYear = useMemo(() => {
    const day = dayjs();
    return day.year();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await fetch(`/api/holidays/${currentYear}`);
      if (result.status === 200) {
        const data = (await result.json()) as Holiday[];
        setHolidays(data);
      }
    })();
  }, [currentYear]);

  return (
    <div>
      {holidays.map((h) => (
        <div key={h.id}>
          {h.date}: {h.localName}
        </div>
      ))}
    </div>
  );
};

export default HolidayPage;
