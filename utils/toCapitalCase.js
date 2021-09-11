export const to_capital_case = (str) =>{
    return str.replace(
      /\w\S*/g,
      function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      }
    )
  }

  export const capitalize_first_letter = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  export const addComma = (n) =>{
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }