import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';

const catalogBatchProcess = async () => {
    return formatJSONResponse({});
};

export const main = middyfy(catalogBatchProcess);
