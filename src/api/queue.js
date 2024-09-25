import { format, differenceInMinutes } from 'date-fns';
const { db, dbQueues } = require('../FirebaseConfig')
const { ref, child, get, set, push, update, remove, onValue, onChildChanged } = require("firebase/database");

export const dbQueueWithCurDateRef = (queueId, path) => {
  // const curDate = format(new Date(), 'yyyy-MM-dd');
  const date = format(Date.now(), 'yyyy-MM-dd')
  if (queueId !== undefined && path)
    return ref(db, `queues/${queueId}/daily_stats/${date}/${path}`);
  else if (queueId !== undefined)
    return ref(db, `queues/${queueId}/daily_stats/${date}`);
  else
    return ref(db);
}

// Get queue info

export function getQueueNameById(queueId) {
  return new Promise((resolve, reject) => {
    get(child(db, `/queues/${queueId}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          return (snapshot.val().name);
        } else {
          console.log("No data available");
        }
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

export function getBasicQueueInfoByDate(queueId, date) {
  return new Promise((resolve, reject) => {
    console.log("Getting queue basic info ...")
    get(ref(db, `/queues/${queueId}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          if (date === undefined)
            date = format(Date.now(), 'yyyy-MM-dd')
          const queueInfo = snapshot.val();
          const basicInfo = {
            name: queueInfo.name || "Undefined name",
            limit: Number(queueInfo.limit),
            limitedDuration: Number(queueInfo.limitedDuration),
            description: queueInfo.description,
            queueId: queueInfo.id,
            status: queueInfo.status || "Active",
            // averageServedTime: queueInfo.daily_stats[`${date}`] && queueInfo.daily_stats[`${date}`].averageServedTime ? queueInfo.daily_stats[`${date}`].averageServedTime : queueInfo.limitedDuration
          }
          const guestTokens = (queueInfo.daily_stats && queueInfo.daily_stats[`${date}`]) ? queueInfo.daily_stats[`${date}`].guests || {} : {}
          basicInfo['activeGuests'] = Object.values(guestTokens).filter(g => g.status.startsWith('waiting')).length;
          basicInfo['totalGuests'] = Object.values(guestTokens).length;
          // resolve({ basicInfo: basicInfo, guests: queueInfo.daily_stats[`${date}`] ? queueInfo.daily_stats[`${date}`].guests : {} });
          resolve({ basicInfo: basicInfo, guests: queueInfo.daily_stats && queueInfo.daily_stats[`${date}`] ? queueInfo.daily_stats[`${date}`].guests : {} });
        } else {
          resolve({})
        }
      })
      // .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

export function addNewGuestToken(token) {
  return new Promise((resolve, reject) => {
    getBasicQueueInfoByDate(token.queueId)
      // .then(snapshot => {
      //   if (snapshot) {
      //     return (snapshot);
      //   } else {
      //     console.log("No data available");
      //   }
      // })
      .then(snapshot => {
        const data = snapshot;
        // let averageServedTime = data.basicInfo.averageServedTime
        // Update position for new token 
        let totalGuests = (data.guests ? Object.values(data.guests).length : 0)
        const curPosition = (data.guests ?
          Object.values(data.guests).filter(g => g.status && g.status.includes("waiting")).length : 0)
        const newToken = { ...token }
        newToken.position = curPosition + 1;
        newToken.number = totalGuests + 1;

        //add to DB
        const updateList = {}
        updateList[`/guests/${token.id}`] = newToken;
        updateList['totalGuests'] = totalGuests + 1
        const dbRef = dbQueueWithCurDateRef(token.queueId)
        update(dbRef, updateList)

        return ("Added new token: ", newToken.number)
      })
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        console.log("Error in: ", error)
        reject(error)
      }
      );
  });
}


export function getTokens(queueId, date) {
  return new Promise((resolve, reject) => {
    get(dbQueueWithCurDateRef(queueId))
      .then(snapshot => {
        if (snapshot.exists()) {
          return (Object.values(snapshot.val().guests));
        } else {
          // console.log("No data available");
        }
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });


}

export function getTokenById(queueId, tokenId) {
  return new Promise((resolve, reject) => {
    console.log("Getting token... ")
    get(dbQueueWithCurDateRef(queueId, `/guests/${tokenId}`))
      .then(snapshot => {
        if (snapshot) {
          resolve({ ...snapshot.val() });
        }
      })
      .catch(error => {
        console.log("Error in getting token: ", error.message)
        reject(error)
      });
  });
}

export function updateMesTokenId(queueId, guestId, mesTokenId) {
  return new Promise((resolve, reject) => {
    update(dbQueueWithCurDateRef(queueId, `/guests/${guestId}`), { notifyTokenId: mesTokenId })
      .then(() => {
        console.log("Updated message token.")
        resolve();
      })
      .catch(error => reject(error));
  });
}

export function updateToken(queueId, guestId, data) {
  const curDate = format(Date.now(), 'yyyy-MM-dd')
  const dbRef = ref(db, `queues/${queueId}/daily_stats/${curDate}/guests/${guestId}`);
  // const dbRef = dbQueueWithCurDateRef(queueId, `/guests/${guestId}`);
  console.log(dbRef)
  return new Promise((resolve, reject) => {
    update(dbRef, { ...data })
      .then(() => {
        resolve("Updated token successfully.")
      })
      .catch(error => reject(error));
  });
}

//Work fine for check in
// export function updateCheckInToken(token) {
//   const startedTime = new Date(token.startedTime)
//   const endTime = new Date();
//   const waitTime = differenceInMinutes(endTime, startedTime);
//   const updates = {}
//   updates[`/guests/${token.id}/endTime`] = endTime;
//   updates[`/guests/${token.id}/waitTime`] = waitTime;
//   updates[`/guests/${token.id}/status`] = "served";

//   return new Promise((resolve, reject) => {
//     update(dbQueueWithCurDateRef(token.queueId), updates)
//       .then(() => {
//         return resolve("Updated token successfully.")
//       }).catch(err => {
//         console.log("Update action error: ", err.message)
//         reject(err)
//       })
//   })

// }


export function updateCheckInToken(token, tokenList) {
  const updatedList = [...tokenList];
  const startedTime = new Date(token.startedTime)
  const endTime = new Date();
  const waitTime = differenceInMinutes(endTime, startedTime);

  return new Promise((resolve, reject) => {
    update(dbQueueWithCurDateRef(token.queueId, `/guests/${token.id}`), { position: 0, endTime: endTime, waitTime: waitTime, status: 'served' })
      .then(() => {
        const position = token.position;
        const updatePositions = {};
        updatedList.forEach((t) => {
          if (t.position > position) {
            //update new posiotn list for guest in queue
            t.position = t.position - 1;
            updatePositions[`/guests/${t.id}/position`] = t.position;
          }
        });
        update(dbQueueWithCurDateRef(token.queueId), updatePositions)
        resolve(updatedList.filter(t => t.id !== token.id))
      }).catch(err => {
        console.log("Update action error: ", err.message)
        reject(err)
      })
  })

}
export function updateDoneToken(token) {
  // const dbRef = dbQueueWithCurDateRef(token.queueId, '/guests');
  const endTime = new Date().toISOString();
  const servingTime = new Date(token.servingTime) || endTime;
  const servingDuration = differenceInMinutes(endTime, servingTime);
  const updates = {}
  updates[`endTime`] = endTime;
  updates[`status`] = "served";

  return new Promise((resolve, reject) => {
    update(dbQueueWithCurDateRef(token.queueId, `/guests/${token.id}`), updates)
      .then(() => resolve("Success"))
      .catch(err => {
        console.log("Update action error: ", err.message)
        reject(err)
      })
  })
}

export function cancelGuest(token) {
  return new Promise((resolve, reject) => {
    const activeRef = dbQueueWithCurDateRef(token.queueId, '/guests');
    get(activeRef)
      // update(child(activeRef, `/${token.id}`), { status: 'canceled' })
      .then((snapshot) => {
        const updatePositions = {};
        updatePositions[`/${token.id}/status`] = "canceled";

        const updatedList = Object.values(snapshot.val()).filter(value => value.status.startsWith('waiting'))
        updatedList.forEach((t) => {
          if (t.position > token.position) {
            // t.position = t.position - 1
            //update new posiotn list for guest in queue
            updatePositions[`/${t.id}/position`] = t.position - 1;
          }
        });
        update(activeRef, updatePositions)
          .catch(err => reject(err))

        resolve({ status: 'success' })
      })
      // .then(res => {
      //   if (res) {
      //     const cancelPosition = res.guests[token.id].position;
      //     const updatePositions = {};
      //     Object.values(res).forEach((childSnapshot) => {
      //       if (childSnapshot.position > cancelPosition) {
      //         //update new posiotn list for guest in queue
      //         updatePositions[`/${childSnapshot}/position`] = childSnapshot.position - 1;
      //       }
      //     });
      //     update(activeRef, updatePositions)
      //       .catch(err => reject(err))
      //     resolve("Cancel guest suceessfully.")
      //   }
      // })
      .catch(error => reject(error));
  })
}

export const removeToken = (guestToken) => {
  try {
    const activeRef = dbQueueWithCurDateRef(guestToken.queueId, '/guests');
    get(activeRef)
      .then(async (snapshot) => {
        const updatePositions = {};
        updatePositions[`/${guestToken.id}/status`] = "canceled";

        const updatedList = Object.values(snapshot.val()).filter(value => value.status.startsWith('waiting'))
        updatedList.forEach((t) => {
          if (t.position > guestToken.position) {
            //update new posiotn list for guest in queue
            updatePositions[`/${t.id}/position`] = t.position - 1;
          }
        });
        await update(activeRef, updatePositions)
        console.log("\tDone from child 2")

      });
  }
  catch (error) {
    console.log("\tError by: ", error.message)
  }
}

export function moveNoShowUpGuest(token, tokenList) {

  const updatedList = [...tokenList];

  if (updatedList.length > 1) {
    return new Promise((resolve, reject) => {
      // get(dbQueueWithCurDateRef(token.queueId, `/guests`))
      update(dbQueueWithCurDateRef(token.queueId, `/guests/${token.id}`), { position: updatedList.length })
        .then((snapshot) => {
          // updatedList = Object.values(snapshot.val())
          const position = token.position;
          const updatePositions = {};
          updatedList.forEach((t) => {
            if (t.id === token.id)
              t.position = updatedList.length;
            else if (t.position > position) {
              //update new posiotn list for guest in queue
              t.position = t.position - 1;
              updatePositions[`/guests/${t.id}/position`] = t.position;
            }
          });
          update(dbQueueWithCurDateRef(token.queueId), updatePositions)
          updatedList.sort((a, b) => a.position - b.position);
          return resolve(updatedList)
        })
        .catch(err => {
          console.log("Update action error: ", err.message)
          reject(err)
        })
    })
  }
  else return updatedList;

}

export const handleOnValue = onValue;
