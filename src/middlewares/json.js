export async function json(req, res) {
    const buffers = []

    for await (const chunck of req){
        buffers.push(chunck)
    }

    try{
        req.corpoRequisicao = JSON.parse(Buffer.concat(buffers).toString())
    } catch{
        req.corpoRequisicao = null
    }

    res.setHeader('Content-type', 'application/json')
}