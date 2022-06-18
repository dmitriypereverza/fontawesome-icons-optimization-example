# Исходный код проекта к статье **"Оптимизация загрузки иконок для уменьшения размера js бандла"**

Для переключения между начальной и оптимизированной версией просто закомментируйте лишнюю версию.

```typescript jsx
// src/index.tsx

ReactDOM.render(
  <React.StrictMode>
    <App /> {/* Начальная версия */}
    <AppBig /> {/* Оптимизированная версия */}
  </React.StrictMode>,
  document.getElementById("root")
);
```

Для генерации map-файлов иконок нужно выполнить.
```shell
npm run generate-icons-maps
```
