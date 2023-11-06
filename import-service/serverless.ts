import type {AWS} from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from "@functions/importFileParser";

const serverlessConfiguration: AWS = {
    service: 'import-service',
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
        iam: {
            role: 'ImportService'
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
    },
    functions: {importProductsFile, importFileParser},
    resources: {
        Resources: {
            ImportService: {
                Type: 'AWS::IAM::Role',
                Properties: {
                    RoleName: 'ImportServiceS3Access',
                    AssumeRolePolicyDocument: {
                        Version: '2012-10-17',
                        Statement: [
                            {
                                Effect: 'Allow',
                                Principal: {
                                    Service: ['lambda.amazonaws.com'],
                                },
                                Action: 'sts:AssumeRole',
                            },
                        ],
                    },
                    ManagedPolicyArns: [
                        'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
                        'arn:aws:iam::aws:policy/AmazonSQSFullAccess',
                    ],
                    Policies: [
                        {
                            PolicyName: 'ImportServiceAccessPolicy',
                            PolicyDocument: {
                                Version: '2012-10-17',
                                Statement: [
                                    {
                                        Effect: 'Allow',
                                        Action: [
                                            's3:PutObject',
                                            's3:PutObjectAcl',
                                            's3:GetObject',
                                            's3:DeleteObject',
                                        ],
                                        Resource: [
                                            'arn:aws:s3:::upload-products-aws-course2/*',
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        },
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
