// Feature flags configuration

const featureFlags = {
  IS_PREMIUM_ENABLED: process.env.IS_PREMIUM_ENABLED === 'true',
};

export default featureFlags;
