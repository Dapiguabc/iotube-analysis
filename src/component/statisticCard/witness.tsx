import React from 'react';
import { Column } from '@ant-design/charts';
import { useQuery } from '@apollo/client';
import { GET_WITNNESS } from '../../query';
import { Statistic, StatisticCard } from '@ant-design/pro-card';

const WitnessCard: React.FC = () => {
    const { data } = useQuery(GET_WITNNESS, {
        variables: {
            "type": "month"
        }
    }); 

    var config = {
        height: 60,
        autoFit: true,
        data: data?data.witnness.data:[],
        xField: 'x',
        yField: 'y',
        yAxis: {
            // @ts-ignore
            label: null,
        },
        smooth: true,
    };
    return (
        <StatisticCard
            title= "Witnessers"
            statistic={{
                value: data?data.witnness.total:0,
                description: <Statistic title="24h" value={data?data.witnness.total24changed:'0%'} trend={data?.witnness.total24changed.startsWith("-")?"down": "up"} />,
            }}
            chart={<Column  {...config} />}
        />
    )
};

export default WitnessCard;
