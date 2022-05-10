export const state = () => ({
  dataMedications:[],
})

export const actions={
}

export const mutations={
  setDataMedications(state, dataMedications){
      state.dataMedications=dataMedications
  },
}

export const getters={
  medData: s=>s.dataMedications,
}
