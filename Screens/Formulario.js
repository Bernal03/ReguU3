import React, {useContext} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ProductosContext} from '../Context/ProductosContext';
import Constants from 'expo-constants';

const validations =Yup.object().shape({
  descripcion:Yup.string().typeError('Este campo solo es alfabético.').min(3,'nombre muy corto').required('obligatorio'),
  cantidad:Yup.number().typeError('Este campo es solo numérico.').max(999,'Numero muy grande').required('Obligatorio'),
  precio:Yup.number().typeError('Este campo es solo numérico.').required('Obligatorio')
})

export default function Formulario({route,navigation}){
  const{status}=route.params;
  const {productos, lista, setProductos, setLista}= useContext(ProductosContext);

  return(
    <View style={StyleSheet.container}>
      <Text style={StyleSheet.header}>Lista de productos</Text>

      <Formik
      initialValues={productos}
      onSubmit={(values, {resetForm})=>{
        const temporal=lista.filter(pr=>pr.descripcion!=productos.descripcion);
        //alert('enviado')
        setLista([...lista,productos]);
        resetForm({
          descripcion:"",
          cantidad:"",
          precio:""
        })
        navigation.goBack();
        console.log(lista)
      }}
      validationSchema={validations}
      validate={(values)=>{
        setProductos(values)
        console.log(productos)
      }}
      >
{
  ({handleChange, handleBlur,handleSubmit, setFieldValue, handleReset,errors, values})=>(
    <View>
<TextInput
   style={styles.textinput}
   onChangeText={handleChange('cantidad')}
   onBlur={handleBlur('cantidad')}
   placeholder="Cantidad"
   value={values.cantidad}
   />

{errors.cantidad && <Text style={styles.texterror}>{errors.cantidad}</Text>}

<TextInput
   style={styles.textinput}
   onChangeText={handleChange('descripcion')}
   onBlur={handleBlur('descripcion')}
   placeholder="Descripcion"
   value={values.descripcion}
   editable={status==="add"?true:false}
   />

   {errors.descripcion && <Text style={styles.texterror}>{errors.descripcion}</Text>}

<TextInput
   style={styles.textinput}
   onChangeText={handleChange('precio')}
   onBlur={handleBlur('precio')}
   placeholder="Precio"
   value={values.precio}
   />

{errors.precio && <Text style={styles.texterror}>{errors.precio}</Text>}

<View style={{marginTop:20}}>
  <Button
    buttonStyle={styles.buttons}
    onPress={handleSubmit}
    title="Enviar"
  />
  {
    status==="add"
    &&
    <Button
      buttonStyle={styles.buttons}
      onPress={handleReset}
      title="Limpiar"
    />
  }
</View>
    </View>
  )
}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    margin:20,
    marginTop:Constants.statusBarHeight
 
  },
  texterror:{
    color:'red'
  },
  textinput:{
    borderRadius:10, 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    margin:5, 
    paddingLeft:15, 
    backgroundColor:'white',
    elevation: 5,
  },
  buttons:{
    backgroundColor:'gray', 
    color:'black', 
    marginTop:10, 
    borderRadius:10
  },
  header:{
    fontSize:20, 
    textAlign:'center', 
    marginBottom:40
  }

});