import axios from 'axios';
import {normalize,arrayOf} from 'normalizr'
import * as MySchema from './MySchema'

const extractImageIdFromUrl = (url) => {
  const a = url.lastIndexOf("/")+1;
  const b = url.lastIndexOf(".");
  return parseInt(url.substring(a,b));
}

export const getVariousImages = (tag) => {
  return new Promise( (resolve, reject) => {
    axios.get(`/api/search?q=${tag}`).
      then(
        (response) => {
          console.log("success: ",response);
          if(response.data.success == true){
            const variousImages = response.data.result.map( (item) => {
              return {
                generatorId: item.generatorID,
                imageId: extractImageIdFromUrl(item.imageUrl)
              };
            })
            resolve(variousImages);

          }else{
            reject("Backend failed to search - " + response)
          }
        },
        (response) => {
          console.log("failure: ",response);
          reject("Error: " + response.status + " - " + response.message)
        }
      )
  });
};

export const build = (imageId, generatorId, text0, text1) => {
  return new Promise( (resolve, reject) => {
    axios.get(`/api/build?text0=${text0}&text1=${text1}&imageId=${imageId}&generatorId=${generatorId}`).
      then(
        (response) => {
          console.log("created image: ", response);
          if(response.data.success == true){
            resolve(response.data.result.instanceImageUrl);
          }else{
            reject("Backend failed to search - " + response)
          }
        },
        (response) => {
          reject("Error: " + response.status + " - " + response.message)
        }
      );

  });
}

export const send = (to, instanceImageUrl) => {
  return new Promise( (resolve, reject) => {

    axios.get(`/api/send_message?to=${to}&media_url=${instanceImageUrl}`).
      then(
        (response) => {
          console.log("sent message: ", response);
          if(response.data.success == true){
            resolve();
          }else{
            reject("Backend failed to send message - " + response.status)
          }
        },
        (response) => {
          reject("Error: " + response.status + " - " + response.message)
        }
      );

  });
}

export const getAllPhoneNumbers = (pageNumber) => {
  return new Promise( (resolve, reject) => {
    axios.get(`/phone_numbers.json`, {
      params:{
        page: pageNumber
      }
    }).
    then(
      (response) => {
        console.log("got all phone numbers (raw): ", response.data);
        const normalizedData = normalize(response.data, arrayOf(MySchema.phoneNumber));
        console.log("got all phone numbers (normalized): ", normalizedData);
        if(pageNumber){
          normalizedData.paginationData = {
            [MySchema.phoneNumber.getKey()]: {
              [pageNumber]: normalizedData.result
            }
          }
        }
        resolve(normalizedData);
      },
      (response) => {
        reject("Error: " + response.status + " - " + response.message)
      }
    );

  });
}

export const addPhoneNumber = (name, number) => {
  return new Promise( (resolve, reject) => {
    axios.post(`/phone_numbers.json`, {
      phone_number: {
        number,
        name
      }
    }).
    then(
      (response) => {
        console.log("got added phone number: ", response.data);
        const normalizedData = normalize(response.data, MySchema.phoneNumber);
        console.log("got added phone number normalized: ", normalizedData)
        resolve(normalizedData);
      },
      (response) => {
        reject("Error: " + response.status + " - " + response.message)
      }
    );

  });
}

export const deletePhoneNumber = (id) => {
  return new Promise( (resolve, reject) => {
    axios.delete(`/phone_numbers/${id}.json`).
    then(
      (response) => {
        console.log("deleted phone book: ", response);
        resolve();
      },
      (response) => {
        reject("Error: " + response.status + " - " + response.message)
      }
    );

  });
}

export const getAllMessages = () => {
  return new Promise( (resolve, reject) => {
    axios.get(`/messages.json`).
      then(
        (response) => {
          console.log("got back all messages: ", response.data);
          const normalizedData = normalize(response.data, arrayOf(MySchema.message));
          console.log("got added phone number normalized: ", normalizedData)
          resolve(normalizedData);
        },
        (response) => {
          reject("Error: " + response.status + " - " + response.message)
        }
      );

  });
}

export const addMessage = (body, direction, phone_number_id, tag, text) => {
  return new Promise( (resolve, reject) => {
    axios.post(`/messages.json`, {
      body,
      direction,
      phone_number_id,
      tag,
      text
    }).
    then(
      (response) => {
          console.log("got back new message: ", response.data);
          const normalizedData = normalize(response.data, MySchema.message);
          console.log("got added message normalized: ", normalizedData);
          resolve(normalizedData);
        resolve(response.data);
      },
      (response) => {
        reject("Error: " + response.status + " - " + response.message)
      }
    );

  });
}

export const searchPhoneNumbers = (phrase) => {
  return new Promise( (resolve, reject) => {
    axios.get(`/phone_numbers/search.json`, {
      params: { phrase: phrase }
    }).
    then(
      (response) => {
        const normalizedData = normalize(response.data, arrayOf(MySchema.phoneNumber));
        normalizedData.phrase = phrase;
        resolve(normalizedData);
      },
      (response) => {
        reject(response);
      }
    );
  });
};
