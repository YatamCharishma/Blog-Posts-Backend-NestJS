import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class createPostDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsArray()
    @IsOptional()
    tags?: string[];

    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;

    @IsNotEmpty()
    authorId: number; // 👈 Add this
}


export class UpdatePostDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsArray()
    @IsOptional()
    tags?: string[];

    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;
}