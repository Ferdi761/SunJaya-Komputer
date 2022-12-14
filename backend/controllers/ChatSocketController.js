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
                that.socketConnectionData.set(socket, {id: parseInt(message), name: "", read: -1, auth: -1});
            });

            // autentikasi untuk memberikan role pada chat
            socket.on("auth", function(message) {
                let socketData = that.socketConnectionData.get(socket);
                if (socketData != undefined && socketData != null) {
                    if (message == "admin" || message == "karyawan") {
                        socketData.auth = EMPLOYEE;
    
                        that.socketConnectionData.forEach(function(data, socket) {
                            if (data != undefined && data != null && data.auth == CUSTOMER) {
                                socket.emit("aktif", "Aktif");
                            }
                        });
                        that.employeeWhoOpenChatMenu.add(socket);
                    }
                    else {
                        socketData.auth = CUSTOMER;
                    }
                }
            });

            socket.on("name", function(message) {
                let socketData = that.socketConnectionData.get(socket);
                if (socketData != undefined && socketData != null) {
                    if (socketData.auth == CUSTOMER) {
                        socketData.name = message;
                    }
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
                socketData.read = -1;
            }

            socket.on("read", function(message) {
                let socketData = that.socketConnectionData.get(socket);
                if (socketData != undefined && socketData != null) {
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
                                roomData = {employee: null, customer: null};
                                that.room.set(read, roomData);
                            }
                            roomData.employee = socket;
                            socketData.read = read;

                            if (roomData.customer != null) {
                                // bila room sudah ada dan belum ada karyawan yang membuka chat
                                // maka karyawan bisa membuka
                                roomData.employee = socket;
                                socketData.read = read;

                                roomData.customer.emit("readall", "readall");
                                roomData.employee.emit("aktif", "Aktif");
                            }
                            else {
                                roomData.employee.emit("aktif", "Tidak Aktif");
                            }

                            that.employeeWhoOpenChatMenu.forEach(function(value) {
                                value.emit("readed", socketData.read);
                            });

                            that.employeeWhoOpenChatMenu.add(socket);
                        }
                    }
                    else if (socketData.auth == CUSTOMER) {
                        if (read != -1) {
                            // mengambil data room
                            let roomData = that.room.get(socketData.id);
        
                            if (roomData === undefined) {
                                // kalau room tidak ada maka dibuat terlebih dahulu
                                roomData = {employee: null, customer: null};
                                that.room.set(socketData.id, roomData);
                            }
                            socketData.read = 0;
                            roomData.customer = socket;

                            if (roomData.employee != null) {
                                // bila room sudah ada karena sudah dibuat oleh karyawan,
                                // maka tinggal masuk saja

                                roomData.employee.emit("readall", "readall");
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
                }
            });

            socket.on("message to", function(message) {
                let socketData = that.socketConnectionData.get(socket);

                if (socketData != undefined && socketData != null) {
                    if (socketData.auth == CUSTOMER) {
                        let roomData = that.room.get(socketData.id);

                        try {
                            let read = "unread";
                            if (roomData.employee != null) {
                                roomData.employee.emit("message to", message);
                                read = "read";
                            }
                            else {
        
                            }
        
                            that.employeeWhoOpenChatMenu.forEach(function(value) {
                                value.emit("coming " + read, socketData.id + "!$!" + socketData.name);
                            });
                            socket.emit("message self " + read, message);
                        } catch (error) {
                            
                        }
                    }
                    else if (socketData.auth == EMPLOYEE && socketData.read != -1) {
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
                }
            });

            socket.on("disconnect", function(reason) {
                let socketData = that.socketConnectionData.get(socket);
                if (socketData != undefined && socketData != null) {
                    if (socketData.auth == CUSTOMER) {
                        customerOutOfRoom(socketData);

                        let roomData = that.room.get(socketData.id);
                        if (roomData != undefined && roomData.employee != null) {
                            roomData.employee.emit("aktif", "Tidak Aktif");
                        }
                    }
                    else if (socketData.auth == EMPLOYEE) {
                        employeeOutFromRoom(socketData);

                        that.employeeWhoOpenChatMenu.delete(socket);
                        if (that.employeeWhoOpenChatMenu.size == 0) {
                            that.socketConnectionData.forEach(function(data, customer_socket) {
                                if (data != undefined && data != null && data.auth == CUSTOMER) {
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