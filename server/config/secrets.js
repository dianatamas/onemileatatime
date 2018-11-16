const secrets = {
  dbUri: 'mongodb://dianatamas:c3VkA52Uet4v@ds219983.mlab.com:19983/travels',
  googleClientID: '76610124418-2l9h0h4ipo1qtaun2q9itdhpd5ou2do1.apps.googleusercontent.com',
  googleClientSecret: '-TAps4JccAS8Lw-MvoJ9R6wF',
  cookieKey: 'frnijzecezc'
};

export const getSecret = key => secrets[key];
