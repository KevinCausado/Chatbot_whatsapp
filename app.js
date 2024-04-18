const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

let flowPrincipal = null;
let flowNetflix = null;

// Flujo para volver al menú anterior
const flowVolver = addKeyword(['0', 'volver', 'regresar']).addAnswer('🔙 Volviendo al menú anterior...');

// Flujo secundario para la opción 1 (Ver precio de Netflix)
const flowPrecioNetflix = addKeyword(['1', 'precio']).addAnswer('💰 El precio de Netflix es $9.99 por mes.', null, null, [flowVolver]);

// Flujo secundario para la opción 2 (Ver métodos de pago)
const flowMetodosPagoNetflix = addKeyword(['2', 'pago']).addAnswer('💳 Aquí están los métodos de pago de Netflix...', null, null, [flowVolver]);

/// Flujo para volver al menú principal desde Netflix
const flowVolverMenuPrincipalDesdeNetflix = addKeyword(['0', 'volver', 'regresar']).addAnswer('', null, null, [flowVolver]);

// Flujo principal para Netflix
flowNetflix = addKeyword(['1', 'netflix']).addAnswer([
    '🎬 Descubre las últimas películas y series en Netflix',
    '*1* Ver precio',
    '*2* Métodos de pago',
    '*0* Volver al menú principal'
], null, null, [flowPrecioNetflix, flowMetodosPagoNetflix, flowVolverMenuPrincipalDesdeNetflix]);


// Flujo para contactar al proveedor en caso de emergencia
const flowContacto = addKeyword(['98', 'contacto', 'emergencia']).addAnswer('🚨 Puedes contactar al proveedor al siguiente número: 3152089391', null, null, [flowVolver]);

// Flujo principal para mostrar las opciones principales
flowPrincipal = addKeyword(['Hola', 'hola', 'Ole', 'ole', 'Alo', 'alo', 'Hola!', 'HOLA', 'Hola', 'Hola!', '¡Hola', 'hola!', 'holaaa', 'hii', 'hi', 'Hello', 'HELLO', 'hey', 'Hey', 'buenas', 'Buenas', 'Buenos días', 'Buenas tardes', 'Buenas noches'])
    .addAnswer('🙌 Hola, bienvenido a nuestro servicio de streaming bot!')
    .addAnswer(
        [
            '¿Qué te gustaría hacer?',
            '*1* Ver Netflix',
            '*98* Contactar al proveedor en caso de emergencia',            
        ],
        null,
        null,
        [flowNetflix, flowContacto]
    );

// Función principal para crear el bot
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, flowPrecioNetflix, flowMetodosPagoNetflix, flowContacto, flowVolver]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();
