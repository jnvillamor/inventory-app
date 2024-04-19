import { connectToDb } from '@/lib/mongodb';
import Item from '@/models/items';

export const POST = async (request) => {
  const item = await request.json();

  try {
    await connectToDb();

    const newItem = new Item({
      owner: item.owner,
      item_name: item.item_name,
      description: item.desc,
      quantity: item.quantity,
      unit_price: item.unit_price
    });

    newItem.save();
    return new Response(JSON.stringify(newItem), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
