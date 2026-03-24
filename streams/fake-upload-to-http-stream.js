import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1
    
    _read() {
        const i = this.index++

        setTimeout(() => {
            if(i > 5){
                this.push(null) //nao temos mais informações para serem envidas de dentro dessa stream
            }else {
                const buf = Buffer.from(String(i)) //Nao podemos trabalhar com tipos primitivos dentro de streams, dessa forma devemos trabalhar com tipo específico do node Buffer.

                this.push(buf)
            }
        }, 100)
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
}).then(response => {
    response.text().then(data => {
        console.log(data)
    })
})