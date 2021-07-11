import { Statistic, StatisticCard } from '@ant-design/pro-card';
import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_TRANSATIONSTATIS_BY_PLATFORM } from '../../query';

const TransactionCard: React.FC = () => {

    const { data } = useQuery(GET_TRANSATIONSTATIS_BY_PLATFORM);
    
    return (
        <StatisticCard
            title= "Transaction"
            statistic={{
            value: data?.transationsStatisByPlatform.total,
            description: <Statistic title="24h" value="6.15%" trend="up" />,
            }}
            footer={
            <>
                {data?.transationsStatisByPlatform.data.map((item:any)=>{
                    let elem;
                    switch(item.platform){
                    case "eth":
                        elem = <Statistic value={item.txs} title="Transaction For Eth" layout="horizontal" />
                        break;
                    case "bsc":
                        elem = <Statistic value={item.txs} title="Transaction For Bsc" layout="horizontal" />
                        break;
                    case "matic":
                        elem = <Statistic value={item.txs} title="Transaction For Matic" layout="horizontal" />
                        break;
                    }
                    return elem;
                })}
            </>
            }
            >
        </StatisticCard>
    )
}

export default TransactionCard;