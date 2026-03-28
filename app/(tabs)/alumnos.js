import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { FAB, List, PaperProvider, Text, TextInput } from "react-native-paper";
// CAMBIO: Importación del componente modal hijo.
import Agregar from "../../Modal/Agregar";

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [buscaAlumno, setBuscaAlumno] = useState("");

  // CAMBIO: Estado para controlar si el modal está visible o no.
  // PARA QUÉ: Se pasa como prop al hijo 'Agregar' para abrirlo/cerrarlo.
  const [modalVisible, setModalVisible] = useState(false);

  // Estado para rastrear qué alumno fue seleccionado (para cambiar color)
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  //validar que no hay alumnos duplicados por nombre o matricula
  /*√
  alumnos.forEach((alumno) => {
    console.log(`Alumno: ${alumno.nombre}, Matrícula: ${alumno.matricula}`)
    const alumnoDuplicado = alumnos.find(
      (a) =>
        a !== alumno &&
        (a.nombre === alumno.nombre || a.matricula === alumno.matricula)
    );
    if (alumnoDuplicado) {
      console.log(`❌ Error: Ya existe un alumno con el nombre "${alumnoDuplicado.nombre}" o matrícula "${alumnoDuplicado.matricula}"`);
    }else {
      return false;
    }
  });
*/

  const ValidarAlumnos = (Alumnonuevo) => {
    const alumnoEncontrado = alumnos.find(
      (alumno) =>
        alumno.nombre === Alumnonuevo.nombre ||
        alumno.matricula === Alumnonuevo.matricula,
    );
    if (alumnoEncontrado) {
      console.log("Alumno duplicado: ", alumnoEncontrado);
      return true;
    }
    console.log("Alumno nuevo: ", Alumnonuevo);
    return false;
  };

  // Función para generar URL de avatar aleatoria y consistente
  const generarAvatarUrl = (matricula) => {
    const estilos = [
      "avataaars",
      "big-ears",
      "big-smile",
      "croodles",
      "fun-emoji",
      "pixel-art",
      "lorelei",
      "micah",
    ];
    const estilo = estilos[parseInt(matricula) % estilos.length];
    return `https://api.dicebear.com/7.x/${estilo}/svg?seed=${matricula}`;
  };

  useEffect(() => {
    // Simulación de carga inicial de datos
    setTimeout(() => {
      setAlumnos([
        { nombre: "CANDELARIA MORA SAMANTHA", matricula: "2114354" },
        { nombre: "CANTU SILVA JAVIER", matricula: "2111889" },
        { nombre: "CARMONA LOZANO ANGEL EMILIANO", matricula: "2069119" },
        { nombre: "CASTILLO ACOSTA JORGE", matricula: "2132842" },
        { nombre: "DAVILA GONZALEZ ALDO ADRIAN", matricula: "1994122" },
        { nombre: "DURAN BARRIENTOS FABRIZIO", matricula: "2018230" },
        { nombre: "FLORES GONZALEZ SEBASTIAN", matricula: "21045641" },
        { nombre: "DURAN BARRIENTOS FABRIZIO", matricula: "20182301" },
        { nombre: "FLORES GONZALEZ SEBASTIAN", matricula: "2104564" },
        { nombre: "FLORES LÓPEZ DIEGO", matricula: "2066033" },
        { nombre: "FLORES MARTINEZ ERICK ADRIAN", matricula: "2132976" },
        { nombre: "GARZA AVALOS DIEGO", matricula: "2066114" },
        { nombre: "GONZALEZ OVALLE CHRISTIAN GABRIEL", matricula: "2031243" },
        { nombre: "GRANJA PEÑA DIEGO", matricula: "20647331" },
        { nombre: "IBARRA RODRIGUEZ ALEXIS", matricula: "20312431" },
        { nombre: "MARTINEZ ELIAS ANGEL SEBASTIAN", matricula: "2064733" },
        {
          nombre: "MENDIETA GONZALEZ ESMERALDA GABRIELA",
          matricula: "2094647",
        },
        { nombre: "MIRELES VELAZQUEZ ALEJANDRO", matricula: "2005102" },
        { nombre: "MONSIVAIS SALAZAR ANDRES", matricula: "2064574" },
        {
          nombre: "PARRAZALEZ VALDESPINO MARTHA JULIETA",
          matricula: "2024783",
        },
        { nombre: "PEÑA MUNGARRO LUIS ANGEL", matricula: "2066077" },
        { nombre: "PUENTE REYNOSO JULIO CESAR", matricula: "2092151" },
        { nombre: "RAMIREZ LOPEZ BRYAN", matricula: "2103708" },
        { nombre: "RAMOS AVILA LILIANA VALERIA", matricula: "2115192" },
        { nombre: "RICO JAUREGUI MAURICIO", matricula: "2037503" },
        { nombre: "RIVERA LUNA ADRIAN", matricula: "2131513" },
        { nombre: "RIVERA REYNA JOSE EMILIO", matricula: "2013503" },
        { nombre: "RODRIGUEZ OLVERA ROSA ISELA", matricula: "2004613" },
        { nombre: "RODRIGUEZ RODRIGUEZ ANGEL AZAEL", matricula: "2133022" },
        { nombre: "SANCHEZ GALARZA JUAN CARLOS", matricula: "2026061" },
        { nombre: "SOLIS ORTIZ ALFREDO", matricula: "2095320" },
        { nombre: "VELAZQUEZ ABREGO HERWIN DANIEL", matricula: "2025350" },
        { nombre: "VILLAGRA RODRIGUEZ ANDRES NEHUEL", matricula: "2103895" },
        { nombre: "ZACATENCO OLIVE RODRIGO", matricula: "1857791" },
        { nombre: "ZAVALA CANTU TERESA MARGARITA", matricula: "2025218" },
      ]);
    }, 2000);
  }, []);

  // CAMBIO: Función para añadir un nuevo alumno al arreglo.
  // PARA QUÉ: Se envía al hijo 'Agregar' para que este pueda actualizar la lista del padre.

  const handleAddAlumno = (nuevoAlumno) => {
    if (ValidarAlumnos(nuevoAlumno)) {
      console.log(
        `❌ Error: Ya existe un alumno con el nombre "${nuevoAlumno.nombre}" o matrícula "${nuevoAlumno.matricula}"`,
      );
    } else {
      setAlumnos([...alumnos, nuevoAlumno]);
      console.log(`✅ Alumno "${nuevoAlumno.nombre}" agregado exitosamente`);
    }
  };

  const alumnosFiltrados = alumnos.filter(
    (alumno) =>
      alumno.nombre.toLowerCase().includes(buscaAlumno.toLowerCase()) ||
      alumno.matricula.includes(buscaAlumno),
  );

  if (!alumnos.length) {
    return (
      <PaperProvider>
        <Text style={{ padding: 20 }}>Cargando alumnos...</Text>
        {/* FAB incluso en carga para poder agregar alumnos manualmente si se desea */}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        />
        <Agregar
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={handleAddAlumno}
        />
      </PaperProvider>
    );
  }
  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <TextInput
          label="Buscar alumno"
          value={buscaAlumno}
          onChangeText={(text) => setBuscaAlumno(text)}
          style={{ margin: 10 }}
        />

        <FlatList
          data={alumnosFiltrados}
          keyExtractor={(item) => item.matricula}
          renderItem={({ item }) => {
            const esSeleccionado = alumnoSeleccionado === item.matricula;
            return (
              <List.Item
                title={item.nombre}
                description={item.matricula}
                left={(props) => (
                  <Image
                    source={{ uri: generarAvatarUrl(item.matricula) }}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                  />
                )}
                onPress={() =>
                  setAlumnoSeleccionado(esSeleccionado ? null : item.matricula)
                }
                titleStyle={{
                  color: esSeleccionado ? "#9f2d2d" : "#1F2937",
                  fontWeight: esSeleccionado ? "bold" : "normal",
                  fontSize: esSeleccionado ? 16 : 14,
                }}
                descriptionStyle={{
                  color: esSeleccionado ? "#110f0f" : "#111214",
                }}
                style={{
                  backgroundColor: esSeleccionado ? "#d2a5a5" : "transparent",
                }}
              />
            );
          }}
        />

        {/* CAMBIO: Botón Flotante (FAB) para abrir el modal */}
        <FAB
          icon="plus"
          label="Nuevo"
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        />

        {/* CAMBIO: Integración del componente hijo Agregar */}
        {/* PARA QUÉ: Gestionar la creación de nuevos alumnos mediante el modal de Paper */}
        <Agregar
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={handleAddAlumno}
          //onAdd pasa
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

// validar que no hay aliumnos duplicados por nombre o matricula
