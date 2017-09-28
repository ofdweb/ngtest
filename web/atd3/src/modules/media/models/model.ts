export class Model {
  
  loadFromObject(obj:any)
  {
    for(var k in obj)
    {
      if (this.hasOwnProperty(k))
      {
        this[k] = obj[k];
      }  
    }
    return this;
  }
  
  buildBody()
  {
    var res:any = {};
    for(var k in this)
    {
      if (this.hasOwnProperty(k))
      {
        res[k] = this[k];
      }
    }
    return res;
  }
  
};