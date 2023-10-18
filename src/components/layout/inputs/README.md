# Selector Generico

## Descripcion

El componente es un select generico con posibilidad de poder agregar un dato convirtiendose en un input

## Inicio

### Dependencias

### Instalacion

-npm i

### Uso

- A continuacion se detalla el uso basico del componente

- `register` y `setValues` son callbacks a los que se les pasa la funcion de register y setValues obtenidas del useForm del componente padre. Esto permite obtener el valor del selector e impactarlo en el form del padre

- `arregloDeDatos` es el arreglo de datos que se va a desplegar al hacer click en el select. Estos datos deben mandarse desde el padre en forma de arreglo de objetos con el siguiente formato : { label: dato.atr1, value: dato.atr2 }

- `label` sera el nombre que tendra el select por defecto antes de seleccionar cualquier opcion, es un simple string

- `agregarDatos` es un booleano que establece si existe la posibilidad de agregar un nuevo dato desde el select. Si esta prop existe, se generara un item en el selector que dira "Agregar Nuevo." Al tocar esta opcion, el select se convierte en un input al que se le debe ingresar el dato a agregar.

- `setChangeSelect` y `changeSelect` = es un callback con una variable de estado que cumple la funcion de alternar el valor de convertir a input,

- `nombreCampo` es el valor con el que se va a registrar el select en el formulario, si se le manda "Tipo" entonces en el form del padre, el valor seleccionado del select aparecera como Tipo: \*lo q se haya seleccionado\*,

- `valorPorDefecto` es un string que setea en el form del padre un valor por defecto del select.

- `tieneValorPorDefecto` es una dependencia de un useEffect del componente que establece si se desea una opcion por defecto o no. Se debe pasar el Object.value como parametro

- `getValues` se pasa para poder acceder a los valores del form del hijo en el padre. El get values se pasa desde el padre

- `getValues` para acceder a los valores del form del padre desde el hijo

-`className` e `id` son atributos que pueden mandarse para establecerlos al componente. Si no se pasan el selector generico ya cuenta con un id propio y una className propia.

```
import React, { useState } from "react";
import { SelectorGenerico } from "react-shared-components";
import { useForm } from "react-hook-form";
```

Se debe usar el useForm hook ya que se pasan las funciones de setValue y register como prop :

```
  const {
    register,
    setValue,
    getValues,
  } = useForm();
```

Aqui a modo de ejemplo se crea un estado con su estado inicial a un arreglo harcodeado previamente. En la realidad, este arreglo va a ser traido de base de datos

```
const [arregloDeDatos, setArregloDeDatos] = useState(arreglo);
```

Esta fuincion se ejecuta en el submit del form. Toma el dato de el dato q se quiere agregar (en el caso q asi sea) y lo setea como nuevo elemento en el array de elementos

```
const [changeSelect, setChangeSelect] = useState(false);

const submit = (e) => {
    e.preventDefault();
    const datoNuevo = getValues().datoAgregable;
    setArregloDeDatos([
    ...arregloDeDatos,
    { value: datoNuevo, label: datoNuevo },
    ]);
    setChangeSelect(false);
    setValue("ejemplo", "");
    setValue("datoAgregable", "");
};
```

Aqui se llama desde el padre. En este caso se le pasa unvalor por defecto

```
return (
<form
onSubmit={(e) => {
handleSubmit(submit(e));
}} >
 <SelectorGenerico
                register={register}
                setValue={setValue}
                arregloDeDatos={arregloTipoContacto}
                label={"Tipo"}
                nombreCampo={"tipo"}
                tieneValorPorDefecto={true}
                valorPorDefecto={arregloTipoContacto[0]?.value}
              />
/>
<input type="submit" />
</form>
);A
};
```

## Changelog

Todos los cambios realizados se registraran en esta seccion.

El formato esta basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y la nomenclatura para las versiones en [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2022-08-17

Agregada prop `onChange`. Esta prop se usa para mandar un callback al padre cuando se cambia el valor del select.

## [1.1.0] - 2022-07-20

El selector generico devuelve el objeto seleccionado en formato {value; label}

## [1.0.0] - 2022-06-24

### Added

Version inicial
