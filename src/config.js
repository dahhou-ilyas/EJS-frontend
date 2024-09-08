const SPRINGBOOT_API_URL = process.env.NEXT_PUBLIC_SPRINGBOOT_API_URL || 'http://localhost:8080';
const SPRING_SOCKET = process.env.NEXT_PUBLIC_SPRING_SOCKET || 'ws://localhost:8080';
const FLASK_API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://localhost:5000';
const EXPRESS_API_URL = process.env.NEXT_PUBLIC_EXPRESS_API_URL || 'http://localhost:7777';

export { SPRINGBOOT_API_URL, FLASK_API_URL, EXPRESS_API_URL, SPRING_SOCKET};