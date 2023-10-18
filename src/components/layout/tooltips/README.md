# Componente Tooltip

## Props: **requeridos**

- **children**: Componente hijo del tooltip. Debe ser único y referenciable.
- **title**: String mensaje del tooltip.
- enterDelay: Demora de apertura del tooltip en ms.
- leaveDelay: Demora de cierre del tooltip desde que sale el cursor en ms.
- enterNextDelay: Tiempo de espera entre tooltips en ms.
- hideOnFocus: Boolean. Se oculta el tooltip cuando el hijo obtiene el foco. Valor por defecto es _true_
- disableHover: Boolean. Desactiva el escuchador de eventos de foco. Valor por defecto es _false_

## hideOnFocus:

Cuando se pone en _true_ se sobreescriben los event handlers _onMouseLeave_, _onMouseEnter_, _onFocus_ y _onBlur_ del componentente hijo.

## estilos:

Clases de MUI:

.MuiTooltip-tooltipArrow -- contenedor
.MuiTooltip-arrow -- flecha

## Changelog

Todos los cambios realizados se registraran en esta seccion.

El formato esta basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y la nomenclatura para las versiones en [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2022-06-24

### Added

Version inicial
