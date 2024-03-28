
// Vincula o método de fazer a busca ao botão de Buscar.
document.getElementById("botao_pesquisa").addEventListener("click", Buscar);

// Método que faz a busca na API e exibi avisos ou monta a grade de resultado dependo da resposta.
function Buscar()
{
    document.querySelector(".grid-resultado").innerHTML = "";
    const sPesquisa = document.getElementById("pesquisa_text").value;

    if( sPesquisa.length == 0 )
    {
        ExibirAviso("Digite algo no campo de pesquisa.");
        return;
    }

    
    fetch( `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${sPesquisa}` )
    .then( (response) => response.json() )
    .then( (dados) =>{

        if(dados.drinks == null){
            ExibirAviso("Não foram encontrados drinks com esse nome.");
            return;
        }

        MontarGrid(dados);
    });
    

};

// Mérodo de exibir avisos.
function ExibirAviso( pMensagem ){
    document.querySelector(".grid-resultado").innerHTML += `<p class="aviso">${pMensagem}</p>`;
};


// Método que faz a montagem da grade de resultados.
function MontarGrid( pDados ){

    const eGridResultado = document.querySelector(".grid-resultado");

    

    pDados.drinks.forEach(element => {

        let aIngredientes = [];
        let iContador = 1;

        // Monta os ingredientes com suas respectivas medidas.
        for ( i in element )
        {
            let sIngrediente = "";
            let sMedida = "";

            // Verifica se o ingrediente está com valor no objeto.
            if( i.startsWith("strIngredient") && element[i] )
            {
                sIngrediente = element[i];

                // Verifica se a medida desse ingrediente está com valor no objeto.
                if( element[`strMeasure` + iContador] )
                {
                    sMedida = element[`strMeasure` + iContador];
                }
                else
                {
                    sMedida = "";
                }

                iContador += 1;
                aIngredientes.push( `${sMedida} ${sIngrediente}` )
            }

        }

        // Template de item da grade.
        eGridResultado.innerHTML +=  
        `
            <div class="item">
                <div class="principal">
                    <h2>${element.strDrink}</h2>
                    <img src="${element.strDrinkThumb}" alt=${element.strDrink}>
                </div>
                <div class="descricao">
                    <h3>Ingredients</h3>
                    <p>${aIngredientes.join(", ")}</p>
                    <h3 style="margin-top: 10px">Instructions</h3>
                    <p>${element.strInstructions}</p>
                </div>                
            </div>
        `
    });
};