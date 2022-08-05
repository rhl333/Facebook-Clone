import styled from "styled-components";

export const MainLogin = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: space-around;
  margin: 0 12rem;
  column-gap: 3rem;
  @media all and (max-width: 1201px) {
    margin: 0 7rem;
  }
  @media all and (max-width: 1200px) {
    margin: 0 5rem;
  }
  @media all and (max-width: 1199px) {
    margin: 0 2rem;
  }
  @media all and (max-width: 900px) {
    padding: 2.5rem 0 5rem 0;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
  @media all and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding-top: 0;
  }
`;

export const MainLoginLeft = styled.div`
  margin-bottom: 4rem;
  & img {
    height: 106px;
  }
  & p {
    font-size: 1.5rem;
    font-weight: 500;
    font-family: Helvetica, Arial, sans-serif;
    margin-left: 2rem;
    color: #1c1e21;
  }
  @media all and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
  }
  @media all and (max-width: 600px) {
    margin-bottom: 2rem;
  }
`;

export const MainLoginRight = styled.div`
  & input.error {
    outline: 1px solid red;
  }
  display: flex;
  height: 350px;
  flex-direction: column;
  width: 396px;
  background-color: white;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(153 125 125 / 10%);
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding: 13rem 1.5rem;
  & span {
    display: inline-block;
    color: red;
    font-family: Helvetica, Arial, sans-serif;
    margin-bottom: 5px;
  }
  & input {
    background-color: white;
    border: 1px solid #dddfe2;
    color: #1d2129;
    height: 50px;
    line-height: 16px;
    border-radius: 6px;
    font-size: 17px;
    padding: 14px 16px;
    width: 350px;
    margin-bottom: 18px;
  }
  & input:active,
  input:focus {
    outline: 1px solid #1877f2;
  }

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1877f2;
    border: none;
    border-radius: 6px;
    font-size: 20px;
    line-height: 48px;
    /* padding: 0 16px !important; */
    width: 352px;
    height: 45px;
    color: white;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    outline: none;
    transition: all 0.2s;
  }
  & button:hover {
    background-color: #166fe5;
  }
  & div.forget {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & a.forget {
    color: #1877f2;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    margin: 18px 0;
    display: inline-block;
    text-decoration: none;
    font-family: Helvetica, Arial, sans-serif;
  }
  & hr {
    border: none;
    width: 352px;
    height: 1px;
    background-color: #dadde1;
    margin-bottom: 25px;
  }
  & div.createNew {
    display: flex;
    justify-content: center;
    align-items: center;
    & a {
      text-decoration: none;
      background-color: #42b72a;
      font-family: Helvetica, Arial, sans-serif;
      color: white;
      font-size: 17px;
      line-height: 48px;
      font-weight: bold;
      border-radius: 6px;
      padding: 0 16px;
    }
    & input.error {
      outline: 1px solid red;
      background-color: red;
    }
  }
`;
