import React from 'react';
import { Statistic, StatisticCard } from '@ant-design/pro-card';
import { useQuery } from '@apollo/client';
import { GET_USERSNUM } from '../../query';

const UserStatisCard: React.FC = () => {
    const { data } = useQuery(GET_USERSNUM);
    return (
        <StatisticCard
            title = "User"
            statistic={{
                value: data?.usersNum.total,
                description: <Statistic value=" "/>,
            }}
            footer={
            <>  
                {data?.usersNum.data.map((item:any)=>{
                    let elem;
                    switch(item.platform){
                    case "eth":
                        elem = <Statistic value={item.num} title="Num Of User On Eth" layout="horizontal" />
                        break;
                    case "bsc":
                        elem = <Statistic value={item.num} title="Num Of User On Bsc" layout="horizontal" />
                        break;
                    case "matic":
                        elem = <Statistic value={item.num} title="Num Of User On Matic" layout="horizontal" />
                        break;
                    }
                    return elem;
                })}
            </>
            }
        />
    )
}

export default UserStatisCard;