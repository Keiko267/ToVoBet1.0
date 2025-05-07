# Tobovet

Este proyecto contiene dos partes principales:

- **tobovetAPI** – La API del backend.
- **tobovetAPP** – La aplicación frontend.

## 🚀 Instrucciones para instalar y ejecutar el proyecto

### 1. Descargar el proyecto

Clona este repositorio:

```bash
git clone https://github.com/tu-usuario/tobovet.git
cd tobovet
```

### 2. Instalar dependencias

Desde la raíz del proyecto, ejecuta:

```bash
npm install
```

> O bien instala manualmente las dependencias en cada subproyecto:

```bash
cd tobovetAPI
npm install
cd ../tobovetAPP
npm install
```

### 3. Iniciar el servidor (API)

```bash
cd tobovetAPI
npm start
```

### 4. Iniciar la aplicación (App)

En otra terminal:

```bash
cd tobovetAPP
npm start
```

### 5. Base de datos

Descarga el archivo `Dump20250507.sql`, que incluye el esquema y algunos datos de prueba.

Importa el archivo en tu gestor de base de datos (MySQL/MariaDB):

```bash
mysql -u tu_usuario -p nombre_base_datos < tobovet.sql
```

---

¡Listo! Ya puedes empezar a usar Tobovet en tu entorno local.

📄 **Documentación completa**

Puedes consultar todos los detalles del proyecto en el archivo `ToBoVet_Memoria.pdf`, incluido en este repositorio.
