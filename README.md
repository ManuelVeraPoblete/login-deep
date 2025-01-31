
Para crear una API en Node.js que cumpla con los requisitos que mencionas, vamos a seguir un enfoque modularizado y respetando los principios SOLID. A continuación, te proporcionaré una guía paso a paso para implementar esta API.

Estructura del Proyecto
Primero, vamos a definir la estructura del proyecto:

Copy
/proyecto
  /src
    /controllers
      - authController.js
      - roleController.js
    /models
      - userModel.js
      - roleModel.js
    /routes
      - authRoutes.js
      - roleRoutes.js
    /services
      - authService.js
      - emailService.js
      - roleService.js
    /utils
      - validations.js
      - authUtils.js
    /config
      - db.js
    /middlewares
      - authMiddleware.js
    app.js
  .env
  package.json


1. Registro de Usuario
Ruta: POST /auth/register

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user"
}'
2. Confirmación de Correo Electrónico
Ruta: GET /auth/confirm-email?token=<token>

CURL:

bash
Copy
curl -X GET "http://localhost:3000/auth/confirm-email?token=<token>"
Nota: Reemplaza <token> con el token que recibiste en el correo electrónico.

3. Login de Usuario
Ruta: POST /auth/login

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
4. Crear un Rol
Ruta: POST /api/roles

CURL:

bash
Copy
curl -X POST http://localhost:3000/api/roles \
-H "Content-Type: application/json" \
-d '{
  "name": "admin"
}'
5. Obtener Todos los Roles
Ruta: GET /api/roles

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles
6. Obtener un Rol por ID
Ruta: GET /api/roles/:id

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles/1
7. Login con Google (Opcional)
Ruta: GET /auth/google

CURL:

bash
Copy
curl -X GET http://localhost:3000/auth/google
Nota: Esta ruta redirige al usuario a la página de autenticación de Google. No es posible probarla directamente con curl ya que requiere interacción del usuario en el navegador.

8. Callback de Google (Opcional)
Ruta: GET /auth/google/callback

CURL:

bash
Copy
curl -X GET http://localhost:3000/auth/google/callback
Nota: Esta ruta es manejada por Passport.js y no se puede probar directamente con curl ya que requiere la redirección desde Google después de la autenticación.

9. Validaciones (Ejemplo de Error)
Ruta: POST /auth/register (con datos inválidos)

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "",
  "email": "invalid-email",
  "password": "123",
  "role": ""
}'
Respuesta Esperada:

json
Copy
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Role is required",
      "param": "role",
      "location": "body"
    }
  ]
}
10. Obtener Token de Autenticación (Login)
Ruta: POST /auth/login

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
Respuesta Esperada:

json
Copy
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
11. Uso del Token de Autenticación (Protegido)
Ruta: GET /api/roles (Protegida)

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles \
-H "Authorization: Bearer <token>"
Nota: Reemplaza <token> con el token que obtuviste al hacer login.

12. Error de Autenticación (Token Inválido)
Ruta: GET /api/roles (Protegida)

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles \
-H "Authorization: Bearer invalidtoken"
Respuesta Esperada:

json
Copy
{
  "error": "Invalid token"
}
13. Error de Autenticación (Token No Proporcionado)
Ruta: GET /api/roles (Protegida)

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles
Respuesta Esperada:

json
Copy
{
  "error": "Access denied"
}
14. Confirmación de Correo Electrónico (Token Inválido)
Ruta: GET /auth/confirm-email?token=<invalid-token>

CURL:

bash
Copy
curl -X GET "http://localhost:3000/auth/confirm-email?token=invalidtoken"
Respuesta Esperada:

json
Copy
{
  "error": "Invalid token"
}
15. Confirmación de Correo Electrónico (Token Válido)
Ruta: GET /auth/confirm-email?token=<valid-token>

CURL:

bash
Copy
curl -X GET "http://localhost:3000/auth/confirm-email?token=validtoken"
Respuesta Esperada:

json
Copy
{
  "message": "Email confirmed successfully"
}
16. Crear Rol (Datos Inválidos)
Ruta: POST /api/roles

CURL:

bash
Copy
curl -X POST http://localhost:3000/api/roles \
-H "Content-Type: application/json" \
-d '{
  "name": ""
}'
Respuesta Esperada:

json
Copy
{
  "error": "Role name is required"
}
17. Obtener Rol por ID (ID Inválido)
Ruta: GET /api/roles/:id

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles/999
Respuesta Esperada:

json
Copy
{
  "error": "Role not found"
}
18. Obtener Rol por ID (ID Válido)
Ruta: GET /api/roles/:id

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles/1
Respuesta Esperada:

json
Copy
{
  "id": 1,
  "name": "admin",
  "created_at": "2023-10-01T12:00:00.000Z"
}
19. Login con Credenciales Inválidas
Ruta: POST /auth/login

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "wrongpassword"
}'
Respuesta Esperada:

json
Copy
{
  "error": "Invalid credentials"
}
20. Login con Correo No Confirmado
Ruta: POST /auth/login

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
Respuesta Esperada:

json
Copy
{
  "error": "Please confirm your email"
}
21. Registro con Correo Ya Existente
Ruta: POST /auth/register

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user"
}'
Respuesta Esperada:

json
Copy
{
  "error": "Email already exists"
}
22. Obtener Todos los Roles (Sin Autenticación)
Ruta: GET /api/roles

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles
Respuesta Esperada:

json
Copy
{
  "error": "Access denied"
}
23. Obtener Todos los Roles (Con Autenticación)
Ruta: GET /api/roles

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles \
-H "Authorization: Bearer <token>"
Respuesta Esperada:

json
Copy
[
  {
    "id": 1,
    "name": "admin",
    "created_at": "2023-10-01T12:00:00.000Z"
  },
  {
    "id": 2,
    "name": "user",
    "created_at": "2023-10-01T12:00:00.000Z"
  }
]
24. Crear Rol (Con Autenticación)
Ruta: POST /api/roles

CURL:

bash
Copy
curl -X POST http://localhost:3000/api/roles \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
  "name": "moderator"
}'
Respuesta Esperada:

json
Copy
{
  "message": "Role created",
  "roleId": 3
}
25. Obtener Rol por ID (Con Autenticación)
Ruta: GET /api/roles/:id

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles/1 \
-H "Authorization: Bearer <token>"
Respuesta Esperada:

json
Copy
{
  "id": 1,
  "name": "admin",
  "created_at": "2023-10-01T12:00:00.000Z"
}
26. Login con Google (Redirección)
Ruta: GET /auth/google

CURL:

bash
Copy
curl -X GET http://localhost:3000/auth/google
Respuesta Esperada:

html
Copy
Redirección a la página de autenticación de Google
Run HTML
27. Callback de Google (Redirección)
Ruta: GET /auth/google/callback

CURL:

bash
Copy
curl -X GET http://localhost:3000/auth/google/callback
Respuesta Esperada:

html
Copy
Redirección a la página principal de la aplicación
Run HTML
28. Validaciones (Ejemplo de Error en Login)
Ruta: POST /auth/login

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "invalid-email",
  "password": ""
}'
Respuesta Esperada:

json
Copy
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password is required",
      "param": "password",
      "location": "body"
    }
  ]
}
29. Validaciones (Ejemplo de Error en Crear Rol)
Ruta: POST /api/roles

CURL:

bash
Copy
curl -X POST http://localhost:3000/api/roles \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
  "name": ""
}'
Respuesta Esperada:

json
Copy
{
  "error": "Role name is required"
}
30. Validaciones (Ejemplo de Error en Registro)
Ruta: POST /auth/register

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "",
  "email": "invalid-email",
  "password": "123",
  "role": ""
}'
Respuesta Esperada:

json
Copy
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Role is required",
      "param": "role",
      "location": "body"
    }
  ]
}
31. Obtener Token de Autenticación (Login con Google)
Ruta: GET /auth/google/callback

CURL:

bash
Copy
curl -X GET http://localhost:3000/auth/google/callback
Respuesta Esperada:

json
Copy
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
32. Uso del Token de Autenticación (Protegido con Google)
Ruta: GET /api/roles (Protegida)

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles \
-H "Authorization: Bearer <token>"
Nota: Reemplaza <token> con el token que obtuviste al hacer login con Google.

33. Error de Autenticación (Token Inválido con Google)
Ruta: GET /api/roles (Protegida)

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles \
-H "Authorization: Bearer invalidtoken"
Respuesta Esperada:

json
Copy
{
  "error": "Invalid token"
}
34. Error de Autenticación (Token No Proporcionado con Google)
Ruta: GET /api/roles (Protegida)

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles
Respuesta Esperada:

json
Copy
{
  "error": "Access denied"
}
35. Confirmación de Correo Electrónico (Token Inválido con Google)
Ruta: GET /auth/confirm-email?token=<invalid-token>

CURL:

bash
Copy
curl -X GET "http://localhost:3000/auth/confirm-email?token=invalidtoken"
Respuesta Esperada:

json
Copy
{
  "error": "Invalid token"
}
36. Confirmación de Correo Electrónico (Token Válido con Google)
Ruta: GET /auth/confirm-email?token=<valid-token>

CURL:

bash
Copy
curl -X GET "http://localhost:3000/auth/confirm-email?token=validtoken"
Respuesta Esperada:

json
Copy
{
  "message": "Email confirmed successfully"
}
37. Crear Rol (Datos Inválidos con Google)
Ruta: POST /api/roles

CURL:

bash
Copy
curl -X POST http://localhost:3000/api/roles \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
  "name": ""
}'
Respuesta Esperada:

json
Copy
{
  "error": "Role name is required"
}
38. Obtener Rol por ID (ID Inválido con Google)
Ruta: GET /api/roles/:id

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles/999 \
-H "Authorization: Bearer <token>"
Respuesta Esperada:

json
Copy
{
  "error": "Role not found"
}
39. Obtener Rol por ID (ID Válido con Google)
Ruta: GET /api/roles/:id

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles/1 \
-H "Authorization: Bearer <token>"
Respuesta Esperada:

json
Copy
{
  "id": 1,
  "name": "admin",
  "created_at": "2023-10-01T12:00:00.000Z"
}
40. Login con Credenciales Inválidas (Google)
Ruta: POST /auth/login

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "wrongpassword"
}'
Respuesta Esperada:

json
Copy
{
  "error": "Invalid credentials"
}
41. Login con Correo No Confirmado (Google)
Ruta: POST /auth/login

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
Respuesta Esperada:

json
Copy
{
  "error": "Please confirm your email"
}
42. Registro con Correo Ya Existente (Google)
Ruta: POST /auth/register

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user"
}'
Respuesta Esperada:

json
Copy
{
  "error": "Email already exists"
}
43. Obtener Todos los Roles (Sin Autenticación con Google)
Ruta: GET /api/roles

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles
Respuesta Esperada:

json
Copy
{
  "error": "Access denied"
}
44. Obtener Todos los Roles (Con Autenticación con Google)
Ruta: GET /api/roles

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles \
-H "Authorization: Bearer <token>"
Respuesta Esperada:

json
Copy
[
  {
    "id": 1,
    "name": "admin",
    "created_at": "2023-10-01T12:00:00.000Z"
  },
  {
    "id": 2,
    "name": "user",
    "created_at": "2023-10-01T12:00:00.000Z"
  }
]
45. Crear Rol (Con Autenticación con Google)
Ruta: POST /api/roles

CURL:

bash
Copy
curl -X POST http://localhost:3000/api/roles \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
  "name": "moderator"
}'
Respuesta Esperada:

json
Copy
{
  "message": "Role created",
  "roleId": 3
}
46. Obtener Rol por ID (Con Autenticación con Google)
Ruta: GET /api/roles/:id

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles/1 \
-H "Authorization: Bearer <token>"
Respuesta Esperada:

json
Copy
{
  "id": 1,
  "name": "admin",
  "created_at": "2023-10-01T12:00:00.000Z"
}
47. Login con Google (Redirección)
Ruta: GET /auth/google

CURL:

bash
Copy
curl -X GET http://localhost:3000/auth/google
Respuesta Esperada:

html
Copy
Redirección a la página de autenticación de Google
Run HTML
48. Callback de Google (Redirección)
Ruta: GET /auth/google/callback

CURL:

bash
Copy
curl -X GET http://localhost:3000/auth/google/callback
Respuesta Esperada:

html
Copy
Redirección a la página principal de la aplicación
Run HTML
49. Validaciones (Ejemplo de Error en Login con Google)
Ruta: POST /auth/login

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "invalid-email",
  "password": ""
}'
Respuesta Esperada:

json
Copy
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password is required",
      "param": "password",
      "location": "body"
    }
  ]
}
50. Validaciones (Ejemplo de Error en Crear Rol con Google)
Ruta: POST /api/roles

CURL:

bash
Copy
curl -X POST http://localhost:3000/api/roles \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
  "name": ""
}'
Respuesta Esperada:

json
Copy
{
  "error": "Role name is required"
}
51. Validaciones (Ejemplo de Error en Registro con Google)
Ruta: POST /auth/register

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "",
  "email": "invalid-email",
  "password": "123",
  "role": ""
}'
Respuesta Esperada:

json
Copy
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Role is required",
      "param": "role",
      "location": "body"
    }
  ]
}
52. Obtener Token de Autenticación (Login con Google)
Ruta: GET /auth/google/callback

CURL:

bash
Copy
curl -X GET http://localhost:3000/auth/google/callback
Respuesta Esperada:

json
Copy
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
53. Uso del Token de Autenticación (Protegido con Google)
Ruta: GET /api/roles (Protegida)

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles \
-H "Authorization: Bearer <token>"
Nota: Reemplaza <token> con el token que obtuviste al hacer login con Google.

54. Error de Autenticación (Token Inválido con Google)
Ruta: GET /api/roles (Protegida)

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles \
-H "Authorization: Bearer invalidtoken"
Respuesta Esperada:

json
Copy
{
  "error": "Invalid token"
}
55. Error de Autenticación (Token No Proporcionado con Google)
Ruta: GET /api/roles (Protegida)

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles
Respuesta Esperada:

json
Copy
{
  "error": "Access denied"
}
56. Confirmación de Correo Electrónico (Token Inválido con Google)
Ruta: GET /auth/confirm-email?token=<invalid-token>

CURL:

bash
Copy
curl -X GET "http://localhost:3000/auth/confirm-email?token=invalidtoken"
Respuesta Esperada:

json
Copy
{
  "error": "Invalid token"
}
57. Confirmación de Correo Electrónico (Token Válido con Google)
Ruta: GET /auth/confirm-email?token=<valid-token>

CURL:

bash
Copy
curl -X GET "http://localhost:3000/auth/confirm-email?token=validtoken"
Respuesta Esperada:

json
Copy
{
  "message": "Email confirmed successfully"
}
58. Crear Rol (Datos Inválidos con Google)
Ruta: POST /api/roles

CURL:

bash
Copy
curl -X POST http://localhost:3000/api/roles \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
  "name": ""
}'
Respuesta Esperada:

json
Copy
{
  "error": "Role name is required"
}
59. Obtener Rol por ID (ID Inválido con Google)
Ruta: GET /api/roles/:id

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles/999 \
-H "Authorization: Bearer <token>"
Respuesta Esperada:

json
Copy
{
  "error": "Role not found"
}
60. Obtener Rol por ID (ID Válido con Google)
Ruta: GET /api/roles/:id

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles/1 \
-H "Authorization: Bearer <token>"
Respuesta Esperada:

json
Copy
{
  "id": 1,
  "name": "admin",
  "created_at": "2023-10-01T12:00:00.000Z"
}
61. Login con Credenciales Inválidas (Google)
Ruta: POST /auth/login

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "wrongpassword"
}'
Respuesta Esperada:

json
Copy
{
  "error": "Invalid credentials"
}
62. Login con Correo No Confirmado (Google)
Ruta: POST /auth/login

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
Respuesta Esperada:

json
Copy
{
  "error": "Please confirm your email"
}
63. Registro con Correo Ya Existente (Google)
Ruta: POST /auth/register

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user"
}'
Respuesta Esperada:

json
Copy
{
  "error": "Email already exists"
}
64. Obtener Todos los Roles (Sin Autenticación con Google)
Ruta: GET /api/roles

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles
Respuesta Esperada:

json
Copy
{
  "error": "Access denied"
}
65. Obtener Todos los Roles (Con Autenticación con Google)
Ruta: GET /api/roles

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles \
-H "Authorization: Bearer <token>"
Respuesta Esperada:

json
Copy
[
  {
    "id": 1,
    "name": "admin",
    "created_at": "2023-10-01T12:00:00.000Z"
  },
  {
    "id": 2,
    "name": "user",
    "created_at": "2023-10-01T12:00:00.000Z"
  }
]
66. Crear Rol (Con Autenticación con Google)
Ruta: POST /api/roles

CURL:

bash
Copy
curl -X POST http://localhost:3000/api/roles \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
  "name": "moderator"
}'
Respuesta Esperada:

json
Copy
{
  "message": "Role created",
  "roleId": 3
}
67. Obtener Rol por ID (Con Autenticación con Google)
Ruta: GET /api/roles/:id

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles/1 \
-H "Authorization: Bearer <token>"
Respuesta Esperada:

json
Copy
{
  "id": 1,
  "name": "admin",
  "created_at": "2023-10-01T12:00:00.000Z"
}
68. Login con Google (Redirección)
Ruta: GET /auth/google

CURL:

bash
Copy
curl -X GET http://localhost:3000/auth/google
Respuesta Esperada:

html
Copy
Redirección a la página de autenticación de Google
Run HTML
69. Callback de Google (Redirección)
Ruta: GET /auth/google/callback

CURL:

bash
Copy
curl -X GET http://localhost:3000/auth/google/callback
Respuesta Esperada:

html
Copy
Redirección a la página principal de la aplicación
Run HTML
70. Validaciones (Ejemplo de Error en Login con Google)
Ruta: POST /auth/login

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "invalid-email",
  "password": ""
}'
Respuesta Esperada:

json
Copy
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password is required",
      "param": "password",
      "location": "body"
    }
  ]
}
71. Validaciones (Ejemplo de Error en Crear Rol con Google)
Ruta: POST /api/roles

CURL:

bash
Copy
curl -X POST http://localhost:3000/api/roles \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
  "name": ""
}'
Respuesta Esperada:

json
Copy
{
  "error": "Role name is required"
}
72. Validaciones (Ejemplo de Error en Registro con Google)
Ruta: POST /auth/register

CURL:

bash
Copy
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "",
  "email": "invalid-email",
  "password": "123",
  "role": ""
}'
Respuesta Esperada:

json
Copy
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Role is required",
      "param": "role",
      "location": "body"
    }
  ]
}
73. Obtener Token de Autenticación (Login con Google)
Ruta: GET /auth/google/callback

CURL:

bash
Copy
curl -X GET http://localhost:3000/auth/google/callback
Respuesta Esperada:

json
Copy
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
74. Uso del Token de Autenticación (Protegido con Google)
Ruta: GET /api/roles (Protegida)

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles \
-H "Authorization: Bearer <token>"
Nota: Reemplaza <token> con el token que obtuviste al hacer login con Google.

75. Error de Autenticación (Token Inválido con Google)
Ruta: GET /api/roles (Protegida)

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles \
-H "Authorization: Bearer invalidtoken"
Respuesta Esperada:

json
Copy
{
  "error": "Invalid token"
}
76. Error de Autenticación (Token No Proporcionado con Google)
Ruta: GET /api/roles (Protegida)

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles
Respuesta Esperada:

json
Copy
{
  "error": "Access denied"
}
77. Confirmación de Correo Electrónico (Token Inválido con Google)
Ruta: GET /auth/confirm-email?token=<invalid-token>

CURL:

bash
Copy
curl -X GET "http://localhost:3000/auth/confirm-email?token=invalidtoken"
Respuesta Esperada:

json
Copy
{
  "error": "Invalid token"
}
78. Confirmación de Correo Electrónico (Token Válido con Google)
Ruta: GET /auth/confirm-email?token=<valid-token>

CURL:

bash
Copy
curl -X GET "http://localhost:3000/auth/confirm-email?token=validtoken"
Respuesta Esperada:

json
Copy
{
  "message": "Email confirmed successfully"
}
79. Crear Rol (Datos Inválidos con Google)
Ruta: POST /api/roles

CURL:

bash
Copy
curl -X POST http://localhost:3000/api/roles \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
  "name": ""
}'
Respuesta Esperada:

json
Copy
{
  "error": "Role name is required"
}
80. Obtener Rol por ID (ID Inválido con Google)
Ruta: GET /api/roles/:id

CURL:

bash
Copy
curl -X GET http://localhost:3000/api/roles/999 \
-H "Authorization: Bearer <token>"
Respuesta Esperada:

json
Copy
{
  "error": "Role not found"
}
81. Obtener Rol por ID (ID Válido con Google)
Ruta: GET /api/roles/:id

