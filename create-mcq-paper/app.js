const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-1', apiVersion: '2012-08-10'});

//thrid party libraries.
const ddbGeo = require('dynamodb-geo');
import { v1 as uuidv1 } from 'uuid';
const moment = require("moment-timezone");

//Environment variables
const { BASE_TABLE_NAME } = process.env;

PaperHostFacet = (event, createdAt) => {
    //PK
    var paperId = uuidv1();

    //facet 01:
    const paperId_paperHostId_facet = {
        Item: {
            "PK": {
                S: 'paperId_' + paperId
            },
            "SK": {
                S: 'paperHostId_' + event.paperHostId
            },
            "paperId": {
                S: paperId
            },
            "paperHostId": {
                S: event.paperHostId
            },
            "leaderboardId": {
                S: event.leaderboardId
            },
            "paperCollectionId": {
                S: 'none'
            },
            "createdAt": {
                S: createdAt
            },
            "paperName": {
                S: event.paperName
            },
            "paperAvgRating": {
                S: event.paperAvgRating
            },
            "paperGrade": {
                N: event.paperGrade
            },
            "paperFocussedExamination": {
                N: event.paperFocussedExamination
            },
            "paperCreatedDate": {
                S: event.paperCreatedDate
            },
            "paperDescription": {
                S: event.paperDescription
            },
            "paperTimeLimit": {
                S: event.paperTimeLimit
            },
            "paperNumOfQue": {
                S: event.paperNumOfQue
            },
            "paperSearchTag1": {
                S: event.paperSearchTag1
            },
            "paperSearchTag2": {
                BOOL: event.paperSearchTag2
            },
            "paperSearchTag3": {
                S: event.paperSearchTag3
            },
            "paperSearchTag4": {
                S: event.paperSearchTag4
            },
            "paperSearchTag5": {
                S: event.paperSearchTag5
            }
        },
        TableName: BASE_TABLE_NAME
    };

    dynamodb.putItem(paperId_paperHostId_facet, function (err, data) {
        if (err) {
            console.log('ERROR: Creating PaperHost table record failed.');
            console.log(err);
            callback(err);
        } else {
            console.log('SUCCESS: Creating PaperHost table record is Successful.');
            console.log(data);
            callback(null, data);
        }
    });
}

PaperCollectionFacet = (event, createdAt, paperCollectionId) => {
    //PK
    var paperId = uuidv1();
    var PK = 'paperid_' + paperId;
    //facet02:
    const papperId_paperCollectionId_facet = {
        Item: {
            "PK": {
                S: PK
            },
            "SK": {
                S: 'paperCollectionId_' + event.paperHostId
            },
            "paperId": {
                S: paperId
            },
            "paperHostId": {
                S: event.paperHostId
            },
            "paperCollectionId": {
                S: paperCollectionId
            },
            "createdAt": {
                S: createdAt
            },
            "paperName": {
                S: event.paperName
            },
            "paperAvgRating": {
                S: event.paperAvgRating
            },
            "paperGrade": {
                N: event.paperGrade
            },
            "paperFocussedExamination": {
                N: event.paperFocussedExamination
            },
            "paperCreatedDate": {
                S: event.paperCreatedDate
            },
            "paperDescription": {
                S: event.paperDescription
            },
            "paperTimeLimit": {
                S: event.paperTimeLimit
            },
            "paperNumOfQue": {
                S: event.paperNumOfQue
            },
            "paperSearchTag1": {
                S: event.paperSearchTag1
            },
            "paperSearchTag2": {
                BOOL: event.paperSearchTag2
            },
            "paperSearchTag3": {
                S: event.paperSearchTag3
            },
            "paperSearchTag4": {
                S: event.paperSearchTag4
            },
            "paperSearchTag5": {
                S: event.paperSearchTag5
            }
        },
        TableName: BASE_TABLE_NAME
    };

    dynamodb.putItem(papperId_paperCollectionId_facet, function (err, data) {
        if (err) {
            console.log('ERROR: Creating PaperCollection table record failed.');
            console.log(err);
            callback(err);
        } else {
            console.log('SUCCESS: Creating PaperCollection table record is Successful.');
            console.log(data);
            callback(null, data);
        }
    });
}

exports.createMCQPaper = (event, context, callback) => {
    

    //Current time
    //var createdAt = moment(date.getTime()).tz("Asia/Colombo").utc().format();
    var createdAt = new Date();
    switch(event.type) {
        case 'PaperHost':
            PaperHostFacet(event, createdAt);
        case 'PaperCollection':
            PaperCollectionFacet(event, createdAt, event.paperCollectionId);
        case 'MCQ':
            SingleMCQ(event, PK, createdAt, paperId, event.paperCollectionId);
        default: 
            console.log('No event specified.')
            callback(null, 'Something wrong happenned.')
    }
};
