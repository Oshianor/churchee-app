// import RNFetchBlob from 'rn-fetch-blob';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { config } from "../api";


// export const handleBase64Image = (name, header) => {
// 	const configOptions = {fileCache: true};
//   RNFetchBlob.config(configOptions)
//     .fetch('GET', config.img + header[name])
//     .then(async resp => {
//       filePath = resp.path();
//       const base64 = await resp.readFile('base64');
//       return {resp, base64};
//     })
//     .then(async obj => {
//       const headers = obj.resp.respInfo.headers;
//       const type = headers['Content-Type'];

//       const base64Data = `data:${type};base64,` + obj.base64;

//       await AsyncStorage.setItem(name, JSON.stringify(base64Data));
//     });
// }


// email validation utils
export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// formart currency
export const formatMoney = (
  amount,
  decimalCount = 2,
  decimal = '.',
  thousands = ',',
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
};

export const AsyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
};

  
  
export const moveElement = (arr, oldIndex, newIndex) => {
    if (newIndex >= arr.length) {
      const k = newIndex - arr.length + 1;
      while (k--) {
          arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr; // for testing
};
