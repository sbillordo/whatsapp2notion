# 📋 Plan de Acción: WhatsApp-Notion Automatización

## 🎯 Objetivo del Proyecto
Crear una API que reciba audios de WhatsApp, los transcriba con OpenAI, genere contenido inteligente y cree registros automáticos en tu base de datos personal de Notion.

---

## 📊 Estado General del Proyecto

### ✅ Ya Completado
- Estructura base del proyecto
- Carpetas api/whatsapp/ y api/process/
- **Tarea 1: Variables de entorno y constantes** ✅
- **Tarea 2: lib/whatsapp.ts completo** ✅ (5/5 funciones)
- **Tarea 3: lib/openai.ts completo** ✅ (3/3 funciones)
- **Tarea 4: lib/notion.ts completo** ✅ (función unificada)
- **Tarea 5: lib/store.ts completo** ✅ (con integración Notion)
- **Tarea 6: lib/text-utils.ts completo** ✅
- **Tarea 7: api/whatsapp/route.ts completo** ✅
- **Tarea 8: api/process/route.ts completo** ✅

### 🔄 En Progreso
- [ ] Ninguna tarea en progreso actualmente

### ⏳ Pendiente
- 4 tareas restantes por completar (Testing, Integraciones, Despliegue)

---

## 📚 **FASE 1: Fundamentos y Configuración** (2-3 horas)

### ✅ **Tarea 1: Configurar variables de entorno y constantes** 
**Estado:** ✅ **COMPLETADA**  
**Prioridad:** 🔴 Alta  
**Tiempo estimado:** 30-45 minutos

**¿Qué vas a aprender?** Gestión de secretos y configuración en proyectos Node.js

**Pasos detallados:**
1. [x] Crear archivo `.env.local` en la raíz del proyecto con estas variables:
   ```
   # Meta WhatsApp
   META_TOKEN=
   META_APP_SECRET=
   VERIFY_TOKEN=
   
   # OpenAI
   OPENAI_API_KEY=
   
   # Notion
   NOTION_API_KEY=
   NOTION_DATABASE_ID=
   
   # Interno
   INTERNAL_TOKEN=
   SELF_URL=
   ```

2. [x] Completar `config/constants.ts` con:
   - Valores por defecto de Notion (Priority, Status, P.A.R.A.)
   - Nombres exactos de propiedades de tu base de datos
   - Configuración de idioma y modelos de OpenAI

3. [x] Agregar `.env.local` al `.gitignore`

**Archivos a modificar:**
- `/.env.local` (crear)
- `/config/constants.ts` (completar)
- `/.gitignore` (actualizar)

**Skills que desarrollarás:** Seguridad básica, configuración de aplicaciones

---

## 🔧 **FASE 2: Construcción de Librerías Auxiliares** (4-6 horas)

### ✅ **Tarea 2: Completar lib/whatsapp.ts**
**Estado:** ✅ **COMPLETADA**  
**Prioridad:** 🔴 Alta  
**Tiempo estimado:** 1-1.5 horas

**¿Qué vas a aprender?** Integración con APIs externas, validación de firmas HMAC

**Funciones a implementar:**
- [x] `verifyMetaSignature(req, rawBody, appSecret)` - Validar firmas HMAC SHA-256
- [x] `getMediaUrl(mediaId)` - Obtener URL temporal desde Meta Graph API
- [x] `downloadAudio(mediaUrl)` - Descargar archivo de audio como Buffer
- [x] `sendWhatsappMessage(to, text)` - Enviar mensajes de confirmación
- [x] `extractMessagesFromWebhook(body)` - Parsear estructura de Meta

**Skills que desarrollarás:** HTTP requests, criptografía básica, manejo de buffers

### ✅ **Tarea 3: Corregir y completar lib/openia.ts → lib/openai.ts**
**Estado:** ✅ **COMPLETADA**  
**Prioridad:** 🔴 Alta  
**Tiempo estimado:** 1.5-2 horas

**¿Qué vas a aprender?** Integración con modelos de IA, procesamiento de audio y texto

**Pasos:**
1. [x] Renombrar archivo `lib/openia.ts` → `lib/openai.ts`
2. [x] Implementar funciones:
   - [x] `transcribeAudio(audioBuffer)` - Usar Whisper para audio→texto
   - [x] `classifyIntent(transcript)` - GPT para clasificar intención
   - [x] `generateContent(transcript, intent)` - Generar contenido estructurado

**Prompts a crear:**
- [ ] Prompt de clasificación (devuelve JSON con modo, prioridad, status, etc.)
- [ ] Prompt de generación (crea contenido según tipo: nota/guía/idea)

**Skills que desarrollarás:** APIs de IA, prompting, manejo de errores async

### ✅ **Tarea 4: Completar lib/notion.ts**
**Estado:** ✅ **COMPLETADA**  
**Prioridad:** 🟡 Media  
**Tiempo estimado:** 1-1.5 horas

**¿Qué vas a aprender?** Integración con bases de datos NoSQL, construcción de estructuras complejas

**Funciones implementadas:**
- [x] `createNotionPage(content, intent, messageId, transcript, mediaUrl)` - Función unificada que crea páginas completas con todas las propiedades y contenido

**Skills que desarrollarás:** Estructuras de datos, APIs REST, formateo de contenido

### ✅ **Tarea 5: Crear lib/store.ts**
**Estado:** ✅ **COMPLETADA**  
**Prioridad:** 🟡 Media  
**Tiempo estimado:** 45 minutos

**¿Qué vas a aprender?** Idempotencia y persistencia de datos

**Funciones implementadas:**
- [x] `isAlreadyProcessed(messageId)` - Verificar si mensaje ya procesado usando Notion como store

**Implementación final:** Integración inteligente con Notion - usa la base de datos principal como store anti-duplicados

**Skills que desarrollarás:** Prevención de duplicados, almacenamiento simple

### ✅ **Tarea 6: Completar lib/text-utils.ts**
**Estado:** ✅ **COMPLETADA**  
**Prioridad:** 🟢 Baja  
**Tiempo estimado:** 30-45 minutos

**¿Qué vas a aprender?** Procesamiento y limpieza de texto

**Funciones implementadas:**
- [x] `normalizeText(text)` - Limpiar y normalizar texto
- [x] `extractTags(text)` - Extraer tags con regex

**Skills que desarrollarás:** Regex, manipulación de strings, parsing

---

## 🚀 **FASE 3: Endpoints de la API** (3-4 horas)

### ✅ **Tarea 7: Completar api/whatsapp/route.ts**
**Estado:** ✅ **COMPLETADA**  
**Prioridad:** 🔴 Alta  
**Tiempo estimado:** 1.5-2 horas

**¿Qué vas a aprender?** Webhooks, validación de requests, orquestación

**Implementado:**
- [x] Método GET para verificación de webhook (hub.challenge)
- [x] Método POST para recibir mensajes
- [x] Validación de firma HMAC de Meta con función reutilizable
- [x] Extracción de mensajes (texto/audio) con función modular
- [x] Disparo asíncrono a `/api/process` sin esperar respuesta

**Skills que desarrollarás:** API endpoints, webhooks, fire-and-forget patterns

### ✅ **Tarea 8: Completar api/process/route.ts**
**Estado:** ✅ **COMPLETADA**  
**Prioridad:** 🔴 Alta  
**Tiempo estimado:** 1.5-2 horas

**¿Qué vas a aprender?** Orquestación de servicios, manejo de errores complejos

**Implementado:**
- [x] Validación de header x-internal
- [x] Control de idempotencia con Notion como store
- [x] Orquestación completa: audio→transcripción→clasificación→generación→Notion
- [x] Manejo de errores y validaciones
- [x] Confirmación automática por WhatsApp

**Skills que desarrollarás:** Arquitectura de microservicios, error handling, logging

---

## 🧪 **FASE 4: Testing y Debugging** (2-3 horas)

### 🚀 **TESTING RÁPIDO - Cómo probar tu sistema YA**

#### **Opción 1: Testing Local Simple (15 minutos)**
1. **Instalar dependencias**: `npm install`
2. **Configurar .env.local** con tus claves reales
3. **Ejecutar**: `npm run dev`
4. **Probar endpoints**:
   ```bash
   # Test webhook verification
   curl "http://localhost:3000/api/whatsapp?hub.mode=subscribe&hub.verify_token=TU_VERIFY_TOKEN&hub.challenge=test123"
   
   # Test process endpoint (simular mensaje de texto)
   curl -X POST http://localhost:3000/api/process \
     -H "Content-Type: application/json" \
     -H "x-internal: TU_INTERNAL_SECRET" \
     -d '{"messageId":"test123","from":"whatsapp:+1234567890","text":"Crear una nota sobre testing"}'
   ```

#### **Opción 2: Testing con Postman/Insomnia (20 minutos)**
1. **Crear colección** con estos requests:
   - GET `/api/whatsapp` (webhook verification)
   - POST `/api/process` (procesar mensaje de texto)
   - POST `/api/process` (procesar mensaje con mediaUrl simulada)

#### **Opción 3: Testing en Producción (30 minutos)**
1. **Deploy a Vercel**: `vercel --prod`
2. **Configurar webhook** en Meta Developer Console
3. **Enviar mensaje real** desde WhatsApp
4. **Verificar página** creada en Notion

### 🐛 **Debugging Común**
- **Error 403**: Verificar tokens en .env.local
- **Error 500**: Revisar logs en consola/Vercel
- **No crea página**: Verificar NOTION_DATABASE_ID y permisos
- **Audio no funciona**: Verificar OPENAI_API_KEY

---

### ✅ **Tarea 9: Testing del Sistema**
**Estado:** 🟢 **LISTO PARA USAR** - Usa las opciones de testing de arriba  
**Prioridad:** 🟡 Media  
**Tiempo estimado:** 15-30 minutos

**¿Qué vas a aprender?** Testing de APIs, debugging en tiempo real

**Opciones disponibles:**
- [x] Testing local con curl (más rápido)
- [x] Testing con Postman/Insomnia (más visual)
- [x] Testing en producción con WhatsApp real (más completo)

**Skills que desarrollarás:** Testing, debugging, desarrollo iterativo

---

## 🌐 **FASE 5: Integraciones Externas** (2-4 horas)

### ✅ **Tarea 10: Configurar Meta WhatsApp Cloud API**
**Estado:** ⏳ Pendiente  
**Prioridad:** 🟡 Media  
**Tiempo estimado:** 1-2 horas

**¿Qué vas a aprender?** Configuración de webhooks, verificación de aplicaciones

**Pasos:**
- [ ] Crear app de WhatsApp Business en Meta Developers
- [ ] Configurar webhook apuntando a tu API
- [ ] Obtener META_TOKEN y configurar META_APP_SECRET
- [ ] Configurar número de prueba
- [ ] Verificar recepción de webhooks

**Skills que desarrollarás:** Configuración de webhooks, APIs de terceros

### ✅ **Tarea 11: Configurar integración con Notion**
**Estado:** ⏳ Pendiente  
**Prioridad:** 🟡 Media  
**Tiempo estimado:** 1 hora

**¿Qué vas a aprender?** Integraciones de bases de datos, permisos

**Pasos:**
- [ ] Crear integración en Notion
- [ ] Compartir tu base de datos con la integración
- [ ] Obtener NOTION_API_KEY y NOTION_DATABASE_ID
- [ ] Mapear exactamente nombres de propiedades de tu DB
- [ ] Probar creación de páginas manualmente

**Skills que desarrollarás:** Integraciones de bases de datos, permisos y scopes

---

## 🚢 **FASE 6: Despliegue y Producción** (1-2 horas)

### ✅ **Tarea 12: Desplegar en Vercel y pruebas finales**
**Estado:** ⏳ Pendiente  
**Prioridad:** 🟢 Baja  
**Tiempo estimado:** 1-2 horas

**¿Qué vas a aprender?** Despliegue de aplicaciones, testing en producción

**Pasos:**
- [ ] Configurar variables de entorno en Vercel
- [ ] Desplegar aplicación
- [ ] Actualizar webhook URL en Meta
- [ ] Realizar pruebas end-to-end con audios reales
- [ ] Verificar creación de páginas en Notion

**Skills que desarrollarás:** DevOps básico, testing en producción

---

## 📝 **Registro de Progreso**

### Sesión del [Fecha]
**Tareas completadas:**
- [ ] [Descripción de tarea]

**Problemas encontrados:**
- [ ] [Descripción del problema y solución]

**Aprendizajes clave:**
- [ ] [Conceptos nuevos aprendidos]

**Próximos pasos:**
- [ ] [Qué hacer en la siguiente sesión]

---

## 🎓 **Skills Desarrollados**

### Al completar este proyecto habrás aprendido:
- [ ] **APIs REST**: Crear endpoints, manejar requests/responses
- [ ] **Integraciones**: Conectar múltiples servicios (Meta, OpenAI, Notion)
- [ ] **Arquitectura**: Separar responsabilidades en módulos
- [ ] **Seguridad**: Validar firmas, proteger endpoints internos
- [ ] **Async/Await**: Manejar operaciones asíncronas
- [ ] **Error Handling**: Gestionar errores y reintentos
- [ ] **Webhooks**: Recibir y procesar eventos en tiempo real
- [ ] **IA Integration**: Usar modelos de OpenAI para transcripción y generación
- [ ] **NoSQL**: Trabajar con APIs de bases de datos como Notion
- [ ] **Deployment**: Llevar tu aplicación a producción

---

## 📖 **Consejos Pedagógicos**

- **Empieza por las librerías**: Son piezas pequeñas y testeable individualmente
- **Prueba cada función**: Usa `console.log()` para entender qué retorna cada función
- **Un archivo a la vez**: No pases al siguiente hasta que el actual funcione
- **Lee errores**: Los errores son tus maestros, te dicen exactamente qué falta
- **Usa el endpoint de testing**: Te permite iterar sin configurar WhatsApp
- **Commit frecuente**: Guarda tu progreso cada vez que completes una función

---

## 🚨 **Notas Importantes**

1. **Orden recomendado**: Sigue las fases en orden, especialmente las tareas marcadas como Alta prioridad
2. **Testing continuo**: Prueba cada función antes de pasar a la siguiente
3. **Variables de entorno**: No subas nunca las claves reales a git
4. **Idempotencia**: Es crucial para evitar duplicados cuando Meta reintenta webhooks
5. **Timeouts**: Las URLs de media de WhatsApp expiran rápido, descarga inmediatamente

---

**Última actualización:** Diciembre 2024
**Estado del proyecto:** 🟢 **NÚCLEO COMPLETADO** - Listo para Testing y Despliegue
**Progreso general:** 8/12 tareas completadas (67%) - **¡TODAS LAS TAREAS CRÍTICAS COMPLETADAS!**
