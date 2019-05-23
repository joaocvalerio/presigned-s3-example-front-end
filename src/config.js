const currentEnvironment = !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV

const defaultEnvironments = {
  development: {
    BASE_URL: 'http://localhost',
    API_BASE_URL: 'http://localhost:3000/v1',
  },

  production: {
    BASE_URL: 'https://dry-citadel-93367.herokuapp.com',
    API_BASE_URL: 'https://dry-citadel-93367.herokuapp.com/v1',
  },
}

const environments = {
  ...defaultEnvironments,
}

// Example of global configuration variables
const globalConfig = {
  environment: currentEnvironment,
}

const environmentConfig = environments[currentEnvironment]

export default {...globalConfig, ...environmentConfig}
