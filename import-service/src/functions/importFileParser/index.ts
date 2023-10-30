import {handlerPath} from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            s3: {
                bucket: 'upload-products-aws-course2',
                event: 's3:ObjectCreated:*',
                rules: [
                    {
                        prefix: 'uploaded/',
                    },
                    {
                        suffix: '.csv',
                    },
                ],
                existing: true,
            },
        },
    ],
};
