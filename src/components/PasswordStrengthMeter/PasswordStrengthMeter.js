import React from 'react';
import zxcvbn from 'zxcvbn';

    const PasswordStrengthMeter =({passwordValue})=>{
    const testedResult = zxcvbn(passwordValue);
    const testedResultScore = testedResult.score;
    const num = testedResultScore *100/4
    const changePasswordColor=()=>({
        backgroundColor: funProgressColor(),
        width: `${num}%`,
        height:'7px'
      })

      const funProgressColor = ()=>{

      if (passwordValue.length > 0 && passwordValue.length < 5) {
        
        return '#828082';
      }
        switch (testedResult.score) {
          case 0:
              return '#828082';
            case 1:
              return '#EA1111';
            case 2:
              return '#FFAD00';
            case 3:
              return '#9bc158';
            case 4:
              return '#00b500';
            default:
              return 'none';
          }
      }
      const createPasswordLabel = ()=>{

        if (passwordValue.length > 0 && passwordValue.length < 5) {
        
          return 'trop court';
        }
        switch (testedResult.score) {
          case 0:
            return ''
          case 1:
            return 'faible';
          case 2:
            return 'bon';
          case 3:
            return 'très bon';
          case 4:
            return 'fort';
          default:
            return '';
        }
      }

        return (
            <div className="progress" >
            
               <div
               className='progressBar'
               style={changePasswordColor()}
               >

               </div>
                
              <br />
              <label
                className="password-strength-meter-label"
                style={{color:funProgressColor(), padding:'none'}}
              >
               
              {createPasswordLabel()}
            
        </label>
      </div>
    );
  }

export default PasswordStrengthMeter;
