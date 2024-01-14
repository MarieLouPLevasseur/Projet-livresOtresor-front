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
       // Erreur VALIDATION CÔTÉ SERVEUR (400) BD REQUEST
      else if (error.response.status === 400) {
       // Examinez la réponse du serveur pour extraire les messages d'erreur
        const validationErrors = error.response.data;
        // TODO les messages de problèmes de serveur ne seront qu'en anglais. Mettre la traduction symfony en place
        
        if (validationErrors && validationErrors.message) {
          const errorMessage = validationErrors.message.split('\n')[1].trim();
          console.log("Erreur de validation côté serveur:", errorMessage);
          return "Une erreur est survenue pendant la soumission.";

        } else {
          console.log("Erreur de validation côté serveur:", validationErrors);
          // Retourner les erreurs
          return "Une erreur est survenue pendant la soumission.";

        }
      }
      
  };
  