const { Socket } = require("socket.io");

const EMPLOYEE = 0;
const CUSTOMER = 1;

let that;

class ChatSocketController {
    constructor(socketIO) {
        this.socketIO = socketIO;
        this.socketConnectionData = new Map();
        that = this;

        // room digunakan untuk membagi chat agar lebih mudah,
        // sepasang karyawan dan pelanggan disebut sebagai room
        // room hanya dapat diisi oleh 2 orang, 1 pelanggan, dan hanya 1 karyawan
        // key untuk room haruslah id pelanggan
        //
        // sebuah room harus dihapus ketika telah kosong (pelanggan dan karyawan 
        // keluar dari chat)
        this.room = new Map();
        this.employeeWhoOpenChatMenu = new Set();

        this.socketIO.on("connection", function(socket) {

            socket.on("init", function(message) {
                that.socketConnectionData.set(socket, {id: parseInt(message), read: -1, auth: -1});
            });

            // autentikasi untuk memberikan role pada chat
            socket.on("auth", function(message) {
                let socketData = that.socketConnectionData.get(socket);
                if (message == "admin" || message == "karyawan") {
                    socketData.auth = EMPLOYEE;

                    that.socketConnectionData.forEach(function(data, socket) {
                        if (data.auth == CUSTOMER) {
                            socket.emit("aktif", "Aktif");
                        }
                    });
                }
                else {
                    socketData.auth = CUSTOMER;
                }
            });

            function updateRoom(roomData, id) {
                // room dihapus bila sudah tidak ada yang di dalam
                if (roomData.employee == null && roomData.customer == null) {
                    that.room.delete(id);
                }
            }

            function employeeOutFromRoom(socketData) {
                if (that.room.has(socketData.read)) {
                    // karyawan keluar dari room yang sedang dibukanya
                    let roomData = that.room.get(socketData.read);
                    roomData.employee = null;

                    updateRoom(roomData, socketData.read);
                }
                socketData.read = -1;
            }

            function customerOutOfRoom(socketData) {
                if (that.room.has(socketData.id)) {
                    // karyawan keluar dari room yang sedang dibukanya
                    let roomData = that.room.get(socketData.id);
                    roomData.employee = null;

                    updateRoom(roomData, socketData.id);
                }
                socketData.id = -1;
            }

            socket.on("read", function(message) {
                let socketData = that.socketConnectionData.get(socket);
                let read = parseInt(message);

                // kalau yang mengirim adalah karyawan
                if (socketData.auth == EMPLOYEE) {

                    // sebelum join chat lain, karyawan harus keluar dari chat yang
                    // dibukanya sekarang
                    employeeOutFromRoom(socketData);

                    // bila id pelanggan adalah -1 itu artinya karyawan keluar dari menu chat
                    if (read != -1) {

                        // mengambil data room
                        let roomData = that.room.get(read);
    
                        if (roomData === undefined) {
                            // kalau room tidak ada maka dibuat terlebih dahulu
                            that.room.set(read, {employee: socket, customer: null});
                            socketData.read = read;

                            socket.emit("aktif", "Tidak Aktif");
                        }
                        else if (roomData.employee == null) {
                            // bila room sudah ada dan belum ada karyawan yang membuka chat
                            // maka karyawan bisa membuka
                            roomData.employee = socket;
                            socketData.read = read;

                            roomData.customer.emit("readall", "readall");

                            roomData.employee.emit("aktif", "Aktif");
                        }
                        else {
                            socket.emit("denied", "denied");
                        }

                        that.employeeWhoOpenChatMenu.add(socket);
                    }
                    else {
                        that.employeeWhoOpenChatMenu.delete(socket);
                    }
                }
                else if (socketData.auth == CUSTOMER) {
                    if (read != -1) {
                        // mengambil data room
                        let roomData = that.room.get(socketData.id);
    
                        if (roomData === undefined) {
                            // kalau room tidak ada maka dibuat terlebih dahulu
                            that.room.set(socketData.id, {employee: null, customer: socket});
                            socketData.read = 0;
                        }
                        else  {
                            // bila room sudah ada karena sudah dibuat oleh karyawan,
                            // maka tinggal masuk saja
                            roomData.customer = socket;
                            socketData.read = 0;

                            roomData.employee.emit("readall", "readall");
                            // semua chat sudah dibaca oleh salah satu karyawan
                            that.employeeWhoOpenChatMenu.forEach(function(value) {
                                value.emit("readed", socketData.id);
                            });
                            
                            roomData.employee.emit("aktif", "Aktif");
                        }

                        if (that.employeeWhoOpenChatMenu.size > 0) {
                            socket.emit("aktif", "Aktif");
                        }
                        else {
                            socket.emit("aktif", "Tidak Aktif");
                        }
                    }
                    else {
                        customerOutOfRoom(socketData);
                    }
                }
            });

            socket.on("message to", function(message) {
                let socketData = that.socketConnectionData.get(socket);
                
                if (socketData.auth == CUSTOMER) {
                    let roomData = that.room.get(socketData.id);

                    let read = "unread";
                    if (roomData.employee != null) {
                        roomData.employee.emit("message to", message);
                        read = "read";
                    }
                    else {

                    }

                    that.employeeWhoOpenChatMenu.forEach(function(value) {
                        value.emit("coming " + read, socketData.id);
                    });
                    socket.emit("message self " + read, message);
                }
                else if (socketData.auth == EMPLOYEE && socketData.read !== -1) {
                    let roomData = that.room.get(socketData.read);
                    
                    let read = "unread";
                    if (roomData.customer != null) {
                        roomData.customer.emit("message to", message);
                        read = "read";
                    }
                    else {

                    }
                    socket.emit("message self " + read, message);
                }
            });

            socket.on("disconnect", function(reason) {
                let socketData = that.socketConnectionData.get(socket);
                if (socketData != undefined) {
                    if (socketData.auth == CUSTOMER) {
                        that.customerOutOfRoom(socketData);

                        let roomData = that.room.get(socketData.id);
                        if (roomData != undefined && roomData.employee != null) {
                            roomData.employee.emit("aktif", "Tidak Aktif");
                        }
                    }
                    else if (socketData.auth == EMPLOYEE) {
                        employeeOutFromRoom(socketData);

                        if (that.employeeWhoOpenChatMenu.size == 0) {
                            that.socketConnectionData.forEach(function(data, customer_socket) {
                                if (data.auth == CUSTOMER) {
                                    customer_socket.emit("aktif", "Tidak Aktif");
                                }
                            });
                        }
                    }
                    that.socketConnectionData.delete(socket);
                }
            })
        });
    }
}

module.exports = {
    ChatSocketController: ChatSocketController
};