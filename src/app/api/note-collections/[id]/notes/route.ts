// src/app/api/note-collections/[id]/notes/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 try {
   const cookieStore = cookies();
   const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
   
   const urlParts = request.nextUrl.pathname.split("/");
   const collectionId = urlParts[urlParts.length - 2];
   const searchParams = request.nextUrl.searchParams;
   const page = parseInt(searchParams.get('page') || '1');
   const pageSize = parseInt(searchParams.get('pageSize') || '10');

   if (!collectionId) {
     return NextResponse.json({ error: "Collection ID is required" }, { status: 400 });
   }

   const countQuery = await supabase
     .from("notes")
     .select('*', { count: 'exact', head: true })
     .eq("collection_id", collectionId);

   const total = countQuery.count || 0;
   const offset = (page - 1) * pageSize;

   const { data, error } = await supabase
     .from("notes")
     .select(`
       *,
       writer:users(id, full_name, profile_image_url)
     `)
     .eq("collection_id", collectionId)
     .order("created_at", { ascending: false })
     .range(offset, offset + pageSize - 1);

   if (error) {
     console.error("Error fetching notes:", error.message);
     return NextResponse.json({ error: error.message }, { status: 500 });
   }

   return NextResponse.json({
     data,
     pagination: {
       page,
       pageSize,
       total,
       totalPages: Math.ceil(total / pageSize)
     }
   }, { status: 200 });
 } catch (error) {
   console.error("Server error:", error);
   return NextResponse.json({ error: "Internal server error" }, { status: 500 });
 }
}

export async function POST(request: NextRequest) {
 try {
   const cookieStore = cookies();
   const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
   const body = await request.json();
   const urlParts = request.nextUrl.pathname.split("/");
   const collectionId = urlParts[urlParts.length - 2];

   const { data, error } = await supabase
     .from("notes")
     .insert([
       {
         title: body.title,
         collection_id: collectionId,
         writer: body.writer
       }
     ])
     .select(`
       *,
       writer:users(id, full_name, profile_image_url)
     `)
     .single();

   if (error) {
     console.error("Error creating note:", error.message);
     return NextResponse.json({ error: error.message }, { status: 500 });
   }

   return NextResponse.json({ data }, { status: 201 });
 } catch (error) {
   console.error("Server error:", error);
   return NextResponse.json({ error: "Internal server error" }, { status: 500 });
 }
}

export async function PUT(request: NextRequest) {
 try {
   const cookieStore = cookies();
   const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
   const body = await request.json();
   const noteId = body.id;

   const { data, error } = await supabase
     .from("notes")
     .update({ title: body.title })
     .eq("id", noteId)
     .select(`
       *,
       writer:users(id, full_name, profile_image_url)
     `)
     .single();

   if (error) {
     console.error("Error updating note:", error.message);
     return NextResponse.json({ error: error.message }, { status: 500 });
   }

   return NextResponse.json({ data }, { status: 200 });
 } catch (error) {
   console.error("Server error:", error);
   return NextResponse.json({ error: "Internal server error" }, { status: 500 });
 }
}

export async function DELETE(request: NextRequest) {
 try {
   const cookieStore = cookies();
   const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
   const noteId = request.nextUrl.searchParams.get('id');

   if (!noteId) {
     return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
   }

   const { error } = await supabase
     .from("notes")
     .delete()
     .eq("id", noteId);

   if (error) {
     console.error("Error deleting note:", error.message);
     return NextResponse.json({ error: error.message }, { status: 500 });
   }

   return NextResponse.json({ success: true }, { status: 200 });
 } catch (error) {
   console.error("Server error:", error);
   return NextResponse.json({ error: "Internal server error" }, { status: 500 });
 }
}