import Docker from 'dockerode';
import { Readable } from "node:stream";


const docker = new Docker();


docker.ping().then(() =>{
    console.log('Docker is running')
}).catch(() => {
    console.log('Docker is not running')
})

docker.listContainers({ all:true }).then(containers => {
    console.log("Containers:", containers)
})

docker.pull("nginx:latest", (pullErr : Error | null , stream: Readable) => {
    if (pullErr) {
        console.error("Error initiating pull:", pullErr);
        return;
    }

    console.log("Pulling image 'nginx:latest'...");

    docker.modem.followProgress(stream, (progressErr, output) => {
        if (progressErr) {
            console.error("Error during pull:", progressErr);
            return;
        }

        console.log("Image pulled successfully");
        console.log("Pull output:", output);
    });
});