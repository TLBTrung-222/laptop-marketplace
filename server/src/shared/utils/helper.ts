import { join } from 'path'

export function resolveAssetPath(
    fileName: string,
    folderType: 'products' | 'avatars'
): string {
    const isDevelopment = process.env.NODE_ENV !== 'production'
    const basePath = isDevelopment
        ? join(process.cwd(), 'src', 'assets', folderType)
        : join(process.cwd(), 'dist', 'assets', folderType)
    return join(basePath, fileName)
}
