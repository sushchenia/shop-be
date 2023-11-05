import type {AWS} from '@serverless/typescript';

import getProductsById from '@functions/getProductsById'
import getProductsList from "@functions/getProductsList";
import createProduct from "@functions/createProduct";
import catalogBatchProcess from "@functions/catalogBatchProcess";

const serverlessConfiguration: AWS = {
    service: 'product-service',
    frameworkVersion: '3',
    plugins: ['serverless-esbuild'],
    provider: {
        name: 'aws',
        runtime: 'nodejs18.x',
        region: "eu-west-1",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
            SNS_TOPIC: {
                Ref: 'createProductTopic',
            },
        },
        iamRoleStatements: [{
            Effect: 'Allow',
            Action: ['dynamodb:*'],
            Resource: ['arn:aws:dynamodb:eu-west-1:421819764397:table/products', 'arn:aws:dynamodb:eu-west-1:421819764397:table/stocks']
        }, {
            Effect: 'Allow',
            Action: ['sns:*'],
            Resource: {
                Ref: 'createProductTopic'
            }
        }]
    },
    functions: {getProductsById, getProductsList, createProduct, catalogBatchProcess},
    resources: {
        Resources: {
            catalogItemsQueue: {
                Type: 'AWS::SQS::Queue',
                Properties: {
                    QueueName: 'catalogItemsQueue',
                },
            },
            createProductTopic: {
                Type: 'AWS::SNS::Topic',
                Properties: {
                    TopicName: 'createProductTopic'
                }
            },
            createProductTopicSubscription: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Protocol: 'email',
                    Endpoint: 'denis.sushchenja@gmail.com',
                    TopicArn: {
                        Ref: 'createProductTopic',
                    },
                }
            }
        }
    },
    package: {individually: true},
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node18',
            define: {'require.resolve': undefined},
            platform: 'node',
            concurrency: 10,
        },
    },
};

module.exports = serverlessConfiguration;
