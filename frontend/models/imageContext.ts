
export class ImageWithContext{
    id: string
    gallery_id: string
    image_url: string
    creator_name: string


     constructor(data: { id: string; gallery_id: string; image_url: string; creator_name: string }) {
        this.id = data.id;
        this.gallery_id = data.gallery_id;
        this.image_url = data.image_url;
        this.creator_name = data.creator_name;
    }

    // Optional helper to create from JSON string
    static fromJSON(json: string): ImageWithContext {
        const data = JSON.parse(json);
        return new ImageWithContext(data);
    }

}