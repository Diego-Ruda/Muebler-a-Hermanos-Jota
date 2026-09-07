# Guía Paso a Paso: Guía Básica de Git y GitHub

¡Bienvenido/a! Esta guía te enseñará desde cero a trabajar con **Git** y **GitHub** utilizando un flujo de trabajo basado en ramas (*branches*).

---

## Conceptos Clave (Antes de Empezar)

* **Repositorio (Repo):** La carpeta de tu proyecto donde Git guarda el historial de cambios.
* **Commit:** Una "foto" o punto de guardado de tus archivos en un momento determinado.
* **Rama (Branch):** Una copia paralela del proyecto para hacer cambios de forma segura sin romper la rama principal (`main`).
* **GitHub:** La plataforma en la nube donde se guarda y comparte el repositorio.

---

## El Flujo de Trabajo Completo (Paso a Paso)

### Paso 1: Descargar el proyecto a tu computadora
Para obtener una copia del repositorio remoto en tu máquina:

```bash
git clone https://github.com/Diego-Ruda/Muebler-a-Hermanos-Jota.git

git status ---> Muestra el estado actual de tus archivos.
git checkout -b <nombre> ---> Crea una rama nueva y entra en ella.
git checkout <nombre> ---> Cambia a una rama existente.
git branch ---> Muestra la lista de ramas locales.
git add . ---> Prepara todos los cambios para el commit.
git commit -m "mensaje" ---> Guarda los cambios preparados en el historial.
git push ---> Sube tus cambios a GitHub.
git pull ---> Descarga los cambios más recientes de GitHub.
```