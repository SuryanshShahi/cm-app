import React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export function SvgHome(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      {...props}
    >
      <Path d="M21.33 8.26l-6.55-5.24C13.5 2 11.5 1.99 10.23 3.01L3.68 8.26c-.94.75-1.51 2.25-1.31 3.43l1.26 7.54c.29 1.69 1.86 3.02 3.57 3.02h10.6c1.69 0 3.29-1.36 3.58-3.03l1.26-7.54c.18-1.17-.39-2.67-1.31-3.42zm-8.08 9.99c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3z" />
    </Svg>
  );
}
export function SvgPassword(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={14}
      viewBox="0 0 12 14"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.25.335A3.538 3.538 0 019.78 3.869v1.05a3.033 3.033 0 012.035 2.862v2.859a3.031 3.031 0 01-3.028 3.028H3.694A3.031 3.031 0 01.666 10.64V7.78c0-1.321.851-2.448 2.034-2.86V3.869a3.519 3.519 0 011.046-2.51C4.416.694 5.302.309 6.249.335zm2.538 5.418H3.694A2.03 2.03 0 001.666 7.78v2.859a2.03 2.03 0 002.028 2.028h5.094a2.03 2.03 0 002.028-2.028V7.78a2.03 2.03 0 00-2.028-2.027zM6.241 7.97a.5.5 0 01.5.5v1.48a.5.5 0 01-1 0V8.47a.5.5 0 01.5-.5zm.006-6.635h-.01c-.676 0-1.308.26-1.786.734a2.512 2.512 0 00-.75 1.788l-.001.895h5.08l.001-.883a2.537 2.537 0 00-2.534-2.534z"
      />
    </Svg>
  );
}
export function SvgEmail(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={14}
      viewBox="0 0 15 14"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.105.333C13.325.333 15 2.145 15 4.547v4.579c0 1.229-.434 2.34-1.224 3.128-.709.706-1.628 1.08-2.659 1.08H4.547c-1.028 0-1.947-.374-2.656-1.08-.79-.788-1.225-1.9-1.225-3.128v-4.58C.666 2.146 2.34.334 4.56.334h6.545zm0 1H4.56c-1.677 0-2.894 1.352-2.894 3.214v4.579c0 .962.33 1.82.93 2.419.518.517 1.193.789 1.953.789h6.556c.002-.002.007 0 .011 0 .76 0 1.435-.272 1.953-.79.6-.597.93-1.457.93-2.418v-4.58c0-1.861-1.217-3.213-2.894-3.213zm1.051 3.086a.5.5 0 01-.073.704L9.121 7.53a2.028 2.028 0 01-2.533.004l-2.99-2.411a.5.5 0 01.627-.779l2.988 2.408a1.03 1.03 0 001.282-.002l2.957-2.404a.5.5 0 01.704.072z"
      />
    </Svg>
  );
}
export function SvgSearch(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.782.666c4.475 0 8.115 3.64 8.115 8.115 0 2.111-.81 4.037-2.136 5.482l2.609 2.604a.624.624 0 11-.884.885l-2.64-2.633a8.076 8.076 0 01-5.064 1.778c-4.475 0-8.116-3.641-8.116-8.116S4.306.666 8.782.666zm0 1.25a6.873 6.873 0 00-6.866 6.865 6.874 6.874 0 006.866 6.866 6.874 6.874 0 006.865-6.866 6.873 6.873 0 00-6.865-6.865z"
      />
    </Svg>
  );
}
export function SvgArrow(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      {...props}
    >
      <Path
        d="M15 20.848l-6.52-6.52c-.77-.77-.77-2.03 0-2.8L15 5.008"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export function SvgLanguage(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M21.055 12h-2a1 1 0 000 2v2h-1.184c.119-.32.18-.659.184-1a3 3 0 00-5.597-1.5 1 1 0 101.732 1 1 1 0 11.865 1.5 1 1 0 000 2 1 1 0 11-.865 1.5 1 1 0 10-1.732 1 3 3 0 005.597-1.5 2.964 2.964 0 00-.184-1h1.184v3a1 1 0 102 0v-7a1 1 0 000-2zm-11.97-.757a1 1 0 101.94-.486l-1.757-7.03a2.28 2.28 0 00-4.425 0l-1.757 7.03a1 1 0 001.939.486L5.585 9h2.94l.56 2.243zM6.086 7l.698-2.787a.292.292 0 01.546 0L8.025 7h-1.94zm7.97 0h1a1.001 1.001 0 011 1v1a1 1 0 102 0V8a3.003 3.003 0 00-3-3h-1a1 1 0 100 2zm-4 9h-1a1.001 1.001 0 01-1-1v-1a1 1 0 10-2 0v1a3.003 3.003 0 003 3h1a1 1 0 000-2z" />
    </Svg>
  );
}
export function SvgDashboard(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_417_4399)">
        <Path d="M19 5v2h-4V5h4zM9 5v6H5V5h4zm10 8v6h-4v-6h4zM9 17v2H5v-2h4zM21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z" />
      </G>
      <Defs>
        <ClipPath id="clip0_417_4399">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
