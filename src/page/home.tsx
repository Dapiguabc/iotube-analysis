import React, { useState }  from 'react';
import { Space, Row, Col } from 'antd';
import moment from 'moment' 
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import { Avatar, Typography} from 'antd';
import { AlignType } from 'rc-table/lib/interface'
import { useQuery } from '@apollo/client';

import { GET_LIQUIDITY, GET_TRANSATIONS } from "../query";
import TCard from '../component/Tcard/TCard'
import  WitnessCard from '../component/statisticCard/witness'
import { getTokenAddressList, getTokenInfo } from '../constant';
import BigNumber from 'bignumber.js';
import { getTokenAmountBN } from '../utils/math';
import TransactionCard from '../component/statisticCard/transaction';
import UserStatisCard from '../component/statisticCard/user';
import Liquidity from '../component/Liquidity';


const { Text } = Typography;
const { Statistic } = StatisticCard;

const tabList = [
  {
    key: "all",
    tab: "All"
  },
  {
    key: 'eth',
    tab: 'Eth',
  },
  {
    key: 'bsc',
    tab: 'Bsc',
  },
  {
    key: 'matic',
    tab: 'Matic',
  },
];
const columnsTopTokens = [
  {
    title: '#',
    render: (_text: String, _record: any, index: number) => index + 1,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: (text:String, record:any) => {
      return (
        <div>
          <Avatar style={{ marginRight: 2 }} size="small" src={record.logo}/>
          {`${text} (${record.symbol})`}
        </div>
      )
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    align: 'right' as AlignType
  },
  {
    title: 'PRICE CHANGE',
    dataIndex: 'priceChange',
    key: 'priceChange',
    align: 'right' as AlignType,
    render: (text: string) => {
      let isPositiveNum: boolean = Number.parseFloat(text) > 0; 
      return isPositiveNum?<Text type="danger">{`+${text}`}</Text> : <Text type="success">{`${text}`}</Text>;
    },
  },
  {
    title: 'LIQUIDITY',
    dataIndex: 'liquidity',
    key: 'liquidity',
    align: 'right' as AlignType
  }
];

const columnsTx = [
  {
    title: '#',
    width: 60,
    render: (_text: String, _record: any, index: number) => index + 1,
  },
  {
    title: 'Txn Hash',
    dataIndex: 'acthash',
    key: 'acthash',
    ellipsis: true,
    render: (text: string) => <a target="blank" href={`https://iotexscan.io/action/${text}`}>{text}</a>
  },
  {
    title: 'Block',
    dataIndex: 'blkHeight',
    key: 'blkHeight',
    render: (text: number) => <a target="blank" href={`https://iotexscan.io/block/${text}`}>{text}</a>
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 100,
  },
  {
    title: 'Platform',
    dataIndex: 'platform',
    key: 'platform',
    width: 100,
  },
  {
    title: 'Time',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (text: number) => moment(text*1000).fromNow(),
  },
  {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
    ellipsis: true,
    render: (text: number) => <a target="blank" href={`https://iotexscan.io/address/${text}`}>{text}</a>
  },
  {
    title: 'To',
    dataIndex: 'to',
    key: 'to',
    ellipsis: true,
  },
  {
    title: 'amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (text: number, record: any) => {
      let amount = getTokenAmountBN(new BigNumber(text), 18).toFixed(4);
      let tokenInfo = getTokenInfo(record.tokenAddress);
      return `${amount} (${tokenInfo.symbol})`;
    },
  },
];

const Home: React.FC = () => {
    const { loading: loading1, data: data1} = useQuery(GET_LIQUIDITY, {
      variables: {
        tokenAddressList: getTokenAddressList()
      }
    });

    const { loading: loading2, data: data2} = useQuery(GET_TRANSATIONS, {
      variables: {
        tokenAddressList: getTokenAddressList()
      }
    });

    const [responsive, setResponsive] = useState(false);
    return (
      <>  
        <Space size={16} direction="vertical" style={{width: "100%"}}>
            <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
              setResponsive(offset.width < 596);
            }}
          >
            <ProCard split={responsive ? 'horizontal' : 'vertical'}>
              <StatisticCard
                colSpan={responsive ? 24 : 6}
                title="Basic "
                statistic={{
                  value: 29,
                  suffix: "tokens",
                  description: <Statistic value=" "/>,
                }}
                footer={
                  <>
                    <Statistic value="10 Tokens" title="Eth" layout="horizontal" />
                    <Statistic value="13 Tokens" title="Bsc" layout="horizontal" />
                    <Statistic value="6 Tokens" title="Matic" layout="horizontal" />
                  </>
                }
              />
                <UserStatisCard/>
                <TransactionCard/>
                <WitnessCard/>
            </ProCard>
          </RcResizeObserver>
          <Liquidity/>
          <Row gutter={16}>
            <Col>
                <Row gutter={[0, 16]}>
                  <Col span={24}>
                    <TCard
                      cardTitle="Top tokens"
                      tabList={tabList}
                      tableColumns={columnsTopTokens}
                      loading={loading1}
                      dataSource={data1?.liquidity}
                      rowKey="name"
                    />
                  </Col>
                  <Col span={24}>
                    <TCard
                      cardTitle="Transaction"
                      tabList={tabList}
                      tableColumns={columnsTx}
                      loading={loading2}
                      dataSource={data2?.transtions}
                      rowKey="acthash"
                    />
                  </Col>
                </Row>
            </Col>
          </Row>
        </Space>
      </>
    )
} 

export default Home;