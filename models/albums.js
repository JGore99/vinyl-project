import mongoose from "mongoose"
const Schema = mongoose.Schema

const albumSchema = new Schema({
  artist: String, 
  title: String, 
  trackList: [ String ],
  collectedBy: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  reviews: String

})

const Album = mongoose.model("Album", albumSchema)

export {
  Album
}