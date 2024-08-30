import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ success: false, message: "ID is required." });
    }

    const formData = await req.formData();
    const files = formData.getAll("files"); // Use getAll to handle multiple files

    if (files.length === 0) {
        return NextResponse.json({ success: false, message: "No files uploaded." });
    }

    const uploadDir = path.resolve(process.env.ROOT_PATH ?? "", `public/uploads/${id}`);
    
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    files.forEach(async (file) => {
        if (file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filePath = path.resolve(uploadDir, file.name);
            fs.writeFileSync(filePath, buffer);
        }
    });

    return NextResponse.json({ success: true });
};
