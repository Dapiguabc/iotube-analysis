import { Row, Col, Card, List, Avatar, Typography, Progress} from 'antd';

const { Text } = Typography;

const data = [
    {
      name: 'Eth',
    },
    {
      name: 'Bnb',
    },
    {
      name: 'Bitcoin',
    },
    {
      name: 'DogeCoin',
    },
  ];
const RankCard: React.FC = () => {
    return (
        <Card hoverable>
            <List
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                      <Row align="middle" style={{width: "100%"}}>
                        <Col span={4}>
                          <Avatar>{index + 1}</Avatar>
                        </Col>
                        <Col span={8}>
                          <Text strong>{item.name}</Text>
                        </Col>
                        <Col span={12}>
                          <Progress percent={30} size="small" showInfo={false}/>
                        </Col>
                      </Row>
                    </List.Item>
                )}
            />
        </Card>
    );
}

export default RankCard;