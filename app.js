const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

let flowPrincipal = null;
let flowNetflix = null;
let flowHBO = null;
let flowContacto = null;

// Flujo para volver al menú anterior
const flowVolverMenuPrincipal = addKeyword(['Volver', 'volver', 'regresar']).addAnswer('🙌 Hola, bienvenido a nuestro servicio de streaming bot!')
.addAnswer([
  '¿Qué te gustaría hacer?',
  '*Netflix* para Ver Netflix',
  '*HBO* para Ver HBO',
  '*98* Contactar al proveedor en caso de emergencia',
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Netflix') {
    return await flowDynamic(flowNetflix);
  } else if (option === 'HBO') {
    return await flowDynamic(flowHBO);
  } else if (option === '98') {
    return await flowDynamic(flowContacto);
  }
});

// Flujo para volver al menú Netflix
const flowVolverMenuNetflix = addKeyword(['atras', 'Atras']).addAnswer([
  '🎬 Descubre las últimas películas y series en Netflix',
  '*Precio* para ver precio',
  '*Pago* para ver métodos de pago',
  '*Volver* para volver al menú principal'

], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Precio') {
    return await flowDynamic(flowPrecioNetflix);
  } else if (option === 'Pago') {
    return await flowDynamic(flowMetodosPagoNetflix);
  }else if (option === 'Volver') {
    return await flowDynamic(flowVolver);
  }
});

const flowVolverMenuHBO = addKeyword(['atras', 'Atras']).addAnswer([
  '🎬 Descubre las últimas películas y series en Netflix',
  '*Precio* para ver precio',
  '*Pago* para ver métodos de pago',
  '*Volver* para volver al menú principal'

], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Precio') {
    return await flowDynamic(flowPrecioHBO);
  } else if (option === 'Pago') {
    return await flowDynamic(flowMetodosPagoNetflix);
  }else if (option === 'Volver') {
    return await flowDynamic(flowVolver);
  }
});


// Flujo secundario para la opción 1 (Ver precio de Netflix)
const flowPrecioNetflix = addKeyword(['Precio', 'precio'])
.addAnswer([
  '💰 El precio de Netflix es $9.99 por mes.',
  '*Atras* para volver al menú anterior',  
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Atras') {
    return await flowDynamic(flowVolverMenuNetflix);
  }
});

const flowPrecioHBO = addKeyword(['Precio', 'precio'])
.addAnswer([
  '💰 El precio de HBO es $10 por mes.',
  '*Atras* para volver al menú anterior',  
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Atras') {
    return await flowDynamic(flowVolverMenuHBO);
  }
});

// Flujo secundario para la opción 2 (Ver métodos de pago)
const flowMetodosPagoNetflix = addKeyword(['Pago', 'pago']).addAnswer([
  '💳 Aquí están los métodos de pago',
    '',
    '- Nequi:3152089391',
    '- Bancolombia:3152089391',
    '- Davivienda:3152089391',
    '- Daviplata:3152089391',
    '',    
    '*Atras* para volver al menú anterior'

], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Atras') {
    return await flowDynamic(flowVolverMenuNetflix);
  }
});

const flowMetodosPagoHBO = addKeyword(['Pago', 'pago']).addAnswer([
  '💳 Aquí están los métodos de pago para HBO',
    '',
    '- Nequi:3152089391',
    '- Bancolombia:3152089391',
    '- Davivienda:3152089391',
    '- Daviplata:3152089391',
    '',    
    '*Atras* para volver al menú anterior'

], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Atras') {
    return await flowDynamic(flowVolverMenuHBO);
  }
});

  // Flujo principal para Netflix
flowNetflix = addKeyword(['Netflix', 'netflix'])
  .addAnswer([
    '🎬 Descubre las últimas películas y series en Netflix',
    '*Precio* para ver precio',
    '*Pago* para ver métodos de pago',
    '*Volver* para volver al menú principal'

  ], null, async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === 'Precio') {
      return await flowDynamic(flowPrecioNetflix);
    } else if (option === 'Pago') {
      return await flowDynamic(flowMetodosPagoNetflix);
    }else if (option === 'Volver') {
      return await flowDynamic(flowVolverMenuPrincipal);
    }
  });

  flowHBO = addKeyword(['HBO', 'hbo'])
  .addAnswer([
    '🎬 Descubre las últimas películas y series en HBO',
    '*Precio* para ver precio',
    '*Pago* para ver métodos de pago',
    '*Volver* para volver al menú principal'

  ], null, async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === 'Precio') {
      return await flowDynamic(flowPrecioHBO);
    } else if (option === 'Pago') {
      return await flowDynamic(flowMetodosPagoNetflix);
    }else if (option === 'Volver') {
      return await flowDynamic(flowVolverMenuPrincipal);
    }
  });



// Flujo para contactar al proveedor en caso de emergencia
flowContacto = addKeyword(['98', 'contacto', 'emergencia']).addAnswer([
  '🚨 Puedes contactar al proveedor al siguiente número: 3152089391',
  '*Volver* para volver al menú principal'
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Volver') {
    return await flowDynamic(flowVolverMenuPrincipal);
  }
});


// Flujo principal para mostrar las opciones principales
flowPrincipal = addKeyword(['Hola', 'hola', 'Ole', 'ole', 'Alo', 'alo', 'Hola!', 'HOLA', 'Hola', 'Hola!', '¡Hola', 'hola!', 'holaaa', 'hii', 'hi', 'Hello', 'HELLO', 'hey', 'Hey', 'buenas', 'Buenas', 'Buenos días', 'Buenas tardes', 'Buenas noches'])
  .addAnswer('🙌 Hola, bienvenido a nuestro servicio de streaming bot!')
  .addAnswer([
    '¿Qué te gustaría hacer?',
    '*Netflix* para Ver Netflix',
    '*HBO* para Ver HBO',
    '*Amazon Prime Video* para Ver Amazon Prime Video',
    '*Paramount* para Ver Paramount+',
    '*Deezer* para Ver Deezer',
    '*Spotify* para Ver Spotify',
    '*Youtube Music* para Ver Youtube Music',
    '*Crunchyroll* para Ver Crunchyroll',
    '*Disney* para Ver Disney+',
    '*Star+* para Ver Star+',
    '*Win+* para Ver Win+',
    '*IPTV* para Ver IPTV',
    '*98* Contactar al proveedor en caso de emergencia',
  ], null, async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === 'Netflix') {
      return await flowDynamic(flowNetflix);
    }else if (option === 'HBO') {
      return await flowDynamic(flowHBO);
    }else if (option === '98') {
      return await flowDynamic(flowContacto);
    }
  });

// Función principal para crear el bot
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal,flowNetflix, flowPrecioNetflix,flowHBO,flowPrecioHBO, flowMetodosPagoNetflix, flowContacto, flowVolverMenuPrincipal,flowVolverMenuNetflix]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();