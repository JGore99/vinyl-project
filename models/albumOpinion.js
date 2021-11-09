import mongoose from 'mongoose'
const Schema = mongoose.Schema

const albumOpinionSchema = new Schema({
  content: String,
  album: {type: Schema.Types.ObjectId, ref: "Album"},
  author: {type: Schema.Types.ObjectId, ref: "Profile"},
},{
  timestamps: true,
})

const AlbumOpinion = mongoose.model("AlbumOpinion", albumOpinionSchema)

export {
  AlbumOpinion
}