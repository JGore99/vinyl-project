import mongoose from "mongoose"
const Schema = mongoose.Schema

const albumSchema = new Schema({
  discogsId: Number,
  artist: String, 
  title: String, 
  imageUrl: String,
  collectedBy: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  reviews: String

})

const Album = mongoose.model("Album", albumSchema)

export {
  Album
}