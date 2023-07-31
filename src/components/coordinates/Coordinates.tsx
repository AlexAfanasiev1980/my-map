import React, { useEffect, useMemo, useState } from 'react';
import { data } from '../../shared/mock';
import { Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch } from '../../redux/hooks';
import { coordinatesActions } from '../../redux/coordinates/slice';
import { DataType, IRoute } from '../../shared/interfaces/interfaces';

function Route({ routes }: { routes: IRoute[] }): JSX.Element {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const dispatch = useAppDispatch();

  // запись маршрута в store
  const handleSeeRoute = (key: React.Key): void => {
    const route = dataSource.filter((item) => item.key === key)[0];
    const points: number[][] = [];
    for (key in route) {
      if (/^point/gi.test(key)) {
        points.push(route[key].split(', ').map((el) => Number(el)));
      }
    }
    dispatch(coordinatesActions.setCoordinatesAsync(points));
  };

  // определение количества точек маршрута
  const countPoints = useMemo(() => {
    let count = 0;
    routes.forEach((route) => {
      if (route.points.length > count) {
        count = route.points.length;
      }
    });
    return count;
  }, [routes]);

  // формирование заголовков таблицы
  const columnsTable = useMemo(() => {
    const columns: ColumnsType<DataType> = [
      {
        title: 'Маршрут',
        dataIndex: 'name',
        key: 'name',
      },
    ];
    for (let i = 1; i <= countPoints; i++) {
      columns.push({
        title: `Точка ${i} (lat, lng)`,
        dataIndex: `point${i}`,
        key: `point${i}`,
      });
    }
    columns.push({
      title: 'Действие',
      dataIndex: 'action',
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Показать маршрут?"
            onConfirm={() => handleSeeRoute(record.key)}
          >
            <a href="#">Показать маршрут</a>
          </Popconfirm>
        ) : null,
    });
    return columns;
  }, [countPoints, dataSource]);

  // формирование данных таблицы
  useEffect(() => {
    const routesArr = routes.map((route, index) => {
      const points: DataType = {
        key: `${index + 1}`,
        name: route.name,
      };
      route.points.forEach((point, index) => {
        const property = `point${index + 1}`;

        points[property] = `${point.join(', ')}`;
      });

      return points;
    });
    setDataSource(routesArr);
  }, [routes]);

  return (
    <Table
      caption={'Маршруты передвижения'}
      dataSource={dataSource}
      columns={columnsTable}
      size="small"
      bordered
    />
  );
}

function Coordinates(): JSX.Element {
  return (
    <div>
      <Route routes={data} />;
    </div>
  );
}

export default Coordinates;
