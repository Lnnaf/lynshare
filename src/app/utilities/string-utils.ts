/**
 * @param words 
 * @returns 
 * func get first letter of words
 * example: Linh Nguyen Van is LNV
 */
export const getInitials = (words: string) => {
  const _words = words.split(" ");
  const initials = _words.map(word => word.charAt(0)).join("");
  return initials.toUpperCase();
}

/**
 * 
 * @param str 
 * @returns 
 * func capitalize first of world
 * example: hello world -> Hello World
 */
export const toCapitalizeFirstChar = (str: string) => {
  if (!str) return str; // Return if the input string is empty or undefined

  const words = str.split(' ');
  const capitalizedWords = words.map(word => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });

  return capitalizedWords.join(' ');
}