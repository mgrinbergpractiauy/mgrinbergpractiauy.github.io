# Data Table

## Descripción

## Inicio

### Dependencias

### Instalacion

- npm i

### Uso

- A continuacion se detalla el uso basico del componente

-

### Estilos

Para añadir estilos al DataTable se le pasa la siguiente prop al componente:

**classTable=" _estilo_ "**

Ejemplo de aplicación:

```

<DataTable

classTable="tablasEstiloBorde"

resizerClass="sinBorder"

columns={columns}

rows={rows}

loading={loading}

onPaginationChange={(paginacion) => {

onPaginationChange(paginacion);

}}

registrosTotales={registrosTotales}

sinCheckbox

/>

```

1. Estilo DataTable con borde:
   **classTable="tablasEstiloBorde"**
2. Estilo DataTable sin bordes:
   **classTable="sinBorder"**
3. Estilo DataTable filtro de busqueda:
   **classTable="tablaFiltro"**
4. Estilo DataTable color fila intercalado:
   **classTable="tablaIntercaladoColor"**

### Column Resizer

Se puede aplicar un estilo al componente de cambio de ancho de columna, mediante la siguiente prop:

**resizerClass="hoverVisible"**

Ejemplo de aplicación:

```

<DataTable

classTable="tablasEstiloBorde"

resizerClass="sinBorder"

columns={columns}

rows={rows}

loading={loading}

onPaginationChange={(paginacion) => {

onPaginationChange(paginacion);

}}

registrosTotales={registrosTotales}

sinCheckbox

/>

```

1. Estilo ColumnResizer sin borde:
   **resizerClass="sinBorder"**
2. Estilo ColumnResizer siempre visible con bordes:
   **resizerClass="siempreVisible"**
3. Estilo ColumnResizer oculto con Hover:
   **resizerClass="hoverVisible"**

## Autores

- Summum
- Peter Rabinowitsch - estilos

## Changelog

Todos los cambios realizados se registraran en esta seccion.

El formato esta basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

y la nomenclatura para las versiones en [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.1] - 2022-07-19

### Changed

- Propiedad `noSelect` previende rerender en `onClick`.

## [1.1.0] - 2022-07-14

### Added

- Nueva propiedad `noSelect` para evitar seleccionar línea al hacer clic.

## [1.0.3] - 2022-07-22

### Changed

Tomar en cuenta la propiedad `rowsPerPage` como valor inicial.

## [1.0.2] - 2022-07-20

se cambia src={`data:image/svg;base64,${row.imagen}`} a src={`data:image/svg;base64,${row[cell.label]}`}
Sino siempre espera un bobeto con imegen como prop y no siempre es asi.

## [1.0.1] - 2022-07-05

- Se le pasan estilos al DataTable
- Estilos a utilizar del ColumnResizer

## [1.0.0] - 2022-06-24

### Added

Version inicial
