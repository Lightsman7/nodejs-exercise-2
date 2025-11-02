import http, { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import Menu from './types';
import nanoid from 'nanoid';

const PORT = 3000;

let menus: Menu[] = [];

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        const data = fs.readFileSync('index.html');
        res.writeHead(200, 'ok', {'Content-Type': 'text/html'});
        res.write(data)
        res.end();

    } else if (url === "/script.js") {
        const data = fs.readFileSync('script.js');
        res.write(data);
        res.end();
    } else if (url.includes("/menu")) {
        switch(method) {
            case "GET":
                res.write(JSON.stringify(menus));
                res.end();
            break;
            case "POST":
                let data = '';
                req.on("data", (chunk) => {
                    data += chunk;
                });

                req.on("end", () => {
                    const menu = JSON.parse(data);
                    menu.id = nanoid.nanoid();
                    menus.push(menu);
                    res.write(JSON.stringify(menus));
                    res.end();
                })
            
            break;
            case "DELETE":
                /* /menu?id=a-VElyNeKo5T70f-KcCLp */
                const deleteUrl = url;
                const deleteId = deleteUrl.split("=")[1];
                menus = menus.filter(item => item.id !== deleteId);
/*                 console.log(JSON.stringify(menus));
 */             res.write(JSON.stringify(menus));           
                
                res.end();
            break;
    }

        
}
})

server.listen(PORT, () => console.log(`Server is running on PORT at ${PORT}`));