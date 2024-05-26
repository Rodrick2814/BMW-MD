const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU9nS0NsL25pWVUrSmtCejc4M2pPNlRxdlBDazBhOWQxeXYvUGhpWlRsMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVltZndWMVEwQ1RmaFpQYUYwSTZIYVpOODhiRDR2S09NcHFhS1JHMUUyMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5TjFnQkRLZWtJZG85VkY5WlJzdjJ5enk5VXFnOU1jaWdJZFFxWDc4N1ZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxS0xCand4OWdjY0lKSERKQ0tkMTY5OGt6VzkzejFNUXltTmZKMmQ5Z1d3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlCOGgrT3NSMno3QitsazRneUZTWEZEcWNQS0VEeHpVUEFlWkJaL0MvRk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJOa2s5Q2RDY21VRDByaW82ZXZyS3lLMkNXSmJpaVNtNzR2bkR1c0FZSDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVBJOU9VMlE0N3d0L0hwekxFQ1F1cXR6ajBHakVWOSsyRHFMY0VVaXlIZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOG45SGM1TEhnaG4yKzBhNEQ0N0wzSlN4NGJQMDVWNGRaYUFLZ1FyUlNIST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBUSnNEZFBnVmtHamxpRDV5T1lTRWRRalhLLzdrTThIdnJmNEZja1VVMFBydktwdy8yOEgzUzBxVVBVdWZnaHBUeGVUZE5jL2Rsdk1RazZFWmVHbWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI1LCJhZHZTZWNyZXRLZXkiOiJkM1l2UzZTeXowMlhQV2RSaUppSFFyYVlvcGh0ZWFnWW56dWVTaUJvZGVBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4TzFRTUxnRVFRcWZQS001SkNxMXpRIiwicGhvbmVJZCI6IjIyZTA3YzJiLTk1YzQtNGQ3Ni1iMWQ2LTIwNGM5MGY0ZjQ2YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5bVU2OGMyQXJoOStKeWduUnh1b1VGNDVGTW89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOHhwSzNrYkZuUEN2Si8xdVJEbFdrWngxTjZnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRONVBFUTJQIiwibWUiOnsiaWQiOiIyNTY3ODI5NTY0NjQ6NkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3JnbDhnREVMR3V5cklHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNUU4cnNTYmplb0NocDFwT2JHMlQ5bm8yMVptdjJ4NDFnUlRaY2liRFYxMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiS1RRN1ZEUFFaeHZZTStVczJoL09HYUxBeGFSc3dydXVQZURtMU42ZjFRd0doRUk5K2c3ekZXMjA4cWx2ODNabDNjRmVXdkl2cUpmRi9xd09WbElnQlE9PSIsImRldmljZVNpZ25hdHVyZSI6ImlDN3pqd1h2OWtROW5VVHdMbFcvVDEyYng5UHAyaWJ1UmY5c0JKZWg2d0V2QnVnQk14ZFlHMG5aT3ROZlZvK2FPcUJSUjhCSEx5MUhtcVBDNVp3bGhRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU2NzgyOTU2NDY0OjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZVJQSzdFbTQzcUFvYWRhVG14dGsvWjZOdFdacjlzZU5ZRVUyWEltdzFkZCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNjY4ODcwMywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLTGsifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME ||"XXXAVIER",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "246782956464",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'GHOST',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

