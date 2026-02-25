import styled from 'styled-components';

export const UploadBox = styled.div`
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 0 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #999;
  cursor: pointer;
`;

export const UploadIcon = styled.span`
  font-size: 18px;
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 12px;
`;

export const PhotoItem = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 72px;
    object-fit: cover;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: white;
`;

export const EmptyPhoto = styled.div`
  height: 72px;
  border: 1px dashed #ddd;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 20px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 96px;
  border-radius: 12px;
  border: 1px solid #ddd;
  padding: 12px;
  resize: none;
`;

export const TextCount = styled.div`
  margin: 6px 0px 200px;
  font-size: 12px;
  color: #999;
  text-align: right;
`;

export const Optional = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: #999;
`;
