import {S3Event} from "aws-lambda";
import {formatJSONResponse} from "@libs/api-gateway";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";

const csv = require('csv-parser');

const importProductsFile = async (event: S3Event) => {
    const {awsRegion, s3} = event.Records[0];

    const client = new S3Client({region: awsRegion});
    const command = new GetObjectCommand({Bucket: s3.bucket.name, Key: s3.object.key});

    const file = await client.send(command)

    file.Body.pipe(csv()).on('data', (data) => {
        console.log(data)
    })

    return formatJSONResponse({});
};

export const main = importProductsFile
