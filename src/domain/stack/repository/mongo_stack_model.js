
export default (mgo) => {
  const schema =  new mgo.Schema({
    title: {
      type: String
    },
    state: {
      type: String
    }
  }, {
    timestamps: true
  })

  return mgo.model("stacks", schema)
}