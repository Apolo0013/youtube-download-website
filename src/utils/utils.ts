//capitaliza:
//pegar uma string e transforma a primeira letra e coloca pra Maisucula
export function Cp(str: string): string {
    if (str.length == 0) return ''
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function randint(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//slepp
export async function sleep(s: number) {
    return new Promise((resolve) => setTimeout(resolve, s * 1000))
}