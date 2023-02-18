import moment from 'moment'
export default {
  methods: {
    getColor(loan) {
      if(loan.status == 'SETTLED' || loan.status == 'LIQUIDATED')
        return 'var(--blue)'
      else if (loan.approved)
        return '#06B941'
      else
        return '#CC0606'
    },
    getBgColor(loan) {
      if(loan.status == 'SETTLED' || loan.status == 'LIQUIDATED')
        return 'rgba(0, 68, 170, 0.1)'
      else if (loan.approved)
        return 'rgb(6, 185, 65, 0.1)'
      else
        return 'rgb(204, 6, 6, 0.1)'
    },
    getColorTransation(status) {
      if(status == 'PAID') 
        return '#06B941'
      else if(status == "OVERPAID")
        return 'var(--blue)'
      else
        return '#CC0606'
    },
    getBgColorTransaction(status) {
      if(status == 'PAID') 
        return  'rgba(6, 185, 65, 0.1)'
      else if(status == "OVERPAID")
        return 'rgba(0, 68, 170, 0.1)'
      else
        return 'rgb(204, 6, 6, 0.1)'

    }
  },
  filters: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY") 
    },
    formatNumber(number) {
      return number.toLocaleString("en-US");
    }
  },
}
