import fs from 'fs';
import chalk from 'chalk';

const textoTeste = 'São geralmente recuperados a partir de um objeto [Percy Jackson](https://br.pinterest.com/pablooncer/percy-jackson-s%C3%A9rie/) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<Percabeth>](https://br.pinterest.com/search/pins/?q=percabeth&rs=ac&len=3&source_id=ac_2xEMmqpS&eq=per&etslf=9704), a partir do objeto [Izuku Midoriya](https://br.pinterest.com/ideas/midoriya-izuku/933971132069/) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [Era uma vez um coração partido](https://es.pinterest.com/naiaramuniz56/era-uma-vez-um-cora%C3%A7%C3%A3o-partido/). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Principe Cruel](https://pt.pinterest.com/matildelanca123bom/pr%C3%ADncipe-cruel/) para mais informações.).'

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
  return resultados.length !== 0 ? resultados : 'não há links no arquivo'; 
}

function trataErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

 // async/await

 async function pegaArquivo(caminhoDoArquivo) {
 try {
  const encoding = 'utf-8';
  const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
  return extraiLinks(texto);
  } catch (erro) {
    trataErro(erro)
  }
}


// promises com then()

// function pegaArquivo (caminhoDoArquivo) {
  // const encoding = 'utf-8';
   //fs.promises
   //.readFile(caminhoDoArquivo, encoding)
   //.then((texto)) => console.log(chalk.green(texto)))
   //.catch (trataErro)
 // }

//function pegaArquivo(caminhoDoArquivo) {
//    const encoding = 'utf-8';
//    fs.readFile(caminhoDoArquivo, encoding, (erro, texto)  => {
//        if (erro) {
//          trataErro(erro);
// }
//    console.log(chalk.green(texto));
 // })
// }

 pegaArquivo('./arquivos/texto.md');

// \[^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)

export default pegaArquivo;
