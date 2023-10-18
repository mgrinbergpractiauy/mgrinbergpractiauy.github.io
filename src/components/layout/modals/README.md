# Componente Modal

## Descripcion

Componente de modal generico

## Inicio

### Dependencias

### Instalacion

- npm i

### Uso

- A continuacion se detalla el uso basico del componente

## Modos de operación

### Con Toggler

Para ahorrarse el control del estado del modal se puede usar uno de los siguientes modos de operación.

- `link`:
  Para que el componente se abra mediante un elemento nativo de tipo _link_ pasar el string `link` en la propiedad `togglerType` y
  el texto deseado en el link en la propiedad `togglerText`.

- `Button`:
  Para que el modal se abra mediante un componente _Button_ pasar el string `button` en la propiedad `togglerType` y el contenido
  del botón en la popiedad `togglerText`.

- Toggler custom:
  Para usar otro tipo de componente para activar el modal se pasa en la propiedad `toggler` un callback que acepte un handler onClick y retorne
  el componente y dejar indefinidas las propiedades `togglerType` y `togglerText`. Si se pasa un valor válido en `togglerType` se usará el modo indicado
  por esta propiedad en lugar del componente toggler, si se pasa un valor inválido la propiedad se ignora y se intenta usar el toggler.

En todos los modos anteriores el Modal acepta un callback `togglerOnClick`, que se ejecuta cuando el Toggler, sea del tipo que sea, recibe un clic.

### Sin Toggler

Si se desea controlar el estado del modal externamente dejar ambas propiedades `toggler` y `togglerType` indefinidas y se debe
proveer un boolean `show` y un callback `onHide`, que sirven para controlar que se muestre el modal y responder a los eventos de cierre del modal
respectivamente.

---

## Ejemplos de uso

### Con Toggler

```JavaScript
<Modal
    titleText="Modal Title"
    titleIcon="🔥"
    bodyText="Modal Body"
    toggler={(props) => (
        <Button variant="primary" onClick={props.onClick}>
        Mostrar modal
        </Button>
    )}
/>
```

### Sin Toggler

```JavaScript
const [showModal, setShowModal] = useState(false);

const onHide = () => {
    setShowModal(false);
}

<Button variant="primary" onClick={() => setShowModal(true)}>
    Mostrar modal
</Button>

<Modal
    titleText="Modal Title"
    titleIcon="🔥"
    bodyText="Modal Body"
    show={showModal}
    onHide={onHide}
/>
```

## Autores

Santiago Andreoli

## Changelog

Todos los cambios realizados se registraran en esta seccion.

El formato esta basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y la nomenclatura para las versiones en [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2022-08-02

### Added

Nuevo alias del Modal para mostrar un dialogo de confirmación

```JSX
  <ConfirmModal
    component="Confirmar acción"
    toggler={(props) => (<button onClick={props.onClick}>Acción</button>)}
    handleDialogo={(ok) => alert(ok ? "Sí" : "No")}
  />
```

_Este componente es una extensión de `<Modal />`, por lo que cualquier propiedad original será tomada en cuenta._

Nueva prop `dialogClassName`

## [1.0.2] - 2022-08-01

### Added

Nueva prop `closeBtn` para renderizar un boton de cierre custom

## [1.0.1] - 2022-07-15

### Added

Nuevas props `noHeader` y `footerClassName`

## [1.0.0] - 2022-06-24

### Added

Version inicial
