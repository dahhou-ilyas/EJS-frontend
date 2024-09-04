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

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ success: false, message: "ID is required." });
    }

    const directoryPath = path.join(process.cwd(), 'public', 'uploads', id);
    const files = fs.readdirSync(directoryPath);
    
    //const filePaths = files.map(file => `/uploads/${id}/${file}`)

    const fileObjects = files.map(file => {
        const filePath = path.join('/uploads', id, file); 
    
        const fileType = file.endsWith('.pdf') ? 'application/pdf' : (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') ? 'image/*' : 'application/octet-stream');
    
        return {
          type: fileType,
          src: filePath,
          name: file
        };
      });

    return NextResponse.json({ success: true , files: fileObjects });
}

export const DELETE = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ success: false, message: "ID is required." });
    }

    const directoryPath = path.resolve(process.env.ROOT_PATH ?? "", `public/uploads/${id}`);

    if (!fs.existsSync(directoryPath)) {
        return NextResponse.json({ success: false, message: "Directory not found." });
    }

    try {
        fs.readdirSync(directoryPath).forEach((file) => {
            const filePath = path.join(directoryPath, file);
            fs.unlinkSync(filePath);
        });

        fs.rmdirSync(directoryPath);

        return NextResponse.json({ success: true, message: "Files deleted successfully." });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error deleting files.", error: error.message });
    }
};