export class User {
  constructor(
    public first_name:string = '',
    public last_name:string = '',
	public alias:string='',
    public email:string = '',
    public password:string = '',
    public confirm:string = '',
  ) {}
}
