'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDb } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import Item from '@/models/items';

export const create_item = async (formdata) => {
  const session = await getServerSession(authOptions);

  if (!session.user) {
    return {
      success: false,
      message: 'You must be logged in'
    };
  }

  try {
    await connectToDb();

    const newItem = new Item({
      owner: session.user.id,
      item_name: formdata.get('item_name'),
      description: formdata.get('desc'),
      quantity: formdata.get('quantity'),
      unitPrice: formdata.get('unit_price')
    });

    newItem.save();
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
