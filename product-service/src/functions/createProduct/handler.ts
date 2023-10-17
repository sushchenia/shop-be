import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {v4 as uuidv4} from 'uuid';
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand} from "@aws-sdk/lib-dynamodb";
import {CreateProductRequest} from "../../models/products";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const createProduct: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    const {title, price, description, count} = event.body as CreateProductRequest

    const uuid = uuidv4();
    const productCommand = new PutCommand({
        TableName: "products",
        Item: {
            id: uuid,
            title,
            price,
            description
        },
    });

    const stockCommand = new PutCommand({
        TableName: "stocks",
        Item: {
            product_id: uuid,
            count,
        },
    });

    try {
        await docClient.send(productCommand);
        await docClient.send(stockCommand);
        return formatJSONResponse({});
    } catch (error) {
        return formatJSONResponse({
            content: error,
        });
    }
};

export const main = middyfy(createProduct);
