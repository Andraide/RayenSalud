import { BehaviorSubject } from 'rxjs';


const currentUserDataSubject = new BehaviorSubject();
const currentCarDataSubject = new BehaviorSubject();
const currentCarPhotosSubject = new BehaviorSubject();
const currentDateSubject = new BehaviorSubject();


export const formService = {
    setUserData,
    setCarData,
    setCarPhotos,
    setDate,
    currentUserData: currentUserDataSubject.asObservable(),
    currentCarData: currentCarDataSubject.asObservable(),
    currentCarPhotos: currentCarPhotosSubject.asObservable(),
    currentDate: currentDateSubject.asObservable(),
    get currentUserDataValue () { return currentUserDataSubject.value },
    get currentCarDataValue () { return currentCarDataSubject.value },
    get currentCarPhotosValue () { return currentCarPhotosSubject.value },
    get currentDateValue () { return currentDateSubject.value },
    cleanStates,
    sendFormData
};

function setUserData(name, phone) {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem('UserInfo', JSON.stringify({ name, phone }))
            currentUserDataSubject.next({ name, phone })
            resolve()
        }catch(error)
        {
            reject(error.message)
        }
    }) 
    
}

function setCarData(year, plate, carType) {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem('CarInfo', JSON.stringify({ year, plate, carType }))
            currentCarDataSubject.next({ year, plate, carType })
            resolve()
        }catch(error)
        {
            reject(error.message)
        }
    }) 
    
}

function setCarPhotos(photo) {
    return new Promise((resolve, reject) => {
        try {
            currentCarPhotosSubject.next(photo)
            resolve()
        }catch(error)
        {
            reject(error.message)
        }
    }) 
    
}

function setDate(dateIn, dateOut) {
    return new Promise((resolve, reject) => {
        try {
            currentDateSubject.next({ dateIn, dateOut })
            resolve()
        }catch(error)
        {
            reject(error.message)
        }
    }) 
    
}

function cleanStates() {
    currentUserDataSubject.next(null)
    currentCarDataSubject.next(null)
    currentCarPhotosSubject.next(null)
    currentDateSubject.next(null)
}

function sendFormData(name, phone, year, plate, carType, dateIn, dateOut, files)
{
    return new Promise((resolve, reject) => {
        try {
            console.log("Name", name, "Phone", phone, "Year", year, "Plate", plate, "Car type", carType, "dateIn", dateIn, "dateOut", dateOut)
            resolve();
        }catch(error)
        {
            console.log("Error", error.message)
            reject();
        }
    })
}