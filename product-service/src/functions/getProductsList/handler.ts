import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {PRODUCTS} from '../../mockData/products';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
    return formatJSONResponse({
        content: PRODUCTS
    });
};

export const main = middyfy(getProductsList);
