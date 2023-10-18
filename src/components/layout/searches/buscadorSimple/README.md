# BuscadorSimple

## Descripcion

Componente de busqueda generico, recibe un servicio http y sus parametros para realizar una busqueda y desplegar los resultados en un data table configurado con las columnas recibidas por parametros, al realizar clic sobre una row resultante se ejecutara la funcion onRowClick recibida pasandole como parametro el objeto completo obtenido.

## Inicio

### Dependencias

DataTable

### Instalacion

- npm i

### Uso

A continuacion se detalla el uso basico del componente

```
const BuscadorPersonaSimpleDemo = ({ parametros = [], ...props }) => {
  const onRowClick = (persona) => {
    alert(`Datos persona seleccionada: ${JSON.stringify(persona)}`)
  };

  const onError = (obj) => {
    alert(`Error: ${JSON.stringify(obj)}`)
  };

  const defaultColumns = [
    {
      field: "documento",
      align: "left",
      disablePadding: false,
      label: "Documento",
    },
    {
      field: "apellido1",
      align: "left",
      disablePadding: false,
      label: "1er apellido",
    },
    {
      field: "apellido2",
      align: "left",
      disablePadding: false,
      label: "2do apellido",
    },
    {
      field: "nombre1",
      align: "left",
      disablePadding: false,
      label: "1er nombre",
    },
    {
      field: "nombre2",
      align: "left",
      disablePadding: false,
      label: "2do nombre",
    },
  ];

  return (
    <>
      <BuscadorSimple
        columnasResultadoTabla={defaultColumns}
        onRowClick={(persona) => {
          onRowClick(persona);
        }}
        onError={(obj) => {
          onError(obj);
        }}
        servicio={PersonaService.getPersonaSimple}
        wrapperId="wrapper-busqueda-persona-simple"
        id="busqueda-persona-simple"
        className="wrapper-busqueda-persona-simple"
        placeHolder={"Busqueda Persona simple"}
      />
    </>
  );
};
```

- Parametros:

  - servicio: PropTypes.func, servicio en el que se realizara la busqueda
  - parametros: PropTypes.array, parametros al servicio de busqueda
  - ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]), ref para el input de busqueda
  - columnasResultadoTabla: PropTypes.array, columnas de configuracion de la tabla que desplegara los resultados
  - onRowClick: PropTypes.func, funcion de callBack que sera ejecutada al presionar una row de resultado
  - onError: PropTypes.func, funcion de error que se ejecutara cuando se produzca un error al realizar la llamada al servicio
  - minWidth: PropTypes.number, ancho minimo del data table
  - conCabezal: PropTypes.bool, especifica si la tabla resultante mostrara su cabezal
  - placeHolder: PropTypes.string, placeholder del input de busqueda
  - wrapperId: PropTypes.string, wrapper id
  - ajusteAlAncho: PropTypes.bool,
  - className: PropTypes.string, clase del componente
  - fullWidth: PropTypes.bool, determina si el input ocupa todo el ancho disponible
  - cantidadCaracteresTriggerBuscador: PropTypes.number, cantidad de caracteres minima para ejecutar la busqueda
  - defaultValue: PropTypes.string, valor por defecto para el input

## Autores

Nombres de los desarrolladores

## Changelog

Todos los cambios realizados se registraran en esta seccion.

El formato esta basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y la nomenclatura para las versiones en [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2022-8-11

### Added

Se agrega una propiedad `disabled`

## [1.2.0] - 2022-8-10

### Added

Se agrega una propiedad `ref` para el input de busqueda. Esto permite referenciarlo desde el componente padre.

## [1.1.0] - 2022-7-28

### Added

Se agrega una propiedad `defaultValue`

## [1.0.1] - 2022-7-01

### Changed

Se generaliza el componente para que pueda ser utilizado sin referencias a persona.

## [1.0.0] - 2022-06-24

### Added

Version inicial
