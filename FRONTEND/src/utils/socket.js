import {io} from 'socket.io-client';

const socket=io('http://localhost:4500',{
    withCredentials:true,
    autoConnect:false
})

export default socket

