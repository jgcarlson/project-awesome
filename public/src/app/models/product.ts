export class Product {
  constructor(
    public title:string = '',
    public description:string = '',
    public price:number = null,
    public totalRating:number = null,
    public avgRating:number = null,
    public _vendor:string = '',
    public tags:Array<string> = [],
    public images:Array<string> = []
  ) {}
}
