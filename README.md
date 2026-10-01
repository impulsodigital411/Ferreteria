# Ferretería Impulso — demo funcional

Maqueta demostrativa sobre los archivos existentes (`index.html`, `styles.css`, `app.js`). Abrir `index.html` en el navegador. Los datos ficticios se conservan en `localStorage` y el administrador puede restablecerlos desde la barra superior.

## Menú principal

### Dashboard
Resumen general del negocio.

### Stock e Inventario
- Productos
- Categorías
- Movimientos de stock
- Compras

### Contabilidad
- Ventas
- Caja / Finanzas
- Reportes

### Personal
- Empleados
- Asistencias

### Administración
- Usuarios

## Demo funcional
Ventas es la primera pantalla después del ingreso. Una venta confirmada actualiza stock, genera movimientos de salida e ingreso en caja. Anularla revierte esos efectos y mantiene la trazabilidad.

Las compras pueden incluir varios productos; registrar o modificar una compra actualiza existencias, costos, entradas de stock y egresos en caja. Una compra solo puede anularse si aún queda stock suficiente para revertirla. Los movimientos manuales de stock y caja admiten anulación sin eliminar el historial.

Hay búsquedas, filtros, detalles, altas, ediciones y desactivaciones lógicas en los módulos administrativos. Los reportes incluyen filtro por período.

El módulo Personal incorpora:
- CRUD de empleados.
- Sectores y puestos.
- Estado activo/inactivo.
- Lector de huella simulado con selección de empleado exclusivamente para la demo.
- Primera lectura: sesión abierta y entrada. Segunda lectura: salida y horas trabajadas calculadas.
- Historial, correcciones con motivo, anulaciones, filtros e indicadores por empleado.

El vendedor accede a ventas y a la consulta del inventario, sin precios de costo ni módulos administrativos. El administrador puede crear usuarios con contraseña y permisos según el rol. Las claves son locales y ficticias: no se trata de autenticación de producción.

## Accesos de demostración
Administrador:
- Usuario: admin
- Contraseña: admin123

Vendedor:
- Usuario: vendedor
- Contraseña: vendedor123

Los usuarios creados en la demo también pueden iniciar sesión con su contraseña local.
