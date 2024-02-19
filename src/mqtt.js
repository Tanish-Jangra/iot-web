var client,clientId;
let map=new Map();
let transactionId=1;
let destinationName;

export function publish(URL,showParameters){
    /* global Paho */
    let message = new Paho.MQTT.Message(JSON.stringify({
        client: clientId,
        transaction: transactionId,
        url: URL
    }));
    // https://smart.mrmprocom.com/debugging?device=
    const s=destinationName.split("?")[1].split("=")[1];
    const splitUrl = destinationName.split("?");
    if (splitUrl[0] === "https://smart.mrmprocom.com/wan"){
        message.destinationName = "request/wan/" +s;
    } else if (splitUrl[0] === "https://smart.mrmprocom.com/debugging") {
        message.destinationName = "request/debugging/" +s;
    } else {
        message.destinationName = "request/debugging/" +s;
    }
    console.log("Message is: ", message);
    console.log(message.destinationName);
    console.log(URL,transactionId.toString());
    map.set(transactionId,showParameters);
    client.send(message);
    transactionId++;
}
export function setDestinationName(destination){
    destinationName=destination;
}
export function getClient(){
    return client;
}
export function disConnect(){
    if(client!==undefined)
        client.disconnect();
}
export function MQTT(connectionCallback) {
    function subscribe(){
        client.subscribe("response/" + clientId);
        console.log("Subscribed");
        connectionCallback();
    }

    function connect() {
        // Create a client instance
        console.log("Connecting...");
        clientId = generateRandomString(10);
        client = new Paho.MQTT.Client("amazing-logisticians.cloudmqtt.com", 443, clientId);

        // set callback handlers
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        // connect the client
        client.connect({
            useSSL: true,
            onSuccess: onConnect,
            onFailure: onConnectionFailed,
            userName: "app_client",
            password: "uV7wNr5l110C"
        });
    }

    // called when the client connects
    function onConnect(){
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        subscribe();
    }
    function onConnectionFailed(responseObject) {
        console.log("Connection failed: " + responseObject.errorMessage);
        console.log("Error code: " + responseObject.errorCode);
    }
    // called when the client loses its connection
    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }

    function generateRandomString(length) {
        const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = CHARACTERS.length;
        let randomString = '';
    
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            const randomChar = CHARACTERS.charAt(randomIndex);
            randomString += randomChar;
        }
    
        return randomString;
    }
    
// called when a message arrives
function onMessageArrived(message) {
        console.log("onMessageArrived:" + message.payloadString);
        const jsonData = JSON.parse(message.payloadString);
        let transactionId=jsonData.transaction;
        map.get(transactionId)(jsonData);
    }
    return { connect: connect };
}