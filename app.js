const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

let flowPrincipal = null;
let flowNetflix = null;
let flowContacto = null;

// Flujo para volver al menú anterior
const flowServicios = addKeyword(['Servicios','servicios'])
.addAnswer('🙌 Hola, bienvenido a nuestro servicio de streaming bot!')
  .addAnswer([
    'Servicios Disponibles',
    '*Netflix* a $14.900',
    '*HBO* a $12.000',
    '*Amazon Prime Video* a $12.000',
    '*Paramount* a $12.000',
    '*Deezer* a $12.000',
    '*Spotify* a $12.000',
    '*Youtube Music* a $12.000',
    '*Crunchyroll* a $12.000',
    '*Disney* a $12.000',
    '*Star+* a $12.000',
    '*Win+* a $12.000',
    '*IPTV* a $12.000',    
    'Escribe *Volver* para retornar al menú principal',
  ], null, async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === 'Volver') {
      return await flowDynamic(flowPrincipal);
    } 
});

// Flujo secundario para la opción 2 (Ver métodos de pago)
const flowMetodosPago = addKeyword(['Pago', 'pago']).addAnswer([
  '💳 Aquí están los métodos de pago',
    '',
    '💸 Nequi: 3152089391',
    '🏦 Bancolombia: 3152089391',
    '🏛️ Davivienda: 3152089391',
    '📱 Daviplata: 3152089391',       
    ' 🔙 Escribe Volver para regresar al menú principal',
    '',    
    ' Escribe *Volver* para volver al menú principal'

], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Volver') {
    return await flowDynamic(flowPrincipal);
  }
});

// Flujo para contactar al proveedor en caso de emergencia
flowContacto = addKeyword(['98', 'contacto', 'emergencia','Soporte','soporte']).addAnswer([
  '🚨 Puedes contactar al proveedor al siguiente número: 3152089391',
  'Escribe *Volver* para volver al menú principal'
], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Volver') {
    return await flowDynamic(flowPrincipal);
  }
});


// Flujo principal para mostrar las opciones principales
flowPrincipal = addKeyword(['Hola', 'hola', 'Ole', 'ole', 'Alo', 'alo', 'Hola!', 'HOLA', 'Hola', 'Hola!', '¡Hola', 'hola!', 'holaaa', 'hii', 'hi', 'Hello', 'HELLO', 'hey', 'Hey', 'buenas', 'Buenas', 'Buenos días', 'Buenas tardes', 'Buenas noches','Volver','volver']).
addAnswer([
  '🤔 ¿Qué te gustaría hacer?',
  '🔍 Escribe *Servicios* para explorar las opciones disponibles.',
  '💰 Escribe *Pago* para revisar las formas de pago.',
  '🆘 Escribe *Soporte* para contactar al proveedor en caso de emergencia.',

], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === 'Servicios') {
    return await flowDynamic(flowServicios);
  } else if (option === 'Pago') {
    return await flowDynamic(flowMetodosPago);
  }
  else if (option === 'Soporte') {
    return await flowDynamic(flowContacto);
  }
});

// Función principal para crear el bot
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal,flowServicios,flowMetodosPago, flowContacto]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();
