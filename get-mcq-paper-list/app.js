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

exports.getMCQPaperList = async (event, context) => {

    const type = event.type;
    var params = {};

    params = {
        TableName: BASE_TABLE_NAME,
        IndexName: "hostId-vehicleId-index",
        KeyConditionExpression: "#yr = :yyyy",
        Limit: 3,
        ExpressionAttributeNames: {
            "#yr": "hostId"
        },
        ExpressionAttributeValues: {
            ":yyyy": "host"
        },
        ExclusiveStartKey: {
            "hostId": "host",
            "vehicleId": "vehicleId_0.6422279546072991"
        }
    };

    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            callback(null, "Something wrong happened.");
        } else {
            console.log("Query succeeded.");
            callback(null, data);
        }
    });

};
