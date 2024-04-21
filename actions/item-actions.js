'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import Item from '@/models/items';
import { connectToDb } from '@/lib/mongodb';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// CREATE
export const create_item = async (formdata) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      success: false,
      message: 'You must be logged in'
    };
  }

  try {
    await connectToDb();

    const newItem = new Item({
      owner: session.user.id,
      itemName: formdata.get('item_name'),
      unitPrice: formdata.get('unit_price'),
      description: formdata.get('desc'),
      quantity: formdata.get('quantity')
    });

    newItem.save();
    revalidatePath('/create-item');

    return {
      success: true,
      message: 'Item created successfully.'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong'
    };
  }
};
