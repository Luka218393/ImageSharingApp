import { v4 as uuidv4 } from 'uuid';

export class ImageContext{
    id: string
    image: File
    gallery_id: string
    image_url: string

    constructor(id: null | string, gallery_id: string, imageUrl: string){
        if (id == null) {this.id = uuidv4()}
        else {this.id = id}
        this.gallery_id = gallery_id
        this.image_url = imageUrl
    }
}