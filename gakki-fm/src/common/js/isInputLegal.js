/**
 * Created by liyanxiang on 2017/10/13.
 */
export default function isInputLegal(...stringArray) {
  let reg = /^[0-9a-zA-Z]*$/g;
  console.log(stringArray)
  for (let string of stringArray) {
    let legal = reg.test(string)
    console.log(string, legal)
    if (!legal) {
      return false
    }
    reg.lastIndex = 0
  }
  return true
}
