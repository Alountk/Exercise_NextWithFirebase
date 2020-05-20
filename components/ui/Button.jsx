import styled from '@emotion/styled';

const Button = styled.a`
    display:block;
    font-weight: 700;
    text-transform:uppercase;
    border: 1px solid var(--button1);
    padding: .8rem 2rem;
    margin: 2rem auto;
    text-align:center;
    text-decoration:none;
    background-color: var(${props => props.bgColor || 'white'});
    color: var(${props => props.color || '#000'});
    &:last-of-type {
        margin-right:0;
    }

    &:hover{
        cursor:pointer;
    }
`;

export default Button; 