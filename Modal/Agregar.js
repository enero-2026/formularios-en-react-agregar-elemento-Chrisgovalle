import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";

/* 
  Se define el componente 'Agregar' que recibe props del padre (Alumnos)
  Para que el modal sea un componente hijo reutilizable y controlado por el padre.
*/
export default function Agregar({ visible, onClose, onAdd }) {
  // Estados internos para manejar el texto de los campos.
  // Para capturar lo que el usuario escribe antes de enviarlo a la lista principal.
  const [nombre, setNombre] = useState("");
  const [matricula, setMatricula] = useState("");

  // Función para limpiar campos y cerrar el modal con onClose
  const limpiarYCerrar = () => {
    setNombre("");
    setMatricula("");
    onClose();
  };

  // CAMBIO: Función handleAdd para validar y enviar datos.
  // PARA QUÉ: Llama a onAdd (pasado por el padre) para insertar el nuevo alumno en el arreglo.

  //oAdd
  const handleAdd = () => {
    if (nombre.trim() && matricula.trim()) {
      //elimina los espacios vacios
      onAdd({ nombre, matricula });
      limpiarYCerrar(); // Limpia y cierra automáticamente tras agregar.
    }
  };

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={limpiarYCerrar}
        contentContainerStyle={containerStyle}
      >
        {/* CAMBIO: Agregados 2 campos TextInput de Paper */}
        <TextInput
          label="Nombre Completo"
          value={nombre}
          onChangeText={setNombre}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Matrícula"
          value={matricula}
          onChangeText={setMatricula}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />

        <View style={styles.row}>
          {/* CAMBIO: Botón para confirmar la suma del alumno */}
          <Button mode="contained" onPress={handleAdd} style={styles.btn}>
            Agregar
          </Button>
          {/* CAMBIO: Botón para cancelar y limpiar campos */}
          <Button mode="outlined" onPress={limpiarYCerrar} style={styles.btn}>
            Cancelar
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  input: { marginBottom: 15 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  btn: { flex: 1, marginHorizontal: 5 },
});
