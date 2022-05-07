export const state = () => ({
  dataMedications:[]
})

export const actions={
  async fetchDataMedications({commit}, dataMedications){

  }
}

export const mutations={
  setDataMedications(state, dataMedications){
      state.dataMedications=dataMedications
  }
}

export const getters={
  medData: s=>s.dataMedications
}
