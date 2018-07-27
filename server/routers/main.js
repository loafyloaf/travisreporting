const IBMCloudEnv = require('ibm-cloud-env');
IBMCloudEnv.init();

const bodyParser = require('body-parser');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const vcapServices = require('vcap_services');

const serviceLabel = 'natural_language_understanding';

const credsFromEnv = vcapServices.getCredentials('watson_natural_language_understanding');
if (credsFromEnv.apikey) {
  credsFromEnv['iam_apikey'] = credsFromEnv.apikey;
}

let credsFromFile = {};
if (!process.env.VCAP_SERVICES) {
  credsFromFile = IBMCloudEnv.getCredentialsForService(
    'watson',
    serviceLabel,
    require('./../localdev-config.json')
  );
}

const params = Object.assign({ version: '2018-04-05' }, credsFromEnv, credsFromFile);
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1(params);

module.exports = function(app) {
  // setup body-parser
  app.use(bodyParser.json());

  app.post('/api/analyze', function(req, res) {
    naturalLanguageUnderstanding.analyze(req.body, (err, results) => {
      if (err) {
        const error = {
          code: err.code || 500,
          error: err.error || err.message,
        };
        return res.status(error.code).json(error);
      } else {
        res.json({ query: req.body.query, results });
      }
    });
  });
}
