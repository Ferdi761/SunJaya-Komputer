class ChatData {
    message : string = ""
    fromOther : boolean = false

    constructor(message : string , fromOther : boolean) {
        this.message = message
        this.fromOther = fromOther
    }

    getMessage() : string {
        return this.message
    }

    isFromOther() : boolean {
        return this.fromOther
    }
}

export { ChatData }