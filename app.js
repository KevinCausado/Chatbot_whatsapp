const { createBot, createProvider, createFlow, addKeyword } = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

let flowPrincipal = null;
let flowNetflix = null;
let flowContacto = null;

// Flujo para volver al menú anterior
const flowServicios = addKeyword(["Servicios", "servicios"])
  .addAnswer("🙌 Hola, bienvenido a nuestro catalogo de Servicios *International Film*")
  .addAnswer(
    [
      "Recuerda validar el último catálogo siempre",
      "",
      "*Netflix*",
      "🔴 1 Pantalla 1 Mes: 💵 $15.000",
      "🔴 2 Pantallas 1 Mes: 💵 $25.000",
      "🔴 3 Pantallas 1 Mes: 💵 $35.000",
      "🔴 4 Pantallas 1 Mes: 💵 $40.000",
      "",
      "*Amazon Prime Video*",
      "🔵 1 Pantalla 1 Mes: 💵 $10.000",
      "🔵 2 Pantallas 1 Mes: 💵 $16.000",
      "🔵 3 Pantallas 1 Mes: 💵 $20.000",
      "",
      "*Disney+*",
      "🟣 1 Pantalla 1 Mes: 💵 $10.000",
      "🟣 2 Pantallas 1 Mes: 💵 $16.000",
      "🟣 3 Pantallas 1 Mes: 💵 $20.000",
      "🟣 4 Pantallas 1 Mes: 💵 $24.000",
      "",
      "*HBO MAX*",
      "⚫ 1 Pantalla 1 Mes: 💵 $10.000",
      "⚫ 2 Pantallas 1 Mes: 💵 $16.000",
      "⚫ 3 Pantallas 1 Mes: 💵 $20.000",
      "",
      "*Star+*",
      "🟠 1 Pantalla 1 Mes: 💵 $10.000",
      "🟠 2 Pantallas 1 Mes: 💵 $17.000",
      "🟠 3 Pantallas 1 Mes: 💵 $21.000",
      "🟠 4 Pantallas 1 Mes: 💵 $25.000",
      "",
      "*IPTV con Win+ 3000 Canales*",
      "🉐  1 dispositivo 1 Mes 💵$15.000",
      "🉐  2 dispositivo 1 Mes 💵$20.000",
      "🉐  3 dispositivo 1 Mes 💵$25.000",
      "",
      "*Plex*",
      "🟡 1 Pantalla(Solo Tv) 1 mes: 💵 $10.000",
      "🟡 2 Pantallas 1 mes: 💵 $16.000",
      "🟡 3 Pantallas 1 mes: 💵 $20.000",
      "🟡 4 Pantallas 1 mes: 💵 $24.000",
      "", 
      "*Directv go Oro con win+ , hbo y nba*",
      "🔘1 Dispositivo 1 Mes 💵 $40.000",
      "",
      "*Directv go Plata con win+*",
      "🔘1 Dispositivo 1 Mes 💵 $35.000",
      "",
      "*Crunchyroll*",
      "🟠 1 Pantalla 1 mes: 💵 $10.000",
      "🟠 2 Pantallas 1 mes: 💵 16.000",
      "🟠 4 Pantallas 1 mes: 💵 $20.000",
      "",
      "*Vix +*",
      "🔵 1 Pantalla 1 mes  💵$10.000",
      "🔵3 Pantalla 1 mes 💵$21.000",
      "",
      "*Paramount*",
      "⚫1 Pantalla 1 Mes 💵$10.000",
      "⚫2 Pantallas 1 Mes 💵$16.000",
      "⚫3 Pantallas 1 Mes 💵$18.000",
      "⚫4 Pantallas 1 Mes 💵$20.000",
      "",
      "*Apple Tv*",
      "🟣1 Dispositivo 3 Mes 💵 $22.000",
      "",
      "*Spotify*",
      "🟢 1 Mes: 💵 $10.000",
      "🟢 2 Meses: 💵 $14.000",
      "🟢 3 Meses: 💵 $20.000",
      "",
      "*Youtube Premium*",
      "⭕ 1 mes: 💵$10.000",
      "⭕ 2 meses: 💵$16.000",
      "⭕ 4 meses: 💵$30.000",
      "⭕ 1 mes Familiar: 💵$10.000",
      "",
      "Escribe *Volver* para retornar al menú principal",
    ],
    null,
    async (context, { flowDynamic }) => {
      const option = context.body.trim();
      if (option === "Volver") {
        return await flowDynamic(flowPrincipal);
      }
    }
  );

// Flujo secundario para la opción 2 (Ver métodos de pago)
const flowMetodosPago = addKeyword(["Pago", "pago"]).addAnswer(
  ["💳 Aquí están los métodos de pago", "", "💸 Nequi: 3152089391", "🏦 Bancolombia: 3152089391", "🏛️ Davivienda: 3152089391", "📱 Daviplata: 3152089391", "", " 🔙 Escribe *Volver* para regresar al menú principal"],
  null,
  async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === "Volver") {
      return await flowDynamic(flowPrincipal);
    }
  }
);



// Flujo para contactar al proveedor en caso de emergencia
flowContacto = addKeyword(["98", "contacto", "emergencia", "Soporte", "soporte"]).addAnswer(["🚨 Puedes contactar al proveedor al siguiente número: 3152089391", "Escribe *Volver* para volver al menú principal"], null, async (context, { flowDynamic }) => {
  const option = context.body.trim();
  if (option === "Volver") {
    return await flowDynamic(flowPrincipal);
  }
});

// Flujo principal para mostrar las opciones principales
flowPrincipal = addKeyword([
  "Hola",
  "hola",
  "Ole",
  "ole",
  "Alo",
  "alo",
  "Hola!",
  "HOLA",
  "Hola",
  "Hola!",
  "¡Hola",
  "hola!",
  "holaaa",
  "hii",
  "hi",
  "Hello",
  "HELLO",
  "hey",
  "Hey",
  "buenas",
  "Buenas",
  "Buenos días",
  "Buenas tardes",
  "Buenas noches",
  "Volver",
  "volver",
]).addAnswer(
  [
    "🤔 ¿Qué te gustaría hacer?",
    "🔍 Escribe *Servicios* para explorar las opciones disponibles.",
    "💰 Escribe *Pago* para revisar las formas de pago.",    
    "🆘 Escribe *Soporte* para contactar al proveedor en caso de emergencia.",
  ],
  null,
  async (context, { flowDynamic }) => {
    const option = context.body.trim();
    if (option === "Servicios") {
      return await flowDynamic(flowServicios);
    } else if (option === "Pago") {
      return await flowDynamic(flowMetodosPago);
    } else if (option === "Soporte") {
      return await flowDynamic(flowContacto);
    }
  }
);

// Función principal para crear el bot
const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal, flowServicios, flowMetodosPago, flowContacto]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
