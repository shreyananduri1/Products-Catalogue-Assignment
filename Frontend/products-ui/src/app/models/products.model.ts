export interface IProduct{
    _id?: string,
    productCode: string,
    productName: string,
    color: string,
    stock: number,
    description: string,
    category: string,
    seller:string,
    company: string,
    createdDate: Date,
    thumbnailURL: string
}
