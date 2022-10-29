/**
 * Генерирует рандомный "токен", используя все буквы латиницы
 * нижнего и верхнего регистра, а также цифры
 * @param length - длина токена
 */
export default function generateToken(length: number): string {
    const allowedCharacters: string[] = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    const token: string[] = [];
    for (let i = 0; i < length; i++) {
        const j: string = (Math.random() * (allowedCharacters.length - 1)).toFixed(0);
        token[i] = allowedCharacters[parseInt(j)];
    }
    return token.join('');
}