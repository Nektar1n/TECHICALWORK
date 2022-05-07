import * as XLSX from "xlsx";

export const actions={
  nuxtServerInit({commit}){
    console.log('**************server init*******************')
    let workSheets={}
    const data=XLSX.readFile('test_data.xlsx')
    for (const sheetName of data.SheetNames){
      workSheets[sheetName]=XLSX.utils.sheet_to_json(data.Sheets[sheetName])
    }
    commit('tablexlsx/setDataMedications', workSheets.данные)
  }
}
