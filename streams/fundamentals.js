// process.stdin
//     .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1
    
    _read() {
        const i = this.index++

        setTimeout(() => {
            if(i > 100){
                this.push(null) //nao temos mais informações para serem envidas de dentro dessa stream
            }else {
                const buf = Buffer.from(String(i)) //Nao podemos trabalhar com tipos primitivos dentro de streams, dessa forma devemos trabalhar com tipo específico do node Buffer.

                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * (-1)

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())

