import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SearchResultsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
  font-size: 14px;
  color: #495057;

  strong {
    color: #007bff;
    font-weight: 600;
  }

  span {
    font-size: 12px;
    color: #6c757d;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`;
