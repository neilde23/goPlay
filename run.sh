#!/bin/sh

# Lancer le serveur backend en arrière-plan
cd backend/
npm install
node server.js &

sleep 1

cd ../frontend/
npm install
npm run dev
