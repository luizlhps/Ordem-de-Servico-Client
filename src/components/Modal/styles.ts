import styled from "styled-components";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: "980px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  overflow: "auto",
  "@media (max-width: 768px)": {
    textAlign: "center",
    width: "98%",
    overflow: "auto",
    justifyContent: "center",
  },

  "@media (max-height: 600px)": {
    height: "560px",
  },
};

export const InputCustom = styled.input`
  height: 38px;
  font-size: 16px;
  color: #1e2737;
  width: 100%;
  border-radius: 0.3rem;
  padding: 8px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 4px;
  font-family: arial;
`;

export const ValueInputCustom = styled.input`
  height: 38px;
  font-size: 16px;
  color: #1e2737;
  width: 150px;

  border-radius: 0.3rem;
  padding: 8px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 4px;
  font-family: arial;
`;

export const InputCustomDescription = styled.textarea`
  font-size: 16px;
  color: #1e2737;
  width: 100%;
  height: 140px;
  border-radius: 0.3rem;
  padding: 8px;
  border-style: none;
  border: 1px #878787 solid;
  margin-top: 14px;
  resize: none;
  font-family: arial;

  @media (max-width: 1212px) {
    width: 100%;
  }
`;
