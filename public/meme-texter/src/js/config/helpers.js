export const splitTextInToTwo = (text) => {
  if(!text){
    return ["", ""]
  }

  const words = text.split(" ");
  const count = words.length;

  const middlePoint = Math.round(count/2);

  const text0 = words.slice(0, middlePoint).join(" ");
  const text1 = words.slice(middlePoint).join(" ");

  return [text0, text1]

}

export const getRecordById = (array, id) => array.find( item => item.id == id) || {}

export const getRecordByAttributeAndValue = (array, attribute, value) => {
  return array.find( item => item[attribute] == value) || {}
}