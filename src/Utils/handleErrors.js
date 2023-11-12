export const handleErrors = async (error) => {
 
      if (error.response.status === 401 || error.response.status === 403) {

        window.location.href = '/error-access';
        return false;

      } else if (error.response.status === 500) {

        window.location.href = '/error-server';
        return false;
      } 
      
      return false;

  };
  