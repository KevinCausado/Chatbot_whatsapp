const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

let flowPrincipal = null;
let flowNetflix = null;
let flowHBO= null;
let flowAmazonPrime=null;
let flowParamount=null;
let flowContacto = null;

// Flujo para volver al menú anterior de los servicios
const flowVolverMenuPrincipal = addKeyword(['Volver', 'volver', 'regresar']).addAnswer('🙌 Hola, bienvenido a nuestro servicio de streaming bot!')
.addAnswer([
  '¿Qué te gustaría hacer?',
    '*Netflix* para Ver Netflix',
    '*HBO* para Ver HBO',
    '*Amazon Prime* para Ver Amazon Prime Video',
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
  }else if (option === 'Amazon Prime') {
    return await flowDynamic(flowAmazonPrime);
  }else if (option === 'Paramount') {
    return await flowDynamic(flowParamount);
  }else if (option === '98') {
    return await flowDynamic(flowContacto);
  }
});

// Flujo para volver al menú desde Opciones al servicio como tal
const flowVolverMenuNetflix = addKeyword(['atras', 'Atras']).addAnswer([
  '🎬 Descubre las últimas películas y series en Netflix',
  '*Precio Netflix* para ver precio',
  '*Pago* para ver métodos de pago',
  '*Volver* para volver al menú principal'

], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Precio Netflix') {
    return await flowDynamic(flowPrecioNetflix);
  } else if (option === 'Pago') {
    return await flowDynamic(flowMetodosPago);
  }else if (option === 'Volver') {
    return await flowDynamic(flowVolverMenuPrincipal);
  }
});

const flowVolverMenuHBO = addKeyword(['atras', 'Atras']).addAnswer([
  '🎬 Descubre las últimas películas y series en HBO',
  '*Precio* para ver precio',
  '*Pago* para ver métodos de pago',
  '*Volver* para volver al menú principal'

], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Precio') {
    return await flowDynamic(flowPrecioNetflix);
  } else if (option === 'Pago') {
    return await flowDynamic(flowMetodosPago);
  }else if (option === 'Volver') {
    return await flowDynamic(flowVolverMenuPrincipal);
  }
});

const flowVolverMenuAmazonPrime = addKeyword(['atras', 'Atras']).addAnswer([
  '🎬 Descubre las últimas películas y series en Amazon Prime',
  '*Precio* para ver precio',
  '*Pago* para ver métodos de pago',
  '*Volver* para volver al menú principal'

], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Precio') {
    return await flowDynamic(flowPrecioNetflix);
  } else if (option === 'Pago') {
    return await flowDynamic(flowMetodosPago);
  }else if (option === 'Volver') {
    return await flowDynamic(flowVolverMenuPrincipal);
  }
});

const flowVolverMenuParamount = addKeyword(['atras', 'Atras']).addAnswer([
  '🎬 Descubre las últimas películas y series en Paramount',
  '*Precio* para ver precio',
  '*Pago* para ver métodos de pago',
  '*Volver* para volver al menú principal'

], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Precio') {
    return await flowDynamic(flowPrecioNetflix);
  } else if (option === 'Pago') {
    return await flowDynamic(flowMetodosPago);
  }else if (option === 'Volver') {
    return await flowDynamic(flowVolverMenuPrincipal);
  }
});


// Flujo secundario para la opcion 1 de precios de Servicios
const flowPrecioNetflix = addKeyword(['1'])
.addAnswer([
  '💰 El precio de Netflix es $9.99 por mes.',
  '*Atras a Netflix* para volver al menú anterior',  
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Atras a Netflix') {
    return await flowDynamic(flowVolverMenuNetflix);
  }
});

const flowPrecioHBO = addKeyword(['Precio HBO', 'precio hbo'])
.addAnswer([
  '💰 El precio de HBO es $9.99 por mes.',
  '*Atras a HBO* para volver al menú anterior',  
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Atras') {
    return await flowDynamic(flowVolverMenuHBO);
  }
});

const flowPrecioAmazonPrime = addKeyword(['Precio Amazon Prime', 'precio amazon prime'])
.addAnswer([
  '💰 El precio de Amazon Prime es $9.99 por mes.',
  '*Atras* para volver al menú anterior',  
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Atras') {
    return await flowDynamic(flowVolverMenuAmazonPrime);
  }
});

const flowPrecioParamount = addKeyword(['Precio Paramount', 'precio paramount'])
.addAnswer([
  '💰 El precio de Paramount es $9.99 por mes.',
  '*Atras* para volver al menú anterior',  
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Atras') {
    return await flowDynamic(flowVolverMenuParamount);
  }
});

// Flujo secundario para la opción 2 (Ver métodos de pago)
const flowMetodosPago = addKeyword(['Pago', 'pago']).addAnswer([
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
    return await flowDynamic(flowVolverMenuPrincipal);
  }
});

  // Flujo principal para Servicios 
   flowNetflix = addKeyword(['Netflix', 'netflix'])
  .addAnswer([
    '🎬 Descubre las últimas películas y series en Netflix',
    '*1* para ver precio',
    '*Pago* para ver métodos de pago',
    '*Volver* para volver al menú principal'
  ], null, async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === '1') { // Aquí se cambió la condición a 'Precio Netflix'
      return await flowDynamic(flowPrecioNetflix); // Redirige al flujo de precio correcto
    } else if (option === 'Pago') {
      return await flowDynamic(flowMetodosPago);
    } else if (option === 'Volver') {
      return await flowDynamic(flowVolverMenuPrincipal);
    }
  });


  flowHBO = addKeyword(['HBO', 'hbo'])
  .addAnswer([
    '🎬 Descubre las últimas películas y series en HBO',
    '*Precio HBO* para ver precio',
    '*Pago* para ver métodos de pago',
    '*Volver* para volver al menú principal'

  ], null, async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === 'Precio HBO') {
      return await flowDynamic(flowPrecioHBO);
    } else if (option === 'Pago') {
      return await flowDynamic(flowMetodosPago);
    }else if (option === 'Volver') {
      return await flowDynamic(flowVolverMenuPrincipal);
    }
  });

  flowAmazonPrime = addKeyword(['Amazon Prime', 'amazon prime '])
  .addAnswer([
    '🎬 Descubre las últimas películas y series en AmazonPrime',
    '*Precio* para ver precio',
    '*Pago* para ver métodos de pago',
    '*Volver* para volver al menú principal'

  ], null, async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === 'Precio Amazon Prime') {
      return await flowDynamic(flowPrecioAmazonPrime);
    } else if (option === 'Pago') {
      return await flowDynamic(flowMetodosPago);
    }else if (option === 'Volver') {
      return await flowDynamic(flowVolverMenuPrincipal);
    }
  });

  flowParamount = addKeyword(['Paramount', 'paramount'])
  .addAnswer([
    '🎬 Descubre las últimas películas y series en Parmount',
    '*Precio* para ver precio',
    '*Pago* para ver métodos de pago',
    '*Volver* para volver al menú principal'

  ], null, async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === 'Precio Paramount') {
      return await flowDynamic(flowPrecioParamount);
    } else if (option === 'Pago') {
      return await flowDynamic(flowMetodosPago);
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
    '*Amazon Prime* para Ver Amazon Prime Video',
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
    }else if (option === 'Amazon Prime') {
      return await flowDynamic(flowAmazonPrime);
    }else if (option === 'Paramount') {
      return await flowDynamic(flowParamount);
    }else if (option === '98') {
      return await flowDynamic(flowContacto);
    }
  });

// Función principal para crear el bot
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal,flowNetflix,flowHBO,flowAmazonPrime,flowParamount,flowPrecioNetflix,flowPrecioHBO,flowPrecioAmazonPrime,flowPrecioParamount, flowMetodosPago, flowContacto, flowVolverMenuPrincipal,flowVolverMenuNetflix,flowVolverMenuHBO,flowVolverMenuAmazonPrime,flowVolverMenuParamount]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();
