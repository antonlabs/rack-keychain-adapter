import {AsyncPersistenceAdapter} from "@antonlabs/rack";
const keychain = require('./keychain');

export class KeyChainAdapter extends AsyncPersistenceAdapter<string | null> {

    constructor(private account: string) {
        super();
    }

    async getItem(key: string): Promise<string | null> {
        return new Promise((resolve, reject) =>
            keychain.getPassword({ account: this.account, service: key }, (err: any, data: string | null) => {
                if(err) {
                    return reject(err);
                }
                resolve(data);
            })
        );
    }

    async setItem(key: string, value: string | null): Promise<void> {
        return new Promise((resolve, reject) =>
            keychain.setPassword({ account: this.account, service: key, password: value }, (err: any) => {
                if(err) {
                    return reject(err);
                }
                resolve();
            })
        );
    }

}
