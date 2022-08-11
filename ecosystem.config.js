module.exports = {
  apps : [{
    name: 'nats',
    namespace: 'svc',
    script: 'docker',
    args: 'start nats',
    watch: '.'
  },
  {
    name: 'svc-get-ext-data',
    namespace: 'svc',
    script: 'yarn',
    args: 'svc-get-ext-data ts-node src/main.ts',
    watch: ['packages/svc-get-ext-data/src']
  },
  {
    name: 'util-svc-client',
    namespace: 'util',
    script: 'yarn',
    args: 'util-svc-client ts-node src/main.ts'
  },
  {
    name: 'svc-mappings',
    namespace: 'svc',
    script: 'yarn',
    args: 'svc-mappings ts-node src/main.ts',
    watch: ['packages/svc-mappings/src']
  },
  {
    name: 'svc-sync',
    namespace: 'svc',
    script: 'yarn',
    args: 'svc-sync ts-node src/main.ts',
    watch: ['packages/svc-sync/src']
  },
],


  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
