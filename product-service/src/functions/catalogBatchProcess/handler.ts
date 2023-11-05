import {SQSEvent} from "aws-lambda";
import {v4 as uuidv4} from 'uuid';
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand} from "@aws-sdk/lib-dynamodb";
import {CreateProductRequest} from "../../models/products";
import {SNSClient, PublishCommand} from '@aws-sdk/client-sns';

const clientDynamoDB = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(clientDynamoDB);

const catalogBatchProcess = async (event: SQSEvent) => {
    try {
        for (const {body} of event.Records) {
            const {title, price, description, count} = JSON.parse(body) as CreateProductRequest
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
                    count: Number(count),
                },
            });
            await docClient.send(productCommand);
            await docClient.send(stockCommand);
        }

        const snsClient = new SNSClient({region: 'eu-west-1'});
        const publishCommand = new PublishCommand({
            TopicArn: process.env.SNS_TOPIC,
            Message: `Added ${event.Records.reduce((productsString, {body}) => {
                return `${productsString} + ${body}\n`
            }, '')} products to the data base`,
        });
        await snsClient.send(publishCommand)

    } catch (error) {
        console.log(error)
    }
};

export const main = catalogBatchProcess
