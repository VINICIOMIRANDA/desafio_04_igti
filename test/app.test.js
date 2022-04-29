const request = require('supertest')
const app = require('../src/app')
const db = require('../src/db')

describe('Teste de integração', () => {

   beforeEach(async () => {
    await db.produto.destroy({ where: {} })
  }) 

  afterAll(async () => await db.sequelize.close())

  const produtoInicial = {
    Codigo: '100',
    Descricao: 'Produto de prateleira',
    Preco: 50.00
  }

  const payloadRequest = {
      codigo : produtoInicial.Codigo,
      descricao : produtoInicial.Descricao,
      preco : produtoInicial.Preco
  }

  const payloadRequestErro = {
    codigo : produtoInicial.Codigo,
    descricao : produtoInicial.Descricao,
    
}

  const produtoAtualizado = {
    Codigo: '100',
    Descricao: 'Produto de lavagem',
    Preco: 100.00
  }

  const payloadAtualizadoRequest = {
    codigo : produtoAtualizado.Codigo,
    descricao : produtoAtualizado.Descricao,
    preco : produtoAtualizado.Preco
}

const payloadAtualizadoErroRequest = {
    codigo : produtoAtualizado.Codigo,
    descricao : produtoAtualizado.Descricao,
}

const payloadAtualizadoInexistenteRequest = {
    codigo : 101,
    descricao : produtoAtualizado.Descricao,
    preco : produtoAtualizado.Preco
}

  test('Cenário 01 - responde http 200 na raiz', () => {
    return request(app).get('/')
      .then(res => expect(res.status).toBe(200))
  })

  test('Cenário 02 - Produto Cadastrado na Base', async () => {
    const res = await request(app).post('/produto').send(payloadRequest)
    expect(res.status).toBe(201)

 
    const produto = await db.produto.findOne({ where: { Codigo: produtoInicial.Codigo } })
    expect(produto.Codigo).toBe(payloadRequest.codigo)
    expect(produto.Descricao).toBe('Produto de prateleira')
    
  })

  test('Cenário 02.1 - Erro ao cadastrar produto na base ', async () => {
    const res = await request(app).post('/produto').send(payloadRequestErro)
    // Resultado [e obtido com sucesso]

   expect(res.body.erro).toBeTruthy()
   expect(res.status).toBe(400)

  })




  test('Cenário 03 - Produtos Persistidos na base ', async () => {
    debugger
    const res = await request(app).get('/produto').send({})
 //   const count = await db.produto.count({ where: { Codigo : produtoInicial.Codigo } })
    const countProduto = await db.produto.count()
    expect(res.status).toBe(200)
 ///   expect(count).toBe(1)
    expect(countProduto).toBe(1)
  })


  test('Cenário 04 - Produto Atualizado na Base', async () => {
    const res = await request(app).put('/produto').send(payloadAtualizadoRequest)
    // Resultado [e obtido com sucesso]

    expect(res.body.erro).toBeUndefined()
    expect(res.body.Codigo).toBe("100")
    expect(res.body.Descricao).toBe('Produto de lavagem')
    expect(res.body.Preco).toBe(100.00)
    expect(res.status).toBe(200)

  })

  test('Cenário 04.1 - Erro no payload ao atualizar o produto na Base', async () => {
    const res = await request(app).put('/produto').send(payloadAtualizadoErroRequest)
    // Resultado [e obtido com sucesso]

    expect(res.body.erro).toBeTruthy()
    expect(res.status).toBe(400)

  })

  test('Cenário 04.2 - Erro produto inexistente a atualizar produto na Base', async () => {
    const res = await request(app).put('/produto').send(payloadAtualizadoInexistenteRequest)
    // Resultado [e obtido com sucesso]

    expect(res.body.erro).toBeTruthy()
    expect(res.status).toBe(405)

  })

  



  test('Cenário 05 - Exclusão do produto na Base', async () => {
    let produtoExcluir = "100";
    const res = await request(app).delete(`/produto/${produtoExcluir}`).send()
    // Resultado [e obtido com sucesso]

    expect(res.body.erro).toBeUndefined()
    expect(res.status).toBe(200)

  })

  test('Cenário 06 - Exclusão do produto na Base não encontrado na base', async () => {
    let produtoExcluir = "100";
    const res = await request(app).delete(`/produto/${produtoExcluir}`).send()
    // Resultado [e obtido com sucesso]

    expect(res.body.erro).toBeUndefined()
    expect(res.status).toBe(405)

  })







})