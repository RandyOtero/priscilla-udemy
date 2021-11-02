const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');


module.exports = (phase) => { // syntaxe node.js équivalente à export default
  
  if(phase === PHASE_DEVELOPMENT_SERVER){
    return {
      env: {
        mongodb_username: 'priscilla',
        mongodb_password: 'placeshaker',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'events-dev',
      },
    };
  }

  
  return{
    env: {
      mongodb_username: 'priscilla',
      mongodb_password: 'placeshaker',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'events',
    },
  }
};
