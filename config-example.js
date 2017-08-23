var config = {};

/* Tunnel Settings */
config.tunnels = {};
config.tunnels.subdomain = '';

/* Self-Deployment Settings */
config.self_deployment = {};
config.self_deployment.secret = '';

/* Watson API Settings */
config.watson = {};

/* Text to Speech */
config.watson.textToSpeech = {};
config.watson.textToSpeech.username = '';
config.watson.textToSpeech.password = '';

/* Speech to Text */
config.watson.speechToText = {};
config.watson.speechToText.username = '';
config.watson.speechToText.password = '';

/* AWS */
config.aws = {};
config.aws.region = '';

/* Polly (Text to Speech) */
config.aws.polly = {};
config.aws.polly.accessKeyId = '';
config.aws.polly.secretAccessKey = '';

module.exports = config;