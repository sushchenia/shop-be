import {S3Event} from "aws-lambda";
import {formatJSONResponse} from "@libs/api-gateway";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {SQSClient, SendMessageCommand} from '@aws-sdk/client-sqs';

const csv = require('csv-parser');

const importProductsFile = async (event: S3Event) => {
    const {awsRegion, s3} = event.Records[0];

    const clientS3 = new S3Client({region: awsRegion});
    const clientSQS = new SQSClient({region: awsRegion})
    const commandS3 = new GetObjectCommand({Bucket: s3.bucket.name, Key: s3.object.key});

    const file = await clientS3.send(commandS3)

    for await (const product of file.Body.pipe(csv())) {
        try {
            console.log(`Start SQS message send: ${JSON.stringify(product)}`);
            await clientSQS.send(
                new SendMessageCommand({
                    QueueUrl: 'https://sqs.eu-west-1.amazonaws.com/421819764397/catalogItemsQueue',
                    MessageBody: JSON.stringify(product),
                })
            );
            console.log(`End SQS message send: ${JSON.stringify(product)}`);
        } catch (error) {
            console.log(`Error in SQS message: ${JSON.stringify(error)}`);
        }
    }

    return formatJSONResponse({});
};

export const main = importProductsFile
