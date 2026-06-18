import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';

const caminho = process.argv;

function imprimeLista(resultados, identificador ='') {
  console.log(
    chalk.yellow('lista de links'),
    chalk.black.bgGreen(identificador),
    resultados);
}


async function processaTexto(argumentos) {
    const caminho = argumentos[2];

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log('arquivo ou diretório não existe');
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultados = await pegaArquivo(argumentos[2]);
    imprimeLista(resultados);
     } else if (fs.lstatSync(caminho).isDirectory()) {
      const arquivos = await fs.promises.readdir(caminho)
     arquivos.forEach(async (nomeDeArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
     imprimeLista(lista, nomeDeArquivo)
     })
  }
  
}

processaTexto(caminho);