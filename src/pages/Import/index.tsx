import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize'; //formatação de números grandes p/ menores, ex: 48000000 = 48 kbs

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
     const data = new FormData();

     //Verifica se não tem algum arquivo
     if (!uploadedFiles.length) return;

     const file = uploadedFiles[0]; // coloca o arquivo na posição 
     data.append('file', file.file, file.name);   
    
    try {
       await api.post('/transactions/import', data);

       history.push('/');
    } catch (err) {
       console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    // Recupera o arquivo enviado no upload
    const uploadFiles = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));
    console.log(uploadFiles); 
    setUploadedFiles(uploadFiles); //passa o arquivo que foi criado
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>

        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer> 
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos .CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
