export class Article {
  private _body: string;
  private _id: string;
  private _title: string;
  private _url: string;

  constructor(body: string, id: string, title: string, url: string) {
    this._body = body;
    this._id = id;
    this._title = title;
    this._url = url;
  }

  get body(): string {
    return this._body;
  }

  get id(): string {
    return this._id;
  }
  
  get title(): string {
    return this._title;
  }

  get url(): string {
    return this._url;
  }
}