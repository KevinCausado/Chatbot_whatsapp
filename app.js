const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

let flowPrincipal = null;
let flowNetflix = null;
let flowContacto = null;

// Flujo para volver al menú anterior
const flowVolver = addKeyword(['Volver', 'volver', 'regresar']).addAnswer([
  'Volviendo a menu',
  
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Volver') {
    return await flowDynamic(flowVolver);
  } else if (option === '98') {
    return await flowDynamic(flowContacto);
  }
});

// Flujo secundario para la opción 1 (Ver precio de Netflix)
const flowPrecioNetflix = addKeyword(['Precio', 'precio'])
.addAnswer([
  '💰 El precio de Netflix es $9.99 por mes.',
  '*98* Contactar al proveedor en caso de emergencia',
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Volver') {
    return await flowDynamic(flowVolver);
  } else if (option === '98') {
    return await flowDynamic(flowContacto);
  }
});

// Flujo secundario para la opción 2 (Ver métodos de pago)
const flowMetodosPagoNetflix = addKeyword(['Pago', 'pago']).addAnswer('💳 Aquí están los métodos de pago de Netflix...', null, null, [flowVolver]);

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
    } else if (option === '98') {
      return await flowDynamic(flowContacto);
    }
  });


// Flujo para contactar al proveedor en caso de emergencia
flowContacto = addKeyword(['98', 'contacto', 'emergencia']).addAnswer('🚨 Puedes contactar al proveedor al siguiente número: 3152089391', null, null, [flowVolver]);


// Flujo principal para mostrar las opciones principales
flowPrincipal = addKeyword(['Hola', 'hola', 'Ole', 'ole', 'Alo', 'alo', 'Hola!', 'HOLA', 'Hola', 'Hola!', '¡Hola', 'hola!', 'holaaa', 'hii', 'hi', 'Hello', 'HELLO', 'hey', 'Hey', 'buenas', 'Buenas', 'Buenos días', 'Buenas tardes', 'Buenas noches'])
  .addAnswer('🙌 Hola, bienvenido a nuestro servicio de streaming bot!')
  .addAnswer([
    '¿Qué te gustaría hacer?',
    '*Netflix* para Ver Netflix',
    '*98* Contactar al proveedor en caso de emergencia',
  ], null, async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === 'Netflix') {
      return await flowDynamic(flowNetflix);
    } else if (option === '98') {
      return await flowDynamic(flowContacto);
    }
  });

// Función principal para crear el bot
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal,flowNetflix, flowPrecioNetflix, flowMetodosPagoNetflix, flowContacto, flowVolver]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();
