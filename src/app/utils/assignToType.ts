export function assignToType<T>(obj:any):T{
  return Object.assign({},obj) as T;
}
