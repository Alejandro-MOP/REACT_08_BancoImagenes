import React from 'react';
import PropTypes from 'prop-types';

const Error = ({mensaje,clase}) => {
    return ( 
        <p className={clase}>{mensaje}</p>
     );
}
 
Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}
export default Error;