
export class ImageContext{
    id: string
    gallery_id: string
    image_url: string
    thumbnail_url: string
    creator_name: string
    extension: string

     constructor(data: { id: string; gallery_id: string; image_url: string; thumbnail_url:string; creator_name: string; extension: string }) {
        this.id = data.id;
        this.gallery_id = data.gallery_id;
        this.image_url = data.image_url;
        this.thumbnail_url = data.thumbnail_url
        this.creator_name = data.creator_name;
        this.extension = data.extension
    }

    // Optional helper to create from JSON string
    static fromJSON(json: string): ImageContext {
        const data = JSON.parse(json);
        return new ImageContext(data);
    }

}