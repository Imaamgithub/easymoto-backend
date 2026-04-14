import { Server } from 'socket.io'
import http from 'http'

export function initSocket(server: http.Server) {

  const io = new Server(server, {
    cors: { origin: '*' }
  })

  io.on('connection', socket => {

    socket.on('subscribe-order', orderId => {
      socket.join(orderId)
    })

  })

  return io
}