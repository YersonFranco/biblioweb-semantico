/**
 * BiblioWeb - js/auth.js
 * Manejo de autenticación, control de acceso y cierre de sesión con sessionStorage
 */

(function () {
  'use strict';

  const SESSION_KEY = 'biblioweb_user_session';
  const CRED_CORREO = 'admin@biblioweb.test';
  const CRED_CLAVE = 'Admin123';

  // Página actual
  const path = window.location.pathname;
  const isLoginPage = path.includes('login.html');
  const isAdminPage = path.includes('admin.html');

  // Comprobar si hay sesión activa
  function isUserAuthenticated() {
    return sessionStorage.getItem(SESSION_KEY) !== null;
  }

  // Iniciar sesión
  function login(email, password) {
    if (email === CRED_CORREO && password === CRED_CLAVE) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        email: email,
        rol: 'Administrador General',
        loginTime: new Date().toISOString()
      }));
      return true;
    }
    return false;
  }

  // Cerrar sesión
  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = '../index.html';
  }

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Protección de la página admin.html
    if (isAdminPage) {
      if (!isUserAuthenticated()) {
        window.location.href = 'login.html';
        return;
      }

      // Conectar botón de cerrar sesión
      const logoutBtn = document.getElementById('btn-logout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          logout();
        });
      }
    }

    // 2. Lógica del formulario de login.html
    if (isLoginPage) {
      // Si ya está autenticado, llevar directo a admin
      if (isUserAuthenticated()) {
        window.location.href = 'admin.html';
        return;
      }

      const loginForm = document.getElementById('form-login');
      const errorAlert = document.getElementById('login-error-msg');

      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const emailInput = document.getElementById('email').value.trim();
          const passInput = document.getElementById('password').value;

          if (login(emailInput, passInput)) {
            if (errorAlert) errorAlert.classList.add('d-none');
            window.location.href = 'admin.html';
          } else {
            if (errorAlert) {
              errorAlert.textContent = 'Correo o contraseña incorrectos';
              errorAlert.classList.remove('d-none');
            }
          }
        });
      }

      // Botón auxiliar para cargar credenciales de prueba
      const btnTestCredentials = document.getElementById('btn-cargar-credenciales');
      if (btnTestCredentials) {
        btnTestCredentials.addEventListener('click', () => {
          const emailInput = document.getElementById('email');
          const passInput = document.getElementById('password');
          if (emailInput && passInput) {
            emailInput.value = CRED_CORREO;
            passInput.value = CRED_CLAVE;
          }
        });
      }
    }
  });
})();
