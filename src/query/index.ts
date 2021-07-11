import gql from "graphql-tag";

export const GET_LIQUIDITY = gql`
  query liquidity($tokenAddressList: [String!]!){
 	liquidity(tokenAddressList: $tokenAddressList){
      	name
      	symbol
      	logo
      	liquidity
        liquidityChange
        price
        priceChange
    }
  }
`;

export const GET_TRANSATIONS = gql`
  query transtions{
    transtions{
        acthash
        type
        from
        to
        tokenAddress
        contractAddress
        amount
        platform
        blkHash
      	blkHeight
        timestamp
    }
  }
`;


export const GET_WITNNESS = gql`
  query witnness($type: String!){
    witnness(type: $type){
      total
      total24changed
      data{
        x
        y
      }
    }
  }
`;

export const GET_TRANSATIONSTATIS_BY_PLATFORM = gql`
query transactionStatisByPlatform{
    transationsStatisByPlatform{
      total
      data{
        platform
        txs
      }
    }
  }
`;

export const GET_USERSNUM = gql`
query usersNum{
  usersNum{
    total
    data{
      platform
      num
    }
  }
}
`;


export const GET_TX_STATIS_BY_PLATFORM = gql`
  query transtionsStatisByPlatform24H{
  transtionsStatisByPlatform24H{
    data{
      key
      txs
      platform
      proportion
    }
  }
  transtionsStatisByPlatformWeek{
    data{
      platform
      x
      y
    }
  }
  txNumByType{
      data{
        time
        type
        num
      }
    }
}
`;
