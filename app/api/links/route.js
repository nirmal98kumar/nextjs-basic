import { NextResponse } from "next/server";

import { addLink, deleteLink, getLinks } from "../../../lib/links";

export async function GET() {
  const links = await getLinks();

  return NextResponse.json({ links });
}

export async function POST(request) {
  const body = await request.json();
  const url = body?.url?.trim();

  if (!url) {
    return NextResponse.json(
      { error: "URL is required." },
      { status: 400 }
    );
  }

  try {
    const link = await addLink({ url });

    return NextResponse.json({ link }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Use a full URL like https://nextjs.org." },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  const body = await request.json();
  const id = body?.id;

  if (!id) {
    return NextResponse.json(
      { error: "Link id is required." },
      { status: 400 }
    );
  }

  const removed = await deleteLink(id);

  if (!removed) {
    return NextResponse.json(
      { error: "Link not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
