import { CSSObject } from 'styled-components';

export const GUTTER = [16, { xs: 8, sm: 16, md: 16, lg: 16 }] as any;

export const SMALL_STATISTIC: React.CSSProperties = {
  fontSize: 10,
};

const StyleVariables = {


  title: {
    color: 'white',
    fontWeight: 800,
    fontSize: 60,
    lineHeight: '1.25em',
    letterSpacing: 0.2,
  } as CSSObject,

  h1: {
    color: 'white',
    fontWeight: '800',
    fontSize: 48,
    lineHeight: '1.25em',
    letterSpacing: 0.2,
  },

  h2: {
    color: 'white',
    fontWeight: 800,
    fontSize: 40,
    lineHeight: '1.25em',
    letterSpacing: 0.2,
  } as CSSObject,

  h3: {
    color: 'white',
    fontWeight: 800,
    fontSize: 32,
    lineHeight: '1.25em',
    letterSpacing: 0.2,
  } as CSSObject,

  h4: {
    color: 'white',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: '1.25em',
    letterSpacing: 0.2,
  } as CSSObject,

  body: {
    color: 'white',
    fontSize: 18,
    lineHeight: '1.25em',
    letterSpacing: 0.2,
  } as CSSObject,

  label: {
    color: 'white',
    fontSize: 14,
    lineHeight: '1.25em',
    letterSpacing: 0.5,
  } as CSSObject,

  error: {
    color: 'red',
    margin: '10px 0',
  } as CSSObject,

  success: {
    color: 'green',
    margin: '10px 0',
  } as CSSObject,

  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  } as CSSObject,

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  } as CSSObject,

  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as CSSObject,

  box: {
    boxSizing: 'border-box',
  } as CSSObject,

  borderRadius: {
    borderRadius: '5px',
  } as CSSObject,

  transition: {
    transition: 'all .15s ease-out',
  } as CSSObject,

  buttonBase: {
    height: '30px',
    background: 'white',
    color: 'white',
    border: 'none',
    padding: `0 10px`,
    fontSize: 16,
    fontWeight: 400,
    transition: 'all .2s ease-out',
    cursor: 'pointer',
    width: 'fit-content',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  } as CSSObject,

  pageLayout: {
    height: '100%',
    width: '100%',
    maxWidth: 850,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 12,
  } as CSSObject,

  inputField: {
    height: '30px',
    padding: `12px 12px;`,
    background: 'white',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    input: {
      fontSize: '15px',
    },
  } as CSSObject,

  borderStyle: `1px solid rgba(255,255,255,.1)`,

  shadow: {
    boxShadow: `0 0 8px rgba(0, 0, 0, 0.15)`,
  } as CSSObject,
};

export default StyleVariables;
