import React, {useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ListItem, Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProductosContext} from '../Context/ProductosContext';

const Listado=({navigation})=>{

const {lista, productos, setProductos, setLista,total, setTotal, eliminar}=useContext(ProductosContext);


    return(<View style={styles.container}>
            <Header
                centerComponent={{text:'Lista de productos', style:{color:'#fff'}}}
                rightComponent={{icon:'add',color:'#fff', onPress:()=>{
                    setProductos({
                        descripcion:"",
                        cantidad: "",
                        precio: ""
                    })

                    navigation.navigate('Formulario',{status:"add"})
                }}}
                containerStyle={{backgroundColor:'green'}}
            />

            <ScrollView>
                {
                    lista.length>0
                    ?
                    lista.map((a,i)=>(
                        <ListItem key={i} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Producto: {a.descripcion}</ListItem.Title>
                                <ListItem.Subtitle>Cantidad: {a.cantidad}</ListItem.Subtitle>
                                <ListItem.Subtitle>Precio: ${a.precio}</ListItem.Subtitle>
                            </ListItem.Content>
                        
                            <View style={styles.buttons}>
                                <Ionicons name='ios-trash' size={30} color={'red'} onPress={()=>eliminar(a.descripcion)}/>
                                <Ionicons name='md-create' size={30} color={'green'} onPress={()=>{
                                    setProductos({
                                        descripcion:a.descripcion,
                                        cantidad:a.cantidad.toString(),
                                        precio:a.precio.toString(),
                                    })
                                    navigation.navigate('Formulario',{status:"edit"})
                                }}/>
                            </View>
                        
                        </ListItem>
                    ))
                    :
                    <Text style={{marginTop:50, textAlign:'center', fontSize:20}}>No hay productos</Text>
                }
            </ScrollView>
            
            <Text style={{ textAlign: 'center', fontSize:30}}> Total: $ {total}</Text>
    </View>
    )
}

export default Listado;

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
    },
    buttons:{
        width:'25%',
        flexDirection:'row',
        justifyContent:'space-between'
    }
});