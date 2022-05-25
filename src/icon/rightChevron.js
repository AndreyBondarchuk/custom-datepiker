const RightChevron = ({ classNames, props }) => {
  return (
    <svg
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames}
      {...props}
    >
      <path
        d="M0.646484 1.35352L1.35359 0.646409L8.70714 7.99996L1.35359 15.3535L0.646484 14.6464L7.29304 7.99996L0.646484 1.35352Z"
        fill="#0000FF"
      />
    </svg>
  );
};

export default RightChevron;
