import React, { useEffect, useState, useCallback } from 'react';

import { FiDownload, FiLink } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import XLSX from 'xlsx';
import _ from 'underscore';
import {
  Container,
  Content,
  ContentHeader,
  ContentLabel,
  Selector,
} from './styles';

import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';

import api from '../../services/api';

interface Documents {
  id: string;
  competency_date: string;
  amount: string;
  document_url: string;
  filename: string;
  user_id: string;
  managed_user_id: string;
  created_at: string;
  updated_at: string;
  classification_id: string;
  comments: string;
  classification: {
    account_string_description: string;
    account_string: string;
  };
}

interface Months {
  value: string;
  label: string;
}

interface SortedMonths {
  month: string;
  monthDate: number;
}

const Documents: React.FC = () => {
  const { signOut } = useAuth();
  const [documents, setDocuments] = useState<Documents[]>([]);
  const [months, setMonths] = useState([] as Months[]);
  const [actualMonth, setActualMonth] = useState<Months | boolean>(false)

  const location = useLocation();

  const loadDocuments = useCallback(
    async (monthFilter?: Months | null, setDocs = true): Promise<Documents[]> => {
      const managedUserId = location.pathname.replace('/documentos/', '');

      let response: AxiosResponse;
      if (monthFilter && monthFilter.value !== 'Selecione o mês') {
        response = await api.get(
          `/documents?managed_user_id=${managedUserId}&competency_date=${monthFilter.value}`,
        );
      } else {
        response = await api.get(`/documents?managed_user_id=${managedUserId}`);
      }

      response.data.map((document: Documents) =>
        document.amount
          ? (document.amount = Number(document.amount).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL',
          }))
          : null,
      );

      if (setDocs) {
        setDocuments(response.data);
      }

      return response.data;
    },
    [location.pathname],
  );

  const sortMonthsByDate = useCallback((monthsList: string[]) => {

    const monthsUS: { [key: string]: string } = {
      JAN: 'JAN',
      FEV: 'FEB',
      MAR: 'MAR',
      ABR: 'APR',
      MAI: 'MAY',
      JUN: 'JUN',
      JUL: 'JUL',
      AGO: 'AUG',
      SET: 'SEP',
      OUT: 'OCT',
      NOV: 'NOV',
      DEZ: 'DEC',
    }

    const sortedMonths: SortedMonths[] = []
    monthsList.map((monthString: string) =>
      monthString.length === 8 ?
        sortedMonths.push({
          month: monthString,
          monthDate: Date.parse(`${monthsUS[monthString.slice(0, 3)]} 1, ${monthString.slice(4, 8)}`),
        }) : null
    )
    sortedMonths.sort(function (month1, month2): number {
      return Number(new Date(month1.monthDate - month2.monthDate))
    })
    console.log(sortedMonths)

    return sortedMonths
  }, [])

  useEffect(() => {
    async function load() {
      try {
        const documentsList = await loadDocuments(null, false);

        const monthsList: any[] = [];

        const monthsNotUnique = documentsList.map(
          (document: Documents) => document.competency_date,
        );

        const monthsUnique = _.uniq(monthsNotUnique);

        const months = sortMonthsByDate(monthsUnique)

        months.map((monthString: SortedMonths) =>
          monthString.month.length === 8 ?
            monthsList.push({
              value: monthString.month,
              label: monthString.month,
            }) : null
        );

        setActualMonth(monthsList[0])
        await loadDocuments(monthsList[0]);

        setMonths(monthsList);
      } catch (err) {
        if (err.response?.data?.message === 'Invalid JWT token') {
          signOut();
        }
      }
    }
    load();
  }, [signOut, location, loadDocuments, sortMonthsByDate]);

  const handleChange = useCallback(
    selectedItem => {
      try {
        loadDocuments(selectedItem);
      } catch (err) {
        if (err.response?.data?.message === 'Invalid JWT token') {
          signOut();
        }
      }
    },
    [loadDocuments, signOut],
  );

  const handleExportXlsx = useCallback(() => {
    const report = documents.map(document => {
      return {
        ID: document.id,
        'ID da classificação': document.classification_id,
        'Descrição da classificação':
          document.classification.account_string_description,
        'Conta contábil':
          document.classification.account_string,
        'Mês da competência': document.competency_date,
        Valor: document.amount,
        Comentários: document.comments,
      };
    });

    const binaryWS = XLSX.utils.json_to_sheet(report);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, binaryWS, 'Documentos enviados');
    return XLSX.writeFile(workBook, 'RelatorioDocLoad.xlsx');
  }, [documents]);

  return (
    <Container>
      <Header />

      <Content>
        <ContentHeader>
          <ContentLabel>Documentos</ContentLabel>
          {actualMonth ? <Selector
            options={months}
            onChange={handleChange}
            // placeholder="Selecione o mês"
            defaultValue={actualMonth}
          /> : null}
          <button type="button" onClick={handleExportXlsx}>
            Exportar
            <FiDownload />
          </button>
        </ContentHeader>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data de competência</th>
              <th>Valor</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(document => (
              <tr key={document.id}>
                <td>{document.id}</td>
                <td>{document.competency_date}</td>
                <td>{document.amount}</td>
                <td>
                  <a target="AWS S3" href={document.document_url}>
                    <FiLink />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
};

export default Documents;
