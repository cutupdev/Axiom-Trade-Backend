import { WebSocket } from "ws";

let allNewpairs: any = [];

const solananetwork = "1399811149"
const solanaSubscribe = `new-pairsv2-${solananetwork}`

const pingPongData = {
    "event": "pusher:ping",
    "data": {}
}

const emitData = [
    { "event": "pusher:subscribe", "data": { "auth": "", "channel": solanaSubscribe } },
    { "event": "pusher:subscribe", "data": { "auth": "", "channel": `${solanaSubscribe}-ms` } },
    // { "event": "pusher:subscribe", "data": { "channel": `token_updates_5gYUyYuJTispYeRyZ46WjqcgtQJGeArppGykYhTTpump_1399811149` } }
]

const parseData = async (data: any) => {
    const tokenData = JSON.parse(data)
    console.log("🚀 ~ parseData ~ tokenData:", tokenData)

    if (tokenData.length === 1 && allNewpairs.findIndex((item: any) => item.address === tokenData[0].a) === -1) {

        const address = tokenData[0].a
        const name = tokenData[0].aa
        const symbol = tokenData[0].b

        if (!address || !name || !symbol ||
            typeof address !== 'string' || typeof name !== 'string' || typeof symbol !== 'string' ||
            address.trim().length === 0 || name.trim().length === 0 || symbol.trim().length === 0) {
            return
        }

        const newTokenData = {
            // liquidity: tokenData[0].g,
            marketCap: tokenData[0].v,
            holders: tokenData[0].aj,
            volume: tokenData[0].d,
            address: tokenData[0].a,
            name: tokenData[0].aa,
            symbol: tokenData[0].b,
            dex: tokenData[0].z,
            price: tokenData[0].l,
            socialLinks: tokenData[0].w,
            timestamp: new Date().toISOString(),
            source: "bullx-streaming"
        }

        if (newTokenData.socialLinks.twitter) {
            console.log(newTokenData.socialLinks)
            console.log(`https://neo.bullx.io/terminal?chainId=1399811149&address=${newTokenData.address}`)
        }

    }
}

let currentInterval: NodeJS.Timeout | null = null;

export const pingPongInterval = (mainSocket: WebSocket) => {
    if (currentInterval) {
        console.log(" ===== timeout ====== ")
        clearInterval(currentInterval)
    }
    currentInterval = setInterval(() => {
        console.log(" ==== ping ===== ")
        sendMessage(mainSocket, pingPongData)
    }, 30_000)
    return currentInterval
}

export const initBullXNeo = async () => {
    // Initialize the token filtering service first
    // await tokenFilteringService.initialize()

    const mainSocket = new WebSocket("wss://stream.bullx.io/app/prowess-frail-sensitive?protocol=7&client=js&version=8.4.0-rc2&flash=false");

    mainSocket.onopen = () => {
        console.log("Main socket connected to BullX streaming service");

        // Send subscription data immediately after connection
        emitData.forEach(data => {
            sendMessage(mainSocket, data);
        });

        pingPongInterval(mainSocket)
    }

    mainSocket.onmessage = async (event: any) => {
        const data = JSON.parse(event.data)
        console.log("🚀 ~ initBullXNeo ~ data:", data)
        if (data.event === solanaSubscribe) {
            await parseData(data.data)
        }
    }

    mainSocket.onclose = (event) => {
        console.log("Main socket closed:", event.code, event.reason);
        initBullXNeo()
    }

    mainSocket.onerror = (error) => {
        console.error("Main socket error:", error);
    }
}

// Function to send messages to the socket
export const sendMessage = (socket: WebSocket, message: any) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.error("Socket is not open. Current state:", socket.readyState);
        // initBullXNeo()
    }
}
