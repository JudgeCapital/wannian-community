import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('avatar') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: '没有找到文件' },
        { status: 400 }
      );
    }

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '只支持图片文件' },
        { status: 400 }
      );
    }

    // 验证文件大小（2MB）
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: '文件大小不能超过2MB' },
        { status: 400 }
      );
    }

    // 生成唯一文件名
    const buffer = await file.arrayBuffer();
    const hash = crypto.createHash('md5').update(Buffer.from(buffer)).digest('hex');
    const extension = file.type.split('/')[1];
    const fileName = `${hash}.${extension}`;

    // 保存文件
    const filePath = join(process.cwd(), 'public/uploads', fileName);
    await writeFile(filePath, Buffer.from(buffer));

    // 返回文件URL
    return NextResponse.json({
      url: `/uploads/${fileName}`,
      message: '上传成功'
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: '上传失败' },
      { status: 500 }
    );
  }
} 