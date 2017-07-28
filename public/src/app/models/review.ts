export class Review {
constructor(
    public review:string = '',
    public rating:number = null,
    public _byUser:string = '',
    public _reviewedVendor:string = '',
    public _reviewedProduct:string = '',
  ) {}
}
