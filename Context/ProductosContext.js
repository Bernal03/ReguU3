import React, {createContext, useState, useEffect} from 'react';

export const ProductosContext = createContext();

const ProductosProvider = (props)=>{
    const [productos, setProductos] = useState({
      cantidad:"",
      descripcion:"",
      precio:""
})

const [lista, setLista]=useState([])
const [total, setTotal]=useState([])


const eliminar=(id)=>{
    const temporal=lista.filter((item)=>{
        return item.descripcion!==id;
    })
    setLista(temporal)
}


return(
        <ProductosContext.Provider
            value={{
                productos,
                lista,
                total,
                setProductos,
                setLista,
                setTotal,
                eliminar
            }}
        >
            {props.children}
        </ProductosContext.Provider>
    )
}

export default ProductosProvider;