# Componentes de Selección de Fecha

## Descripcion

Permite seleccionar una o varias fechas de un almanaque.

Al seleccionar la fecha, mediante la propiedad "handleChange" se retorna un objeto almanaque, el cual tiene varios métodos y propiedades, entre ellos, el valor de la fecha seleccionada.

_Toda propiedad del componente "React Multi Date Picker" que no este en esta lista, tambien es permitida y aceptada._  
_Estas pueden verse en la documentación oficial [Aquí](https://shahabyazdi.github.io/react-multi-date-picker/props/)._

## Inicio

### Dependencias

### Instalacion

- npm i

### Uso

- A continuacion se detalla el uso basico del componente

**Parámetros**: (\*) obligatorias

- \*handleChange: (Function) Función que se ejecuta al seleccionarse una fecha. Es la forma de hacer una acción cuando el usuario selecciona la fecha.
- formatDate: (String) Formato de fecha que se quiere recibir en el RenderObject. Por defecto "DD/MM/YYYY".
- minDate: (Date o DateTime) Fecha mínima que muestra el almanaque. Por defecto son los 12 meses anteriores de la fecha actual.
- maxDate: (Date o DateTime) Fecha máxima que muestra el almanaque. Por defecto son los 12 meses posteriores de la fecha actual.
- className: (String) Atributo de clase que se le puede aplicar al almanaque.
- InputClassName: (String) Atributo de clase que se le puede aplicar al input por defecto.
- RenderObject: (Component) Objeto donde se va a renderizar el almanaque. Ver ejemplo en Demo de ButtonDatePicker Customizado.
- iniDateValue: (Date o DateTime) Valor inicial de la fecha del almanaque.
- disableYearPicker (Bool) Valor que indica si mostrar o no el selector de años. Por defecto es false
- disableMonthPicker (Bool) Valor que indica si mostrar o no el selector de meses. Por defecto es false
- numberOfMonths (int) [Solo para MultiDatePicker] Valor que indica cuantos almanaques mostrar. Por defecto son 2 almanaques.
- joinCharacter (string) [Solo para MultiDatePicker] string que sirve para separar las dos fechas seleccionadas. Por defecto es un guión ( - )
- InputClassName (string) Valor que sirve para aplicarle una clase al componente por defecto que muestra la fecha.
- InputDefaultValue (string) Valor que se muestra antes de seleccionar una fecha

**Particularidades**

- RenderObject:

  - ButtonDatePicker Por defecto es un Button de react-shared-components
  - MultiDatePicker y DefaultDatePicker Por defecto es un input de HTML

- iniDateValue:

  - ButtonDatePicker y DefaultDatePicker Por defecto es valor null
  - MultiDatePicker Por defecto es un array [null, null]

- InputDefaultValue

  - ButtonDatePicker el valor enviado se asigna como texto del botón
  - MultiDatePicker y DefaultDatePicker el valor enviado se asigna como placeholder del input

**Ejemplos de utilización**

```
import React from "react";
import {ButtonDatePicker} from "react-shared-components";

const DemoDatePicker = () => {
  return (
    <>
      <ButtonDatePicker  handleChange={ calendarResult => {
          alert('Fecha seleccionada:' + calendarResult?.toString() );
          } }
      />
    </>
  );
};

export default DemoDatePicker;

```

```
import React from "react";
import {DefaultDatePicker} from "react-shared-components";

const DemoDatePicker = () => {
  return (
    <>
      <DefaultDatePicker
        InputClassName="search"
        handleChange={(calendarResult) => {
          alert('Fecha seleccionada:' + calendarResult?.toString() );
          } }
      />
    </>
  );
};

export default DemoDatePicker;

```

## Autores

Javier Pietroroia

## Changelog

Todos los cambios realizados se registraran en esta seccion.

El formato esta basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y la nomenclatura para las versiones en [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2022-08-09

### Added

Se agrega la property `disabled`.

## [1.0.2] - 2022-07-07

### Changed

Para generar compatibilidad con luxon:

Se agrega la opción de pasarle iniDateValue, minDate y maxDate del tipo DateTime de Luxon.

Si ese es el caso, se convierte (dentro del componente) a tipo Date para que pueda ser usada correctamente.

## [1.0.0] - 2022-06-24

### Added

Version inicial
