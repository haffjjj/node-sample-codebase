export default (filter, def) => {
  if(filter && filter.length > 0){
    const p = filter.split(' ')
    const result = {}
    p.forEach((s)=>{
      const key = s[0] === '-' ? s.substring(1) : s
      Object.assign(result, {[key]: s[0] !== '-' ? 1 : -1})
    })
    return result
  }
  else{
    return def
  }
}