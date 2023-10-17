import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, QueryCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getProductsById: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    const productCommand = new QueryCommand({
        TableName: "products",
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {':id': event.pathParameters.id}
    });

    const stockCommand = new QueryCommand({
        TableName: "stocks",
        KeyConditionExpression: 'product_id = :id',
        ExpressionAttributeValues: {':id': event.pathParameters.id}
    });

    try {
        const productResult = await docClient.send(productCommand);
        const stockResult = await docClient.send(stockCommand);
        const product = productResult.Items[0]
        const stock = stockResult.Items[0]

        if (product && stock) {
            return formatJSONResponse({
                content: {...product, count: stock.count},
            });
        } else {
            return formatJSONResponse({
                error: 'Product not found',
            }, 404);
        }
    } catch (error) {
        return formatJSONResponse({
            content: error,
        });
    }
};

export const main = middyfy(getProductsById);
