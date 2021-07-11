import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import moment from 'moment';
import { Progress, Line} from '@ant-design/charts';
import { Table } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_TX_STATIS_BY_PLATFORM } from '../query';

const { Statistic } = StatisticCard;

export const LLine: React.FC<{data:any}> = ({data}) => {

  var config = {
    data: data,
    xField: 'x',
    yField: 'y',
    seriesField: 'platform',
    yAxis: {
      label: {
        formatter: function formatter(v: string) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    color: ['#1979C9', '#D62A0D', '#FAA219'],
  };
  return <Line {...config} />;
};

export const MiniProgress: React.FC<{value:any}> = ({value}) => {
  var config = {
    height: 100,
    width: 300,
    autoFit: false,
    percent: value,
    barWidthRatio: 0.2,
    color: ['#1DA57A', '#E8EDF3'],
  };
  return <Progress {...config} />;
};

const columns = [
  {
    title: 'ChainName',
    dataIndex: 'platform',
    key: 'platform',
  },
  {
    title: 'Proportion',
    dataIndex: 'proportion',
    key: 'proportion',
    render: (text:any)=>{
      return <MiniProgress value={text}/>
    }
  },
  {
    title: 'Txs num',
    dataIndex: 'txs',
    key: 'txs',
  },
]

const Liquidity: React.FC =  () => {
  
  const [responsive, setResponsive] = useState(false);
  const { loading, data } = useQuery(GET_TX_STATIS_BY_PLATFORM);

  const getTableData = useMemo(()=>{
    return data?data.transtionsStatisByPlatform24H.data:[];
  }, [data])

  const getLineData = useMemo(()=>{
    return data?data.transtionsStatisByPlatformWeek.data:[];
  }, [data])
  
  const getTxsNum = useCallback((time, type) => {
    if(!data){
      return 0;
    }
    for(var i=0;i<data.txNumByType.data.length;i++){
      if(data.txNumByType.data[i].type===type && data.txNumByType.data[i].time===time){
        return data.txNumByType.data[i].num
      }
    }
  }, [data]);


  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="Overview"
        extra={moment().format("YYYY-MM-DD")}
        split={responsive ? 'horizontal' : 'vertical'}
        headerBordered
        bordered
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: 'Outflow Transactions Yeaterday',
                  value: getTxsNum("yeaterday", "outflow"),
                }}
              />
              <StatisticCard
                statistic={{
                  title: 'Inflow Transactions This Month',
                  value: getTxsNum("month", "outflow"),
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: 'Outflow Transactions Yeaterday',
                  value: getTxsNum("yeaterday", "inflow"),
                }}
              />
              <StatisticCard
                statistic={{
                  title: 'Inflow Transactions This Month',
                  value: getTxsNum("month", "inflow"),
                }}
              />
            </ProCard>
          </ProCard>
          <StatisticCard
            title="Transaction in 7 days"
            chart={
              <LLine data={getLineData}/>
            }
          />
        </ProCard>
        <StatisticCard
          title="Transaction Proportion 24H"
          chart={
            <Table style={{fontSize: "bold"}} pagination={false} dataSource={getTableData} columns={columns}/>
          }
        />
      </ProCard>
    </RcResizeObserver>
  );
};

export default Liquidity;