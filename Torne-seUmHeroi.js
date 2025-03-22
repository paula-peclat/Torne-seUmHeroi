//Declarar Variáveis
var indice = 0;
var pontuacao = 0;
var vrfResp = "";
var certResp = "";
var Nome;
var Id ;
var Codigo ;
//Logout 
onEvent("botaoSair1", "click", function( ) {
  setScreen("superHerois");
  setText("LoginId", "");
  setText("LoginCodigo", "");
  stopSound("superheroes.mp3");
});
//Registro
onEvent("STS", "click", function( ) {
  setScreen("TelaRegistro");
});
onEvent("botaoRegistro", "click", function( ) {
  Nome = getText("RegistroNome");
  Id = getText("RegistroId");
  Codigo = getText("RegistroCodigo");
  createRecord("SuperUsers", {SuperheroName:Nome,SuperheroId:Id,SuperCode:Codigo}, function(sucesso) {
    if (sucesso) {
      setText("LoginId", Id);
      setText("LoginCodigo", Codigo);
      setScreen("superHerois");
    }
  });
});
//Login
onEvent("botaoLogin", "click", function( ) {
  Id = getText("LoginId");
  Codigo = getText("LoginCodigo");
  readRecords("SuperUsers", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      if (Id == (records[i]).SuperheroId && Codigo == records[i].SuperCode) {
        setScreen("destino");
        setText("bemVindo", ("\n" + "Bem-vindo ") + (records[i].SuperheroName + "!"));
      }
    }
  });
});
onEvent("botaoQuestionario", "click", function( ) {
  setText("Pontuacao", 0);
  setScreen("QuestionarioPg");
  mostrarPergunta();
});
function mostrarPergunta() {
  readRecords("QuizTable", {}, function(records) {
    if (indice<7) {
      setText("Pergunta", (records[indice]).Question);
      setText("OpcaoA", (records[indice]).OptionA);
      certResp = (records[indice]).Answers;
      setText("OpcaoB", (records[indice]).OptionB);
      setProperty("OpcARB", "checked", false);
      setProperty("OpcBRB", "checked", false);
    }
  });
}
onEvent("OpcARB", "click", function( ) {
  vrfResp = getText("OpcaoA");
  verificarResposta();
  indice = indice+1;
  if (indice<7) {
    showElement("botaoEnviarQuestionario");
  }
});
onEvent("OpcBRB", "click", function( ) {
  vrfResp = getText("OpcaoB");
  verificarResposta();
  indice = indice+1;
  if (indice<7) {
    showElement("botaoEnviarQuestionario");
  }
});
function verificarResposta() {
  if (vrfResp == certResp) {
    pontuacao = pontuacao+1;
    setText("Pontuacao", pontuacao);
  }
  mostrarPergunta();
}
onEvent("botaoEnviarQuestionario", "click", function( ) {
  if (pontuacao >= 6) {
   createRecord("TransactionTable", {SuperheroName:Nome,SuperheroId:Id,Score:pontuacao});
   setScreen("Medalha");
  } else {
    setScreen("destino");
  }
  pontuacao = 0;
  hideElement("botaoEnviarQuestionario");
  setText("bemVindo", "Não foi desta vez, tente novamente");
  timedLoop(5000, function() {
    setText("bemVindo", " ");
  });
  indice = 0;
});
onEvent("botaoSair2", "click", function( ) {
  setScreen("superHerois");
  setText("LoginId", "");
  setText("LoginCodigo", "");
});
onEvent("botaoCasa", "click", function( ) {
  setScreen("destino");
});
