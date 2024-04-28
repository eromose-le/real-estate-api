# REAL ESTATE API 

> console-ninja node --watch app.js
>
# Resources
> - https://app.eraser.io
>  - For illustrated diagrams, flow chart e.t.c

# After any update on prisma schema,
> run npx prisma db push
> 
    "serve": "concurrently \"npx tsc -w\"  \"console-ninja node --env-file .env --watch dist/app.js\""