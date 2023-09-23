export function dateToYYYYMMDD(date:Date):String{
  const day = date.getDate();
  const month = date.getMonth() + 1; //Month from 0 to 11
  const year = date.getFullYear();
  return '' + year + '-' + zeroPad(month) + '-' + zeroPad(day) ;
}

function zeroPad(num:number):String{
  return (num<=9 ? '0' + num : num.toString())
}


