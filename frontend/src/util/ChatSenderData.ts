class ChatSenderData {
    id: number = 0
    name : string = ""
    read : boolean = false

    constructor(id : number, name : string , read : boolean) {
        this.id = id;
        this.name = name
        this.read = read
    }

    getName() : string {
        return this.name
    }

    getID() : number {
        return this.id;
    }

    setRead(read : boolean) : void {
        this.read = read;
    }

    getRead() : boolean { 
        return this.read;
    }
}

export { ChatSenderData }