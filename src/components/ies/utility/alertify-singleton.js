let alertifyInstance = null;

export const getAlertifyInstance = async () => {
  if (!alertifyInstance) {
    try {
      const { default: alertify } = await import('alertifyjs');
      alertifyInstance = alertify;
    } catch (error) {
      console.error('Error loading alertifyjs:', error);
      throw error;
    }
  }
  return alertifyInstance;
};