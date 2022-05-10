import * as XLSX from "xlsx";
import firebase from "firebase/compat";

export const actions={
  nuxtServerInit({commit}){
    console.log('**************server init*******************')
    let workSheets={}

    try{
      const data=XLSX.readFile('test_data.xlsx')
      for (const sheetName of data.SheetNames){
        workSheets[sheetName]=XLSX.utils.sheet_to_json(data.Sheets[sheetName])
      }
      const dataMedications=workSheets.данные
      commit('tablexlsx/setDataMedications', dataMedications)
    }catch (e) {
      throw e
    }
  },
  async fetchDataFirebase(){
    try {
      const spMNN=(await firebase.database().ref('/spMNN').once('value')).val()
      const spTN=(await firebase.database().ref('/spTN').once('value')).val()
      return {spMNN, spTN}
    }catch (e) {
      return {}
    }
  }
}
