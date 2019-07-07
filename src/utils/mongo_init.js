export default (mongoose) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.mongodb, {useNewUrlParser: true})
    const db = mongoose.connection
    db.on("error", function(){
      reject("error")
    })
    db.once("open", function() {
      resolve("we're connected!")
    })
  })
}