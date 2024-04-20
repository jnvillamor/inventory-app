import { connectToDb } from "@/lib/mongodb"
import Item from "@/models/items";


export const GET = async ( request, { params } ) => {
  console.log(params)

  try {
    await connectToDb(); 

    const items = await Item.find({ owner: params.id }).populate('owner')

    return new Response(JSON.stringify(items), { status: 200 })
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}