import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({value, text, color}) => {
  return (
    <div className="rating">
        <span style={{color: color}}> {value}
            {value >= 1
            ? (<i className="fas fa-star"> </i>) 
            : (
                value>=0.5 ? (<i className="fas fa-star-half-alt"> </i>) : (<i className="far fa-star"> </i>) 
            )}
            </span>
            <span style={{color: color}}>
              {value >= 2
            ? (<i className="fas fa-star"> </i>) 
            : (
                value>=1.5 ? (<i className="fas fa-star-half-alt"> </i>) : (<i className="far fa-star"> </i>) 
            )}
             </span>
            <span style={{color: color}}>
             {value >= 3
            ? (<i className="fas fa-star"> </i>) 
            : (
                value>=2.5 ? (<i className="fas fa-star-half-alt"> </i>) : (<i className="far fa-star"> </i>) 
            )}
             </span>
             <span style={{color: color}}>
             {value >= 4
            ? (<i className="fas fa-star"> </i>) 
            : (
                value>=3.5 ? (<i className="fas fa-star-half-alt"> </i>) : (<i className="far fa-star"> </i>) 
            )}
             </span>
             <span style={{color: color}}>
              {value >= 5
            ? (<i className="fas fa-star"> </i>) 
            : (
                value>=4.5 ? (<i className="fas fa-star-half-alt"> </i>) : (<i className="far fa-star"> </i>) 
            )}
        </span> 
         <span>{text && ` from ${text}` }</span>
    </div>
  )
}

Rating.defaultProps = {color: '#f8e825'}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string


}

export default Rating