'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const create_item = async (formdata) => {
  const session = await getServerSession(authOptions);
  
  const res = await fetch('http://localhost:3000/api/item', {
    method: 'POST',
    body: JSON.stringify({
      owner: session.user.id,
      item_name: formdata.get('item_name'),
      desc: formdata.get('desc'),
      quantity: formdata.get('quantity'),
      unit_price: formdata.get('unit_price')
    })
  })

  // TODO: Revise this part according to what action should be done after
  // sending the request
  if(res.ok) {
    redirect('/');
  }
};
