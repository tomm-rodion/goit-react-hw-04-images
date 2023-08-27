import { ButtonStyled } from './Button.styled';
export const Button = ({ onClick, children }) => {
  return (
    <ButtonStyled className="Button" type="button" onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};
