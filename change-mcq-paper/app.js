
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ region: 'ap-southeast-1', apiVersion: '2012-08-10'});

//thrid party libraries.
const ddbGeo = require('dynamodb-geo');

//Environment variables
const { BASE_TABLE_NAME, LOCATION_TABLE_NAME } = process.env;

//
PaperHostFacet = (
    paperId, 
    paperHostId,
    paperName,
    paperGrade,
    paperFocussedExamination,
    paperDescription,
    paperNumOfQue,
    paperTimeLimit,
    paperSearchTag1,
    paperSearchTag2,
    paperSearchTag3,
    paperSearchTag4,
    paperSearchTag5,
    subjectId,
    paperMCQSet
    ) => {
    const PK = 'paperId_' + paperId;
    const SK = 'paperHostId_' + paperHostId;
        
    var chageParams = {
        ExpressionAttributeNames: {
            "#PN": "paperName",
            "#PG": "paperGrade",
            "#PFE": "paperFocussedExamination",
            "#PD": "paperDescription",
            "#PNOQ": "paperNumOfQue",
            "#PTL": "paperTimeLimit",
            "#PST1": "paperSearchTag1",
            "#PST2": "paperSearchTag2",
            "#PST3": "paperSearchTag3",
            "#PST4": "paperSearchTag4",
            "#PST5": "paperSearchTag5",
            "#SI": "subjectId",
            "#PMCQS": "paperMCQSet"
        },
        ExpressionAttributeValues: {
            ":pn": {
                S: paperName
            },
            ":pg": {
                S: paperGrade
            },
            ":pfe": {
                S: paperFocussedExamination
            },
            ":pd": {
                S: paperDescription
            },
            ":pnoq": {
                S: paperNumOfQue
            },
            ":ptl": {
                S: paperTimeLimit
            },
            ":pst1": {
                S: paperSearchTag1
            },
            ":pst2": {
                S: paperSearchTag2
            },
            ":pst3": {
                S: paperSearchTag3
            },
            ":pst4": {
                S: paperSearchTag4
            },
            ":pst5": {
                S: paperSearchTag5
            },
            ":si": {
                S: subjectId
            },
            ":pmcqs": {
                S: paperMCQSet
            },
        },
        Key: {
            "PK": {
                S: PK
            },
            "SK": {
                S: SK
            }
        },
        ReturnValues: "ALL_NEW",
        TableName: BASE_TABLE_NAME,
        UpdateExpression: "SET #PN = :pn, #PG = :pg, #PFE = :pee, #PD = :pd, #PNOQ = :pnoq, #PTL = :ptl, #PST1 = :pst1, #PST2 = :pst2, #PST3 = :pst3, #PST4 = :pst4, #PST5 = :pst5, #SI = :si, #PMCQS = :pmcqs"
    };

    dynamodb.updateItem(chageParams, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
        /*
        data = {
         Attributes: {
          "AlbumTitle": {
            S: "Louder Than Ever"
           }, 
          "Artist": {
            S: "Acme Band"
           }, 
          "SongTitle": {
            S: "Happy Day"
           }, 
          "Year": {
            N: "2015"
           }
         }
        }
        */
    });
}


exports.changeMCQPaper = (event, context, callback) => {
    
    //
    PaperHostFacet(
        event.paperId, 
        event.paperHostId,

        event.paperName,
        event.paperGrade,
        event.paperFocussedExamination,
        event.paperDescription,
        event.paperNumOfQue,
        event.paperTimeLimit,
        event.paperSearchTag1,
        event.paperSearchTag2,
        event.paperSearchTag3,
        event.paperSearchTag4,
        event.paperSearchTag5,
        event.subjectId,
        event.paperMCQSet
    );

    //

};
