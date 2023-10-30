import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";

import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {APIGatewayProxyEvent} from "aws-lambda";


const importProductsFile: ValidatedEventAPIGatewayProxyEvent<object> = async (event: APIGatewayProxyEvent) => {
    console.log(event)

    const {name} = event.queryStringParameters;
    const client = new S3Client({region: 'eu-west-1'});
    const command = new PutObjectCommand({
        Bucket: 'upload-products-aws-course2',
        Key: `uploaded/${name}`,
    });

    const url = await getSignedUrl(client, command, {expiresIn: 3600});

    return formatJSONResponse({
        url
    });
};

export const main = middyfy(importProductsFile);
