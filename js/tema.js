/**
 * BiblioWeb - js/tema.js
 * Selector y persistencia del tema claro / oscuro utilizando Bootstrap 5.3 (data-bs-theme)
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'biblioweb_theme';

  // Obtener tema almacenado o preferencia del sistema
  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Aplicar tema en el elemento <html>
  function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateThemeButton(theme);
  }

  // Actualizar icono y texto del botón conmutador
  function updateThemeButton(theme) {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    if (theme === 'dark') {
      toggleBtn.innerHTML = '🌙';
      toggleBtn.setAttribute('title', 'Cambiar a modo claro');
      toggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
    } else {
      toggleBtn.innerHTML = '☀️';
      toggleBtn.setAttribute('title', 'Cambiar a modo oscuro');
      toggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }
  }

  // Ejecución inmediata para evitar parpadeo blanco
  const initialTheme = getPreferredTheme();
  document.documentElement.setAttribute('data-bs-theme', initialTheme);

  // Escuchar cuando el DOM esté listo para asociar el listener del botón
  document.addEventListener('DOMContentLoaded', () => {
    updateThemeButton(initialTheme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
      });
    }
  });
})();
