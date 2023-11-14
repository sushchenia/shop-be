import {formatJSONResponse} from '@libs/api-gateway';

const basicAuthorizer = async (event, _ctx, cb) => {
    if (event['type'] != 'TOKEN') {
        cb('Unauthorized')
    }

    try {
        const {authorizationToken} = event

        const encodedCredentials = authorizationToken.split(' ')[1];
        const buff = Buffer.from(encodedCredentials, 'base64');
        const plainCredentials = buff.toString('utf-8').split('=');
        const [username, password] = plainCredentials

        console.log(`username: ${username} and password ${password}`)

        const storedUserPassword = process.env[username]
        const effect = !storedUserPassword || storedUserPassword != password ? 'Deny' : 'Allow'

        const policy = generatePolicy(encodedCredentials, event.methodArn, effect);

        cb(null, policy)
    } catch (e) {
        cb(`Unauthorized: ${e.message}`)
    }

    return formatJSONResponse({
        message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
        event,
    });
};

const generatePolicy = (
    principalId,
    resource,
    effect = 'Allow'
) => ({
    principalId,
    policyDocument: {
        Version: '2012-10-17',
        Statement: [
            {
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource,
            },
        ],
    },
});

export const main = basicAuthorizer;
