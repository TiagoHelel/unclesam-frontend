import styled from 'styled-components';

import Button from '../../components/Button';

export const Container = styled.div``;

export const Content = styled.div`
  /* margin-left: 200px; */
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* max-width: 1085px; */
  /* height: 80vh; */
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }

  /* border: 1px solid #999591; */
  /* border-radius: 4px; */

  tr {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border-top: 1px solid #999591;
    border-bottom: 1px solid #999591;
    border-radius: 4px;
  }

  th,
  td {
    width: 400px;
    text-align: start;
    margin: 10px 0 0 20px;
    font-size: 20px;
    color: #f4ede8;
    padding: 5px;

    word-wrap: break-word;
    overflow-wrap: break-word;

    :first-child {
      width: 220px;
    }
    :last-child {
      width: 100px;
    }

    button,
    a {
      text-decoration: none;
      color: #f4ede8;
      background: transparent;
      border: none;
      text-align: left;
      font-size: 20px;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  th {
    font-size: 25px;
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  width: 1000px;
  justify-content: space-between;
  flex-direction: row;
`;

export const ButtonHeader = styled(Button)`
  width: 300px;
`;

export const ContentLabel = styled.p`
  font-size: 45px;
  font-weight: 500;
  margin-bottom: 50px;
`;
