export const isCodeValid = (code) => code.match('^[A-Za-z0-9-]*$'); // Only letters, numbers and - allowed

export const getSentenceCaseText = (txt) =>
  txt?.charAt(0)?.toUpperCase() + txt?.substr(1)?.toLowerCase();


export const formatTokenNumber = (number)=>{
  return number < 99 ? `00${number}` : number;
}