# :sparkles: About

This project was bootstrapped to supply an analytics dashboard for Iotube which
is a cross-chain tool on Iotex.

You can view the demo at https://iotube-analysis.herokuapp.com/. Also, the data need time to auto collect as a result of the limit from the grpc API. 

## :zap:“: Datasource
The data of Iotube is sorted into two parts: inflow and outflow.
The inflow means that tokens were transformed into Iotex network as well as the outflow 
means that tokens flowed out of the Iotex network to other networks.

1.How to get the inflow data?

- Inflow: Parse the actions data of the validator contract:
`submit(address,address,uint256,address,address,uint256,bytes)`
`submit(address[],address[],uint256[],address[],address[],uint256[],bytes)`

- Outflow: Parse the logs data of the cashier contract by the topic:
`Receipt(address,uint256,address,address,uint256,uint256) => 85425e130ee5cbf9eea6de0d309f1fdd5f7a343aeb20ad4263f3e1305fd5b919`

2.How to determine the network where tokens flow out or flow in?

You can get the cashier address from the inflow/outflow data to ensure the network.

3.How to count the num of users who have used Iotube？

To extract the address of users from inflow/outflow data.

4.How to get num of the witnessers who are playing an important role in Iotube?

You can call the readContract method of the grpc API to get the num.

## :pencil:Others
·Token price is from [Coingecko](https://www.coingecko.com/zh)

·The graphql APi endpoint is /api-gateway/

## :hammer: Usage
In order to install dependencies, you should run: 

### `yarn build`

For the fontend, you can compile it by run:

### `yarn build`

For the backend, you can run:

### `ts-node ./src/server`

The port of the backend is process.env.PORT || 5557

Then you should copy the fontend into the ./src/server/app.

Finally, you can open http://yoururl:yourport to view the dashboard.
