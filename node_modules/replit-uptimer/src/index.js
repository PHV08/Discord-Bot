"use strict";

const name = "[replit-uptimer]"; //zzz...

/**
function config(options = {}) {
 let port = options.port || 3000 || 8080;
 let createURL = options.path ? options.path.toString() : "/";
 let createResponse = options.message ? options.message.toString() : config.on;
 const request = async (req, res) => {
  if (options.debug) console.log(`${colors.green.bold(`::debug:: ${name} => ${req.method.toLowerCase()} ${req.url}`)}`);
  if (req.url === createURL) { res.writeHead(200); return res.end(createResponse); }
 };
 **/

const colors = require("colors");
const { createServer } = require("node:http");

function config(options = {}) {
 const port = options.port || 3000 || 8080;
 let createURL = options.path ? options.path.toString() : "/";
 let createResponse = options.message ? options.message.toString() : "!ON FIRE¡";
 const request = async (req, res) => {
  if (options.debug) console.log(`${colors.green.bold(`:: debug :: ${name} => ${req.method.toLowerCase()} ${req.url}`)}`);
  if (req.url === createURL) { res.writeHead(200); return res.end(createResponse); }
 };

 const server = createServer(request);
 server.listen(port, () => { if (options.debug) console.log(`${colors.green.bold(`:: debug :: ${name} => Servidor online en el pueto: ${port}`)}`);});
}

console.log(`${colors.green.bold(`:: server :: ${name} => online`)}`);

module.exports = { config };

/**
 * @INFO
 * Desarollado por k4itrun | https://discord.gg/team-arcades-935157109761388554
 * @INFO
 * Team Arcades | https://teamarcades.xyz
 * @INFO
 * Asegúrate de dar creditos si vas a usar este Código
 * @INFO
**/