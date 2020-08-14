import React from 'react';
import PropTypes from 'prop-types';

const Imagen = ({imagen}) => {

    //destructuring
    const {largeImageURL, likes, previewURL, tags, views, downloads} = imagen;
    return ( 

        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img src={previewURL} alt={tags} className="card-img-top" />

                <div className="car-body">
                    <p className="card-text text-center">   <i className="far fa-thumbs-up text-success"></i> {likes.toLocaleString("es-MX")}  Me Gusta</p>
                    <p className="card-text text-center">   <i className="far fa-eye text-success"></i> {views.toLocaleString("es-MX")} Vistas</p>
                    <p className="card-text text-center">   <i className="fas fa-download text-success"></i> {downloads.toLocaleString("es-MX")} Descargas</p>
                </div>

                <div className="card-footer">
                    <a
                        href={largeImageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark btn-block"
                    >Ver Imagen</a>

                </div>

            </div>
        </div>

     );
}
 
Imagen.propTypes ={
    imagen: PropTypes.array.isRequired
}
export default Imagen;