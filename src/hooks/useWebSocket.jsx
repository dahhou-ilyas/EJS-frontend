import { useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { SPRING_SOCKET, SPRINGBOOT_API_URL } from '@/config';

export const useWebSocket = () => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = (token) => {
    return new Promise((resolve, reject) => {
      const client = new Client({
        brokerURL: `${SPRING_SOCKET}/ws?token=${token}`,
        connectHeaders: {},
        debug: (str) => console.log(str),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        webSocketFactory: () => new SockJS(`${SPRINGBOOT_API_URL}/ws?token=${token}`),
        onConnect: () => {
          setIsConnected(true);
          setStompClient(client);
          resolve(client);
        },
        onStompError: (frame) => {
          setIsConnected(false);
          reject(frame);
        },
        onDisconnect: () => setIsConnected(false),
      });

      client.activate();
    });
  };

  /* const onConnected = (client) => {
    setIsConnected(true);
    console.log('Connected to WebSocket server');
    // Additional logic after successful connection, if any
  };

  const onError = (frame) => {
    alert('Could not connect to WebSocket server. Please refresh this page to try again!');
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
  }; */

  return { connect, isConnected, stompClient };
};
