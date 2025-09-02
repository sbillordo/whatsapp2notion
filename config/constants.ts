// config/constants.ts

  
  // 2. CONSTANTES DE NOTION (mapea exactamente tu DB)
  export const NOTION_PROPERTIES = {
    // Nombres exactos de las columnas en tu base de datos
    NAME: 'Name',           // Título de la tarea
    PARA: 'P.A.R.A.',      // Projects, Areas, Resources, Archive
    PRIORITY: 'Priority',   // High, Medium, Low
    STATUS: 'Status',       // Inbox, In progress, etc.
    TAGS: 'TAGs',          // Multi-select de tags
  } as const;
  
  // Valores válidos para cada propiedad
  export const NOTION_VALUES = {
    PARA: ['Projects', 'Areas', 'Resources', 'Task'],
    PRIORITY: ['High', 'Medium', 'Low'],
    STATUS: ['Inbox', 'In progress', 'Stand-By', 'Pdte. Feedback'],
    // Agrega más tags según uses en tu DB
    COMMON_TAGS: ['SaaS', 'Finanzas', 'Desarrollo', 'Marketing', 'Personal']
  } as const;
  
  // 3. VALORES POR DEFECTO
  export const DEFAULTS = {
    PRIORITY: 'Medium',
    STATUS: 'Inbox', 
    PARA: 'Projects',
    LANGUAGE: 'es',
    MODE: 'nota'
  } as const;
  
  // 4. CONFIGURACIÓN DE OPENAI
  export const OPENAI_CONFIG = {
    WHISPER_MODEL: 'whisper-1',
    CHAT_MODEL_FAST: 'gpt-4o-mini',    // Para clasificación
    CHAT_MODEL_MAIN: 'gpt-4o',         // Para generación
    LANGUAGE: 'es',
    MAX_TOKENS: 1000
  } as const;
  
  // 5. MAPEOS DE COMANDOS POR VOZ
  export const VOICE_COMMANDS = {
    // Prioridad
    PRIORITY_MAP: {
      'alta': 'High',
      'high': 'High',
      'urgente': 'High',
      'media': 'Medium',
      'medium': 'Medium',
      'normal': 'Medium',
      'baja': 'Low',
      'low': 'Low'
    },
    
    // Status
    STATUS_MAP: {
      'inbox': 'Inbox',
      'bandeja': 'Inbox',
      'en progreso': 'In progress',
      'trabajando': 'In progress',
      'standby': 'Stand-By',
      'esperando': 'Stand-By',
      'pendiente feedback': 'Pte. Feedback',
      'feedback': 'Pte. Feedback'
    },
    
    // P.A.R.A.
    PARA_MAP: {
      'proyecto': 'Projects',
      'proyectos': 'Projects',
      'area': 'Areas',
      'areas': 'Areas',
      'recurso': 'Resources',
      'recursos': 'Resources',
      'archivo': 'Archive',
      'archivar': 'Archive'
    },
    
    // Modos
    MODE_MAP: {
      'guía': 'guía',
      'guia': 'guía',
      'paso a paso': 'guía',
      'documenta': 'guía',
      'documentar': 'guía',
      'idea': 'idea',
      'concepto': 'idea',
      'nota': 'nota',
      'recordatorio': 'nota'
    }
  } as const;
  
  // 6. CONFIGURACIÓN DE TIMEOUTS
  export const TIMEOUTS = {
    DOWNLOAD_AUDIO: 10000,    // 10 segundos
    WHISPER_TRANSCRIPTION: 30000,  // 30 segundos
    GPT_CLASSIFICATION: 15000,     // 15 segundos
    GPT_GENERATION: 30000,         // 30 segundos
    NOTION_CREATE: 10000           // 10 segundos
  } as const;