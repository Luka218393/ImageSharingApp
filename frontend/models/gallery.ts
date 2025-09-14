import { v4 as uuidv4 } from 'uuid';

export class Gallery {
    id: string
    title: string

    constructor(id:string | null, title: string){
        if (id == null) {this.id = uuidv4()}
        else {this.id = id}
        this.title = title
    }
}