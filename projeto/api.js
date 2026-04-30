function consulta_Municipio(){
    alert("Entrou")
  let estado =  document.getElementById("estado").value 
    let resposta = fetch (`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
    .then(dados => {
        dados.json()
        .then(municipios => {
            municipios.forEach(cidade => {
                document.getElementById("municipios").innerHTML += `${cidade.nome}<br>`
            })
        })
    })
}
