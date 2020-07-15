// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

//Environment variables
const { BASE_TABLE_NAME, HISTORY_TABLE_NAME } = process.env;

exports.getMCQPaper = async (event, context, callback) => {
    const PK = event.paperId;
    const SK = event.pap
    var params = {
        Key: {
            "PK": {
                S: "paperId_" + PK
            },
            "SK": {
                S: "paperHostId_" + SK
            }
        },
        TableName: BASE_TABLE_NAME
    };

    dynamodb.getItem(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(null, err);
        }// an error occurred
        else {
            console.log(data);
            callback(null, data);
        };// successful response
    });
};
