import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {PRODUCTS} from "../../mockData/products";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    const product = PRODUCTS.find((product) => event.pathParameters.id === product.id)
    if (product) {
        return formatJSONResponse({
            content: product,
        });
    } else {
        return formatJSONResponse({
            error: 'Product not found',
        }, 404);
    }
};

export const main = middyfy(getProductsById);
