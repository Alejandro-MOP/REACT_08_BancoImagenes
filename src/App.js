import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes';
import Footer from './components/Footer';
import Error from './components/Error';
import Spinner from './components/Spinner';


function App() {

  //state de la app
  const[busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);
  const [cargando, guardarCargando] = useState(false);

  useEffect(()=>{
      const consultarAPI = async () => {
        if(busqueda === '') return;

          const imagenesPorPagina = 30;
          const key = '17034154-641ed58177a9fdfccc7988e7d';
          const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

          const respuesta = await fetch(url);
          const resultado = await respuesta.json(); //console.log(resultado.hits);

          guardarCargando(true);

          setTimeout(()=> {
            
            guardarCargando(false);            
            guardarImagenes(resultado.hits); //console.log(resultado);

            //calcular total de paginas
            const calcularPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina); //math.ceil => redondea el calculo hacia arriba
            guardarTotalPaginas(calcularPaginas);

          },3000);

          //Desplazar la pantalla hacia arriba
          const jumbotron = document.querySelector('.jumbotron');
          jumbotron.scrollIntoView({ behavior: 'smooth'})

         
    }
    consultarAPI();

  }, [busqueda, paginaactual])

  //Mostrar Spinner
  const componente = (cargando) ?<Spinner /> :<ListadoImagenes imagenes={imagenes}/>

  //Definir pagina Anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1; //console.log(nuevaPaginaActual)

    if(nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  //Definir pagina Siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1; //console.log(nuevaPaginaActual)

    if(nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  

  return (
      <div className="container">

        <div className="jumbotron">

          <p className="lead text-center"><i className="font-weight-bold fas fa-search"></i> Buscador de Imágenes</p> 
          <p className="lead text-center font-weight-bold "> en HD <i className="far fa-images"></i></p> 
          
          
          <Formulario 
            guardarBusqueda={guardarBusqueda}
          />

          {(totalpaginas === 0)
            ?(<Error 
                clase="my-3 p-4 text-center font-weight-bold  alert alert-warning"
                mensaje="No hay resultados para esa busqueda" />)
            :null
          }

        </div>

        <div className="row justify-content-center">
       

          {componente}

          {(paginaactual === 1 || cargando === true)  //condiciona el boton Anterior para ser visible
            ? null
            : (<button
                  type="button"
                  className="btn btn-info mr-1"
                  onClick={paginaAnterior}
                  >&laquo; Anterior 
                </button>)}

          {(paginaactual === totalpaginas || cargando ===true)//condiciona el boton Siguiente para ser visible
            ? null
            :(<button
                type="button"
                className="btn btn-info"
                onClick={paginaSiguiente}
                >Siguiente &raquo;
              </button>)}

        </div>

        <Footer/>
        
      </div>

      
         
      

      
  );
}

export default App;
