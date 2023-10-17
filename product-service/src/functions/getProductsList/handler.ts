import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, ScanCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    console.log(event)
    const productsCommand = new ScanCommand({
        TableName: "products",
    });

    const stocksCommand = new ScanCommand({
        TableName: "stocks",
    })

    try {
        const productsResponse = await docClient.send(productsCommand);
        const stocksResponse = await docClient.send(stocksCommand);

        return formatJSONResponse({
            content: productsResponse.Items.map((product, index) => ({
                ...product,
                count: stocksResponse.Items[index].count
            }))
        });
    } catch (error) {
        return formatJSONResponse({
            content: error,
        });
    }
};

export const main = middyfy(getProductsList);
