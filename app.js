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
.addAnswer('🙌 Hola, bienvenido a nuestro servicio de streaming bot!')
  .addAnswer([
    '¿Qué te gustaría hacer?',
    '*1* para Ver Netflix',
    '*2* para Ver HBO',
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
    '*Pago* para ver Metodos de Pago',
    '*98* Contactar al proveedor en caso de emergencia',
  ], null, async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === '1') {
      return await flowDynamic(flowNetflix);
    }else if (option === '2') {
      return await flowDynamic(flowHBO);
    }else if (option === 'Pago') {
      return await flowDynamic(flowMetodosPago);
    }else if (option === '98') {
      return await flowDynamic(flowContacto);
    }
  });

// Flujo secundario para la opción 1 (Ver precio de Netflix)
const flowPrecioNetflix = addKeyword(['3'])
.addAnswer([
  '💰 El precio de Netflix es $9.99 por mes.',
  '*Volver* para volver al menú anterior',  
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Volver') {
    return await flowDynamic(flowVolverMenuPrincipal);
  }
});

const flowPrecioHBO = addKeyword(['4'])
.addAnswer([
  '💰 El precio de HBO es $10 por mes.',
  '*Volver* para volver al menú principal',  
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Volver') {
    return await flowDynamic(flowVolverMenuPrincipal);
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
    '*Atras* para volver al menú principal'

], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Atras') {
    return await flowDynamic(flowVolverMenuPrincipal);
  }
});


  // Flujo principal para Netflix
flowNetflix = addKeyword(['1'])
  .addAnswer([
    '🎬 Descubre las últimas películas y series en Netflix',
    '*3* para ver precio',    
    '*Volver* para volver al menú principal'

  ], null, async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === '3') {
      return await flowDynamic(flowPrecioNetflix);
    } else if (option === 'Volver') {
      return await flowDynamic(flowVolverMenuPrincipal);
    }
  });

  flowHBO = addKeyword(['2'])
  .addAnswer([
    '🎬 Descubre las últimas películas y series en HBO',
    '*4* para ver precio',    
    '*Volver* para volver al menú principal'

  ], null, async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === '4') {
      return await flowDynamic(flowPrecioHBO);
    } else if (option === 'Volver') {
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


// Flujo inicial
const flowInicio = addKeyword(['Hola', 'hola', 'Ole', 'ole', 'Alo', 'alo', 'Hola!', 'HOLA', 'Hola', 'Hola!', '¡Hola', 'hola!', 'holaaa', 'hii', 'hi', 'Hello', 'HELLO', 'hey', 'Hey', 'buenas', 'Buenas', 'Buenos días', 'Buenas tardes', 'Buenas noches'])
.addAnswer(' ¡Bienvenido a nuestro servicio de streaming!')
.addAnswer('Para acceder al menú principal, escribe "Menú" o presiona el botón correspondiente.');




// Flujo principal
flowPrincipal = addKeyword(['Menú', 'menu', 'principal']) // Agregar palabras clave para el menú principal
.addAnswer(' ¡Bienvenido al menú principal!')
.addAnswer([
  '¿Qué te gustaría hacer?',
  '*1* para Ver Netflix',
  '*2* para Ver HBO',
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
  '*Pago* para ver Metodos de Pago',
  '*98* Contactar al proveedor en caso de emergencia',
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === '1') {
    return await flowDynamic(flowNetflix);
  }else if (option === '2') {
    return await flowDynamic(flowHBO);
  }else if (option === 'Pago') {
    return await flowDynamic(flowMetodosPago);
  }else if (option === '98') {
    return await flowDynamic(flowContacto);
  }
})
.addAnswer('¿En qué puedo ayudarte?');



// Flujo principal para mostrar las opciones principales
// flowPrincipal = addKeyword(['Hola', 'hola', 'Ole', 'ole', 'Alo', 'alo', 'Hola!', 'HOLA', 'Hola', 'Hola!', '¡Hola', 'hola!', 'holaaa', 'hii', 'hi', 'Hello', 'HELLO', 'hey', 'Hey', 'buenas', 'Buenas', 'Buenos días', 'Buenas tardes', 'Buenas noches'])
//   .addAnswer('🙌 Hola, bienvenido a nuestro servicio de streaming bot!')
//   .addAnswer([
//     '¿Qué te gustaría hacer?',
//     '*1* para Ver Netflix',
//     '*2* para Ver HBO',
//     '*Amazon Prime Video* para Ver Amazon Prime Video',
//     '*Paramount* para Ver Paramount+',
//     '*Deezer* para Ver Deezer',
//     '*Spotify* para Ver Spotify',
//     '*Youtube Music* para Ver Youtube Music',
//     '*Crunchyroll* para Ver Crunchyroll',
//     '*Disney* para Ver Disney+',
//     '*Star+* para Ver Star+',
//     '*Win+* para Ver Win+',
//     '*IPTV* para Ver IPTV',
//     '*Pago* para ver Metodos de Pago',
//     '*98* Contactar al proveedor en caso de emergencia',
//   ], null, async (context, { flowDynamic }) => {
//     const option = context.body.trim();
//     if (option === '1') {
//       return await flowDynamic(flowNetflix);
//     }else if (option === '2') {
//       return await flowDynamic(flowHBO);
//     }else if (option === 'Pago') {
//       return await flowDynamic(flowMetodosPago);
//     }else if (option === '98') {
//       return await flowDynamic(flowContacto);
//     }
//   });

// Función principal para crear el bot
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([
        flowInicio,
      
      flowPrincipal,flowNetflix, flowPrecioNetflix,flowHBO,flowPrecioHBO, 
      
      
      flowMetodosPago,
      
      
      flowContacto, flowVolverMenuPrincipal,
      
      
      ]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();