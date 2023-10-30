import {S3Event} from "aws-lambda";
import {middyfy} from "@libs/lambda";


const importProductsFile = async (event: S3Event) => {

};

export const main = middyfy(importProductsFile)
