/** Generate random string key */
function generate_key(length: number = 12): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let keyArray: string[] = [];

    for (let i=0; i<length; i++) {
        keyArray.push(
            characters.charAt(Math.floor(Math.random() * characters.length))
        );
    }

    return keyArray.join('');
}


export = generate_key;