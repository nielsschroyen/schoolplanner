export function assignToType<T>(obj:any):T{
  return Object.assign({},obj) as T;
}

export function overwriteWith<T>(obj1:T,obj2:any):T{
  let newObj1:any = Object.assign({},obj1);
  return Object.assign(newObj1,obj2) as T;
}

