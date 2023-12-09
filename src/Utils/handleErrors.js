import { userLogout } from '../features/login/userSlice';
import { kidLogout } from '../features/login/kidSlice';

import { store } from '../components/App/Store';

export const handleErrors = async (error, setAutoLogout) => {

    const dispatch = store.dispatch;

    const handleLogout = () => {
      
      dispatch(userLogout());
      dispatch(kidLogout())
      localStorage.removeItem('user');
      localStorage.removeItem('kid');
      localStorage.setItem('isAutoLogout', true);

    };

      // Erreur CONNEXION
      if (error.response.message === "Expired JWT Token" || error.response.status === 401){
        handleLogout();
     
        window.location.href = '/';

      }
      // Erreur AUTORISATION
      else if(error.response.status === 403){
        window.location.href = '/error-access';

      } 
      // Erreur SERVER
      else if (error.response.status === 500 || error.message === "Network Error") {
        window.location.href = '/error-server';
      }     
  };
  