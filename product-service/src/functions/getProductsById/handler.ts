import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    return formatJSONResponse({
        message: `Hello, welcome to the exciting getProductsById!`,
        event,
    });
};

export const main = middyfy(getProductsById);
