# 🎬 Cine de Verano

Este proyecto nació como un ejercicio de bootcamp y lo retomé para llevarlo más lejos.
La idea era simple: ¿hasta dónde puedo llegar con JavaScript vanilla puro, sin frameworks, sin librerías de UI?

El resultado es un CRUD completo con arquitectura modular, diseño propio y deploy real.
Usa una fake API con json-server — no es una solución escalable, y lo sé — pero el objetivo
era demostrar que entiendo la separación de responsabilidades, el flujo cliente-servidor
y cómo construir una interfaz cuidada desde cero.

🔗 **[Ver demo en vivo](https://gabriela-her.github.io/cine-de-verano-crud)**

---

## ¿Qué hace esta app?

- Consultar el catálogo completo de películas
- Añadir nuevas películas con título, director y sinopsis
- Editar cualquier película existente
- Eliminar películas con confirmación
- Buscar en tiempo real por título o director

## Tecnologías

| Capa | Tecnología |
|------|------------|
| Frontend | HTML5, CSS3, JavaScript vanilla (ES Modules) |
| Backend | json-server |
| Deploy frontend | GitHub Pages |
| Deploy backend | Railway |

## 🗂️ Arquitectura
```
cine-de-verano-crud/
├── index.html
├── public/
├── server/
│   └── db.json          # Base de datos
├── src/
│   ├── styles.css
│   └── js/
│       ├── config.js    # URL base de la API
│       ├── api.js       # Llamadas al servidor (fetch)
│       ├── ui.js        # Manipulación del DOM
│       └── app.js       # Punto de entrada y eventos
└── package.json
```

## Decisiones técnicas

- **ES Modules** en lugar de un solo archivo para separar responsabilidades
- **Arquitectura en capas**: api / ui / app — cada archivo tiene una única responsabilidad
- **Sin frameworks** — proyecto construido con JS vanilla para afianzar los fundamentos
- **Notificaciones inline** en lugar de `alert()` para mejor experiencia de usuario
- **Event delegation** en el grid de películas para manejar clicks dinámicos

## 🚀 Correr en local
```bash
# Clona el repositorio
git clone https://github.com/gabriela-her/cine-de-verano-crud

# Instala dependencias
npm install

# Inicia el servidor
npm start
```

Abre `index.html` con Live Server en VS Code.

## 📌 Próximas mejoras

- [ ] Filtrado por género
- [ ] Modo claro / oscuro
- [ ] Puntuación con estrellas
- [ ] Paginación
