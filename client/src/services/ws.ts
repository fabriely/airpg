const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8000/ws"; 

export const connectWebSocket = (onMessage: (message: string) => void) => {
    const socket = new WebSocket(WS_BASE_URL);

    socket.onopen = () => {
        console.log("WebSocket conectado:", WS_BASE_URL);
    };

    socket.onmessage = (event) => {
        onMessage(event.data);
    };

    socket.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
    };

    socket.onclose = () => {
        console.log("WebSocket desconectado.");
    };

    return socket;
};
